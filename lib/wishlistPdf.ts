// Builds the downloadable PDF of a completed bathroom wish list. Runs in the browser only
// (jsPDF is imported on demand so it never touches the page's initial JS).
import { site } from "@/lib/site";

export type Pick = { label: string; sub?: string; img?: string; color?: string };
export type WishItem = { label: string; value: string; picks?: Pick[] };
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

  // Load a photo, crop it to a 4:3 card, return a JPEG data URL (null if it fails).
  const CARD_W = 4, CARD_H = 3;
  const loadCard = (src: string) =>
    new Promise<string | null>((res) => {
      const im = new window.Image();
      im.onload = () => {
        const tw = 480, th = Math.round((tw * CARD_H) / CARD_W);
        const c = document.createElement("canvas");
        c.width = tw; c.height = th;
        const cx = c.getContext("2d");
        if (!cx) return res(null);
        const sc = Math.max(tw / im.width, th / im.height);
        const w = im.width * sc, h = im.height * sc;
        cx.drawImage(im, (tw - w) / 2, (th - h) / 2, w, h);
        res(c.toDataURL("image/jpeg", 0.82));
      };
      im.onerror = () => res(null);
      im.src = src;
    });
  const imgs = new Map<string, string | null>();
  const srcs = new Set<string>();
  d.sections.forEach((sec) => sec.items.forEach((it) => it.picks?.forEach((p) => p.img && srcs.add(p.img))));
  await Promise.all([...srcs].map(async (u) => imgs.set(u, await loadCard(u))));

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
    need(58); // keep a heading with its first photo
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

  // A question with its answers shown as photo cards, color chips and text chips.
  const COLS = 3, GAP = 5, CW3 = (CW - GAP * (COLS - 1)) / COLS, IH = (CW3 * CARD_H) / CARD_W;
  const picksBlock = (it: WishItem) => {
    const picks = it.picks || [];
    const withVisual = picks.filter((p) => (p.img && imgs.get(p.img)) || p.color);
    const plain = picks.filter((p) => !withVisual.includes(p));
    const photos0 = withVisual.filter((p) => p.img && imgs.get(p.img));
    if (photos0.length === 1 && withVisual.length === 1) {
      // One favorite: a feature card, photo left, name right.
      const p = photos0[0], fw = 64, fh = (fw * CARD_H) / CARD_W;
      need(fh + 8);
      doc.addImage(imgs.get(p.img as string) as string, "JPEG", M, y, fw, fh);
      doc.setDrawColor(210, 218, 236);
      doc.roundedRect(M, y, fw, fh, 1.5, 1.5, "S");
      doc.setFont("helvetica", "bold").setFontSize(9.5).setTextColor(...MUTED);
      doc.text(it.label, M + fw + 8, y + 10);
      doc.setFont("times", "bold").setFontSize(15).setTextColor(...NAVY);
      const nm: string[] = doc.splitTextToSize(p.label, CW - fw - 8);
      doc.text(nm, M + fw + 8, y + 19);
      if (p.sub) {
        doc.setFont("helvetica", "normal").setFontSize(10).setTextColor(...MUTED);
        doc.text(doc.splitTextToSize(p.sub, CW - fw - 8) as string[], M + fw + 8, y + 19 + nm.length * 6.5);
      }
      y += fh + 8;
      return;
    }
    need(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...MUTED);
    doc.text(it.label, M, y);
    y += 3.5;
    const photos = withVisual.filter((p) => p.img && imgs.get(p.img));
    const colors = withVisual.filter((p) => !photos.includes(p));
    const grid = (list: Pick[], cols: number, ih: number) => {
      const cw = (CW - GAP * (cols - 1)) / cols;
      for (let i = 0; i < list.length; i += cols) {
        const rowPicks = list.slice(i, i + cols);
        doc.setFont("helvetica", "bold").setFontSize(9);
        const caps = rowPicks.map((p) => doc.splitTextToSize(p.label, cw - 1) as string[]);
        const capH = Math.max(...caps.map((c) => c.length)) * 4;
        need(ih + capH + 6);
        rowPicks.forEach((p, k) => {
          const x = M + k * (cw + GAP);
          const data = p.img ? imgs.get(p.img) : null;
          if (data) {
            doc.addImage(data, "JPEG", x, y, cw, ih);
          } else if (p.color) {
            const [r, g, b] = [1, 3, 5].map((o) => parseInt(p.color!.slice(o, o + 2), 16));
            doc.setFillColor(r, g, b);
            doc.roundedRect(x, y, cw, ih, 1.5, 1.5, "F");
          }
          doc.setDrawColor(210, 218, 236);
          doc.roundedRect(x, y, cw, ih, 1.5, 1.5, "S");
          doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(...NAVY);
          doc.text(caps[k], x, y + ih + 4.2);
        });
        y += ih + capH + 4;
      }
    };
    grid(photos, 3, IH);
    grid(colors, 4, 12);
    if (plain.length) {
      let x = M;
      if (withVisual.length) y += 2;
      else y += 4;
      doc.setFont("helvetica", "normal").setFontSize(10);
      need(10);
      for (const p of plain) {
        const w = doc.getTextWidth(p.label) + 8;
        if (x + w > M + CW) { x = M; y += 9; need(10); }
        doc.setFillColor(...SALT);
        doc.roundedRect(x, y - 4.6, w, 7.6, 3.8, 3.8, "F");
        doc.setTextColor(...NAVY);
        doc.text(p.label, x + 4, y + 0.4);
        x += w + 3;
      }
      y += 9;
    }
    y += 3;
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
    s.items.forEach((it) => (it.picks && it.picks.length ? picksBlock(it) : row(it.label, it.value)));
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
  const nextText = `Haven't scheduled your free in-home visit yet? Please call us at ${site.phoneDisplay} and we will find a time that works for you${d.bestTime ? ` (you told us ${d.bestTime.toLowerCase()} is best)` : ""}. Already scheduled? We will use this wish list to prepare for your visit, so we can come ready to talk about what you want.`;
  doc.setFont("helvetica", "normal").setFontSize(10);
  const next: string[] = doc.splitTextToSize(nextText, CW - 16);
  const nextH = 20 + next.length * 4.8;
  need(nextH + 6);
  doc.setFillColor(...NAVY);
  doc.roundedRect(M, y, CW, nextH, 3, 3, "F");
  doc.setFillColor(...GOLD);
  doc.rect(M + 8, y + 6, 10, 1.2, "F");
  doc.setFont("times", "bold");
  doc.setFontSize(13.5);
  doc.setTextColor(255, 255, 255);
  doc.text("What happens next", M + 8, y + 15);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(215, 225, 247);
  doc.text(next, M + 8, y + 22);
  y += nextH + 6;

  footer();
  const slug = (d.name || "wish-list").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "wish-list";
  doc.save(`${d.file}-${slug}.pdf`);
}
