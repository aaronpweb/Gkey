import Link from "next/link";
import { ArrowRight, Coffee, Heart, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";

function GithubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const benefits = [
  {
    title: "Natural phonetic typing",
    description: "Type Ethiopic characters using familiar Latin phonetic patterns.",
  },
  {
    title: "Built for Linux",
    description: "Designed around evdev and uinput for Wayland, X11, and TTY workflows.",
  },
  {
    title: "Open source",
    description: "Inspect the code, report issues, and help improve Ethiopic input on Linux.",
  },
];

export default function GkeyLandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#18181B]">
      <header className="sticky top-0 z-40 border-b border-[#E2E0D8] bg-[#F8F7F4]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#18181B] text-base font-semibold text-[#F8F7F4] transition-colors group-hover:bg-[#3F6212]">
              ሀ
            </span>
            <span className="font-mono text-lg font-bold tracking-tight">gkey</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#E2E0D8] bg-[#F0EFEA] px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[#E7E5DF] sm:text-sm"
            >
              <GithubIcon />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={siteConfig.links.sponsors}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#B45309] px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition-colors hover:bg-[#92400E] sm:text-sm"
            >
              <Coffee className="h-3.5 w-3.5" />
              <span>Sponsor</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-[#E2E0D8] py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E2E0D8] bg-[#F0EFEA] px-3 py-1 font-mono text-xs text-[#3F6212]">
                <span className="h-2 w-2 rounded-full bg-[#3F6212]" />
                Linux Ethiopic input
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
                  Type Ethiopic naturally on Linux.
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-[#52525B]">
                  <strong className="font-medium text-[#18181B]">gkey</strong> is a lightweight phonetic input method that turns familiar Latin keystrokes into Ethiopic Fidel characters.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#18181B] px-5 py-3 text-sm font-medium text-[#F8F7F4] transition-colors hover:bg-[#27272A]"
                >
                  <Terminal className="h-4 w-4" />
                  View installation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/docs"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E2E0D8] bg-[#F0EFEA] px-5 py-3 text-sm font-medium transition-colors hover:border-[#18181B]"
                >
                  Read the docs
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#E2E0D8] pt-5 font-mono text-xs text-[#52525B]">
                <span>Wayland</span>
                <span>X11</span>
                <span>TTY</span>
                <span>Open source</span>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E2E0D8] bg-[#18181B] p-6 shadow-sm sm:p-8">
              <div className="mb-8 flex items-center gap-2 font-mono text-xs text-[#A1A1AA]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B45309]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#A3A3A3]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3F6212]" />
                <span className="ml-2">gkey — terminal</span>
              </div>
              <div className="space-y-4 font-mono text-sm leading-relaxed sm:text-base">
                <p className="text-[#A1A1AA]">$ gkey --start</p>
                <p className="text-[#F8F7F4]">Type: <span className="text-[#D4D4D8]">selam</span></p>
                <p className="text-4xl font-semibold tracking-wide text-[#F8F7F4] sm:text-5xl">ሰላም</p>
                <p className="border-t border-[#3F3F46] pt-4 text-xs text-[#A1A1AA]">Ethiopic input is ready.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#E2E0D8] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 max-w-2xl space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-[#3F6212]">Why gkey</p>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">A focused input tool for Linux.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="rounded-xl border border-[#E2E0D8] bg-[#F0EFEA] p-6">
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#52525B]">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6">
            <div className="rounded-2xl border border-[#E2E0D8] bg-[#F0EFEA] p-7 sm:p-10">
              <div className="max-w-2xl space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-[#3F6212]">Open source project</p>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Explore, use, and improve gkey.</h2>
                <p className="leading-relaxed text-[#52525B]">Find the installation guide, project documentation, contribution instructions, and issue tracker in the links below.</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/docs" className="rounded-lg bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#27272A]">Documentation</Link>
                  <Link href="/contribute" className="rounded-lg border border-[#D4D4D8] px-4 py-2.5 text-sm font-medium hover:border-[#18181B]">Contribute</Link>
                  <a href={siteConfig.links.issues} target="_blank" rel="noreferrer" className="rounded-lg border border-[#D4D4D8] px-4 py-2.5 text-sm font-medium hover:border-[#18181B]">Report an issue</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E2E0D8] bg-[#F0EFEA]/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-[#52525B] sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[#18181B]">gkey</span>
            <span>—</span>
            <span>Open-source Ethiopic input for Linux</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 font-mono">
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hover:text-[#18181B]">GitHub</a>
            <a href={siteConfig.links.sponsors} target="_blank" rel="noreferrer" className="text-[#B45309] hover:underline"><Heart className="mr-1 inline h-3 w-3" />Sponsors</a>
            <Link href="/docs" className="hover:text-[#18181B]">Docs</Link>
            <Link href="/contribute" className="hover:text-[#18181B]">Contribute</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
