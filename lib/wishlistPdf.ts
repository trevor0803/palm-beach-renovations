// Builds the downloadable PDF of a completed bathroom wish list. Runs in the browser only
// (jsPDF is imported on demand so it never touches the page's initial JS).
import { site } from "@/lib/site";

export type WishItem = { label: string; value: string };
export type WishSection = { title: string; items: WishItem[]; note?: string };
export type WishData = {
  title: string;
  file: string;
  name: string;
  date: string;
  wants: string;
  details: WishItem[];
  sections: WishSection[];
  undecided: string[];
  bestTime?: string;
};

const NAVY: [number, number, number] = [15, 31, 77];
const BLUE: [number, number, number] = [30, 58, 138];
const GOLD: [number, number, number] = [233, 180, 76];
const INK: [number, number, number] = [26, 26, 26];
const MUTED: [number, number, number] = [95, 104, 118];
const SALT: [number, number, number] = [243, 246, 252];

export async function downloadWishlistPdf(d: WishData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, H = 297, M = 18, CW = W - M * 2;
  let y = 0;

  let logo: string | null = null;
  try {
    const blob = await (await fetch("/img/logo-pdf.png")).blob();
    logo = await new Promise<string>((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.onerror = rej;
      r.readAsDataURL(blob);
    });
  } catch {}

  // ---- header band ----
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 46, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 46, W, 1.6, "F");
  if (logo) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M, 9, 40, 28, 3, 3, "F");
    doc.addImage(logo, "PNG", M + 2, 11, 36, 24);
  }
  const tx = logo ? M + 48 : M;
  doc.setTextColor(255, 255, 255);
  doc.setFont("times", "bold");
  doc.setFontSize(23);
  doc.text(d.title, tx, 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(205, 216, 243);
  doc.text(`Prepared for ${d.name || "you"}  |  ${d.date}`, tx, 30);
  doc.text(site.name, tx, 36);
  y = 58;

  const footer = () => {
    const n = doc.getNumberOfPages();
    for (let p = 1; p <= n; p++) {
      doc.setPage(p);
      doc.setDrawColor(220, 226, 240);
      doc.line(M, H - 14, W - M, H - 14);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...MUTED);
      doc.text(`${site.name}  |  ${site.phoneDisplay}  |  palmbeachreno.com`, M, H - 9);
      doc.text(`Page ${p} of ${n}`, W - M, H - 9, { align: "right" });
    }
  };
  const need = (h: number) => {
    if (y + h > H - 20) {
      doc.addPage();
      y = 20;
    }
  };
  const heading = (text: string) => {
    need(16);
    doc.setFillColor(...GOLD);
    doc.rect(M, y, 10, 1.2, "F");
    doc.setFont("times", "bold");
    doc.setFontSize(14.5);
    doc.setTextColor(...NAVY);
    doc.text(text, M, y + 8);
    y += 14;
  };
  const row = (label: string, value: string) => {
    const lines: string[] = doc.setFont("helvetica", "normal").setFontSize(10.5).splitTextToSize(value || "-", CW - 52);
    need(lines.length * 5 + 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    doc.text(label, M, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    doc.text(lines, M + 52, y);
    y += lines.length * 5 + 2.5;
  };

  // ---- at a glance ----
  const glance: WishItem[] = [{ label: "Rooms and areas to change", value: d.wants || "-" }, ...d.details];
  const glanceLines = glance.map((g) => (doc.setFont("helvetica", "normal").setFontSize(10.5).splitTextToSize(g.value || "-", CW - 60) as string[]).length);
  const boxH = glanceLines.reduce((a, n) => a + n * 5 + 2.5, 0) + 14;
  doc.setFillColor(...SALT);
  doc.roundedRect(M, y, CW, boxH, 3, 3, "F");
  doc.setFillColor(...BLUE);
  doc.rect(M, y + 2, 1.4, boxH - 4, "F");
  let gy = y + 9;
  glance.forEach((g, i) => {
    const lines = doc.setFont("helvetica", "normal").setFontSize(10.5).splitTextToSize(g.value || "-", CW - 60) as string[];
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    doc.text(g.label, M + 7, gy);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    doc.text(lines, M + 58, gy);
    gy += glanceLines[i] * 5 + 2.5;
  });
  y += boxH + 10;

  // ---- sections ----
  const changing = d.sections.filter((s) => s.items.length > 0);
  const notChanging = d.sections.filter((s) => s.items.length === 0).map((s) => s.title);
  for (const s of changing) {
    heading(s.title);
    s.items.forEach((it) => row(it.label, it.value));
    if (s.note) row("Your note", s.note);
    y += 2;
  }
  if (notChanging.length) {
    need(16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    const nl: string[] = doc.splitTextToSize(`Not changing: ${notChanging.join(", ")}`, CW);
    doc.text(nl, M, y);
    y += nl.length * 4.5 + 8;
  }

  if (d.undecided.length) {
    heading("Still deciding");
    const lines: string[] = doc.setFont("helvetica", "normal").setFontSize(10.5).splitTextToSize(d.undecided.join(", "), CW);
    need(lines.length * 5 + 4);
    doc.setTextColor(...INK);
    doc.text(lines, M, y);
    y += lines.length * 5 + 3;
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    doc.text("That is fine. We will talk through these when we call.", M, y);
    y += 8;
  }

  // ---- what happens next ----
  need(36);
  doc.setFillColor(...NAVY);
  doc.roundedRect(M, y, CW, 34, 3, 3, "F");
  doc.setFont("times", "bold");
  doc.setFontSize(13.5);
  doc.setTextColor(255, 255, 255);
  doc.text("What happens next", M + 8, y + 10);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(215, 225, 247);
  const next: string[] = doc.splitTextToSize(
    `One of the owners will call you to talk through this list and set a specific time to see the space${d.bestTime ? ` (you asked for: ${d.bestTime})` : ""}. Your estimate follows after that visit. Questions sooner? Call ${site.phoneDisplay}.`,
    CW - 16,
  );
  doc.text(next, M + 8, y + 18);
  y += 40;

  footer();
  const slug = (d.name || "wish-list").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "wish-list";
  doc.save(`${d.file}-${slug}.pdf`);
}
