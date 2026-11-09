import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contribute to gkey",
  description:
    "Report issues, propose improvements, and contribute to the open-source gkey Linux Ethiopic input project.",
};

export default function ContributePage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-6 py-16 text-[#18181B]">
      <article className="mx-auto max-w-3xl space-y-8">
        <Link href="/" className="font-mono text-sm text-[#3F6212] hover:underline">
          ← Back to gkey
        </Link>
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[#3F6212]">Open source</p>
          <h1 className="text-4xl font-bold tracking-tight">Help improve gkey</h1>
          <p className="text-lg leading-relaxed text-[#52525B]">
            Contributions are welcome across code, documentation, testing, packaging, and Ethiopic input quality.
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          <a className="rounded-lg bg-[#18181B] px-5 py-3 text-sm font-medium text-white hover:bg-[#27272A]" href={siteConfig.links.contributing}>Contribution guide</a>
          <a className="rounded-lg border border-[#E2E0D8] bg-[#F0EFEA] px-5 py-3 text-sm font-medium hover:border-[#18181B]" href={siteConfig.links.issues}>Report an issue</a>
          <a className="rounded-lg border border-[#E2E0D8] bg-[#F0EFEA] px-5 py-3 text-sm font-medium hover:border-[#18181B]" href={siteConfig.links.github}>View source</a>
        </div>
      </article>
    </main>
  );
}
