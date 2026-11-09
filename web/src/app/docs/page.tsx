import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Documentation | gkey",
  description:
    "Installation, usage, architecture, and phonetic mapping documentation for gkey.",
};

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] px-6 py-16 text-[#18181B]">
      <article className="mx-auto max-w-3xl space-y-8">
        <Link href="/" className="font-mono text-sm text-[#3F6212] hover:underline">
          ← Back to gkey
        </Link>
        <header className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-[#3F6212]">
            Documentation
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Use gkey on Linux</h1>
          <p className="text-lg leading-relaxed text-[#52525B]">
            Find installation instructions, usage notes, architecture details, and the phonetic mapping reference.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Installation", "Set up the daemon and required input permissions."],
            ["Architecture", "Understand the evdev → state machine → uinput pipeline."],
            ["Phonetic map", "Review the seven Ethiopic vowel orders."],
            ["Troubleshooting", "Check device permissions and daemon status."],
          ].map(([title, description]) => (
            <section key={title} className="rounded-xl border border-[#E2E0D8] bg-[#F0EFEA] p-5">
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#52525B]">{description}</p>
            </section>
          ))}
        </div>
        <p className="text-sm text-[#52525B]">
          The canonical technical documentation is maintained in the repository README. {" "}
          <a className="text-[#3F6212] hover:underline" href={siteConfig.links.docs}>Open the GitHub README →</a>
        </p>
      </article>
    </main>
  );
}
