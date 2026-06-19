import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${site.name}.`,
  alternates: { canonical: `${site.domain}/privacy` },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="container prose">
      <h1>Privacy Policy</h1>
      <p>
        {site.name} respects your privacy. This page explains what information we collect and
        how we use it.
      </p>
      <h2>Information We Collect</h2>
      <p>
        When you submit our contact form, we collect the name, phone number, email address, and
        project details you provide so we can respond to your inquiry and prepare an estimate.
      </p>
      <h2>How We Use Your Information</h2>
      <p>
        We use your information solely to respond to your request and to communicate about your
        project. We do not sell your personal information to third parties.
      </p>
      <h2>Communications</h2>
      <p>
        By providing your phone number and email, you agree to receive messages from {site.name}
        related to your inquiry. You may opt out at any time.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy? Call us at <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>.
      </p>
      <p><em>This is a general template. Have it reviewed to ensure it meets your legal requirements.</em></p>
    </main>
  );
}
