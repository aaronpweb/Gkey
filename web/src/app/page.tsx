"use client";

import React, { useState, useMemo } from "react";
import {
  Terminal,
  Cpu,
  Keyboard,
  Coffee,
  Heart,
  Copy,
  Check,
  ArrowRight,
  Layers,
  Zap,
  RotateCcw,
} from "lucide-react";
import { installTabs as INSTALL_TABS, siteConfig } from "@/config/site";

function Github({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

// ============================================================================
// 1. CONFIGURATION (Links & README Installation Commands)
// ============================================================================
const LINKS = {
  githubRepo: siteConfig.links.github,
  githubSponsors: siteConfig.links.sponsors,
  authorProfile: siteConfig.links.author,
};

// ============================================================================
// 2. ETHIOPIC PHONETIC STATE MACHINE ENGINE (For Live Browser Demo)
// ============================================================================
type FidelFamily = {
  consonant: string;
  label: string;
  forms: {
    sads: string; // 6th order (base consonant)
    geez: string; // 1st order (e)
    kaeb: string; // 2nd order (u)
    salis: string; // 3rd order (i)
    rabe: string; // 4th order (a)
    hamis: string; // 5th order (ie / ee)
    sabe: string; // 7th order (o)
    wa?: string; // Labialized (wa)
  };
};

const FIDEL_MAP: Record<string, FidelFamily> = {
  h: {
    consonant: "h",
    label: "ሀ-Family (Ha)",
    forms: { sads: "ህ", geez: "ሀ", kaeb: "ሁ", salis: "ሂ", rabe: "ሃ", hamis: "ሄ", sabe: "ሆ" },
  },
  l: {
    consonant: "l",
    label: "ለ-Family (La)",
    forms: { sads: "ል", geez: "ለ", kaeb: "ሉ", salis: "ሊ", rabe: "ላ", hamis: "ሌ", sabe: "ሎ", wa: "ሏ" },
  },
  m: {
    consonant: "m",
    label: "መ-Family (Ma)",
    forms: { sads: "ም", geez: "መ", kaeb: "ሙ", salis: "ሚ", rabe: "ማ", hamis: "ሜ", sabe: "ሞ", wa: "ሟ" },
  },
  s: {
    consonant: "s",
    label: "ሰ-Family (Sa)",
    forms: { sads: "ስ", geez: "ሰ", kaeb: "ሱ", salis: "ሲ", rabe: "ሳ", hamis: "ሴ", sabe: "ሶ", wa: "ሷ" },
  },
  r: {
    consonant: "r",
    label: "ረ-Family (Ra)",
    forms: { sads: "ር", geez: "ረ", kaeb: "ሩ", salis: "ሪ", rabe: "ራ", hamis: "ሬ", sabe: "ሮ", wa: "ሯ" },
  },
  sh: {
    consonant: "sh",
    label: "ሸ-Family (Sha)",
    forms: { sads: "ሽ", geez: "ሸ", kaeb: "ሹ", salis: "ሺ", rabe: "ሻ", hamis: "ሼ", sabe: "ሾ", wa: "ሿ" },
  },
  q: {
    consonant: "q",
    label: "ቀ-Family (Qa)",
    forms: { sads: "ቅ", geez: "ቀ", kaeb: "ቁ", salis: "ቂ", rabe: "ቃ", hamis: "ቄ", sabe: "ቆ", wa: "ቋ" },
  },
  b: {
    consonant: "b",
    label: "በ-Family (Ba)",
    forms: { sads: "ብ", geez: "በ", kaeb: "ቡ", salis: "ቢ", rabe: "ባ", hamis: "ቤ", sabe: "ቦ", wa: "ቧ" },
  },
  t: {
    consonant: "t",
    label: "ተ-Family (Ta)",
    forms: { sads: "ት", geez: "ተ", kaeb: "ቱ", salis: "ቲ", rabe: "ታ", hamis: "ቴ", sabe: "ቶ", wa: "ቷ" },
  },
  n: {
    consonant: "n",
    label: "ነ-Family (Na)",
    forms: { sads: "ን", geez: "ነ", kaeb: "ኑ", salis: "ኒ", rabe: "ና", hamis: "ኔ", sabe: "ኖ", wa: "ኗ" },
  },
  k: {
    consonant: "k",
    label: "ከ-Family (Ka)",
    forms: { sads: "ክ", geez: "ከ", kaeb: "ኩ", salis: "ኪ", rabe: "ካ", hamis: "ኬ", sabe: "ኮ", wa: "ኳ" },
  },
  w: {
    consonant: "w",
    label: "ወ-Family (Wa)",
    forms: { sads: "ው", geez: "ወ", kaeb: "ዉ", salis: "ዊ", rabe: "ዋ", hamis: "ዌ", sabe: "ዎ" },
  },
  z: {
    consonant: "z",
    label: "ዘ-Family (Za)",
    forms: { sads: "ዝ", geez: "ዘ", kaeb: "ዙ", salis: "ዚ", rabe: "ዛ", hamis: "ዜ", sabe: "ዞ", wa: "ዟ" },
  },
  y: {
    consonant: "y",
    label: "የ-Family (Ya)",
    forms: { sads: "ይ", geez: "የ", kaeb: "ዩ", salis: "ዪ", rabe: "ያ", hamis: "ዬ", sabe: "ዮ" },
  },
  d: {
    consonant: "d",
    label: "ደ-Family (Da)",
    forms: { sads: "ድ", geez: "ደ", kaeb: "ዱ", salis: "ዲ", rabe: "ዳ", hamis: "ዴ", sabe: "ዶ", wa: "ዷ" },
  },
  g: {
    consonant: "g",
    label: "ገ-Family (Ga)",
    forms: { sads: "ግ", geez: "ገ", kaeb: "ጉ", salis: "ጊ", rabe: "ጋ", hamis: "ጌ", sabe: "ጎ", wa: "ጓ" },
  },
  f: {
    consonant: "f",
    label: "ፈ-Family (Fa)",
    forms: { sads: "ፍ", geez: "ፈ", kaeb: "ፉ", salis: "ፊ", rabe: "ፋ", hamis: "ፌ", sabe: "ፎ", wa: "ፏ" },
  },
  p: {
    consonant: "p",
    label: "ፐ-Family (Pa)",
    forms: { sads: "ፕ", geez: "ፐ", kaeb: "ፑ", salis: "ፒ", rabe: "ፓ", hamis: "ፔ", sabe: "ፖ" },
  },
};

const LONE_VOWELS: Record<string, string> = {
  e: "አ",
  u: "ኡ",
  i: "ኢ",
  a: "ኣ",
  o: "ኦ",
};

interface SimulationStep {
  rawInput: string;
  fidelOutput: string;
  currentState: "IDLE" | "CONSONANT_BUFFER" | "VOWEL_MUTATION" | "COMPOUND_WA";
  activeFamily: string | null;
  lastKeycode: string;
  lastUnicode: string;
}

function simulateGkeyStateMachine(input: string): SimulationStep {
  const lower = input.toLowerCase();
  if (!lower) {
    return {
      rawInput: "",
      fidelOutput: "",
      currentState: "IDLE",
      activeFamily: null,
      lastKeycode: "NONE",
      lastUnicode: "—",
    };
  }

  let output = "";
  let i = 0;
  let state: SimulationStep["currentState"] = "IDLE";
  let activeFam: string | null = null;

  while (i < lower.length) {
    const ch = lower[i];
    const next = lower[i + 1];

    if (ch === " ") {
      output += " ";
      state = "IDLE";
      activeFam = null;
      i++;
      continue;
    }

    // Check digraph "sh"
    let familyKey: string | null = null;
    let step = 1;
    if (ch === "s" && next === "h") {
      familyKey = "sh";
      step = 2;
    } else if (FIDEL_MAP[ch]) {
      familyKey = ch;
      step = 1;
    }

    if (familyKey) {
      const fam = FIDEL_MAP[familyKey];
      activeFam = familyKey;
      const v1 = lower[i + step];
      const v2 = lower[i + step + 1];

      // Check labialized 'wa'
      if (v1 === "w" && v2 === "a" && fam.forms.wa) {
        output += fam.forms.wa;
        state = "COMPOUND_WA";
        i += step + 2;
      } else if (v1 === "i" && v2 === "e") {
        // 5th order 'ie'
        output += fam.forms.hamis;
        state = "VOWEL_MUTATION";
        i += step + 2;
      } else if (v1 === "e" && v2 === "e") {
        // 5th order 'ee'
        output += fam.forms.hamis;
        state = "VOWEL_MUTATION";
        i += step + 2;
      } else if (v1 === "e") {
        output += fam.forms.geez;
        state = "VOWEL_MUTATION";
        i += step + 1;
      } else if (v1 === "u") {
        output += fam.forms.kaeb;
        state = "VOWEL_MUTATION";
        i += step + 1;
      } else if (v1 === "i") {
        output += fam.forms.salis;
        state = "VOWEL_MUTATION";
        i += step + 1;
      } else if (v1 === "a") {
        output += fam.forms.rabe;
        state = "VOWEL_MUTATION";
        i += step + 1;
      } else if (v1 === "o") {
        output += fam.forms.sabe;
        state = "VOWEL_MUTATION";
        i += step + 1;
      } else {
        // Base 6th order (Sads)
        output += fam.forms.sads;
        state = "CONSONANT_BUFFER";
        i += step;
      }
    } else if (LONE_VOWELS[ch]) {
      output += LONE_VOWELS[ch];
      state = "VOWEL_MUTATION";
      activeFam = null;
      i++;
    } else {
      output += ch;
      state = "IDLE";
      i++;
    }
  }

  const lastChar = lower[lower.length - 1];
  const lastKeycode =
    lastChar === " " ? "KEY_SPACE (57)" : `KEY_${lastChar.toUpperCase()}`;

  const trimmedOutput = output.trim();
  const lastFidelChar = trimmedOutput
    ? trimmedOutput[trimmedOutput.length - 1]
    : "";
  const lastUnicode = lastFidelChar
    ? `U+${lastFidelChar.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")}`
    : "—";

  return {
    rawInput: input,
    fidelOutput: output,
    currentState: state,
    activeFamily: activeFam,
    lastKeycode,
    lastUnicode,
  };
}

// ============================================================================
// 3. MAIN PAGE COMPONENT
// ============================================================================
export default function GkeyLandingPage() {
  const [demoInput, setDemoInput] = useState("selam");
  const [activeInstallTab, setActiveInstallTab] = useState("quick");
  const [copiedHero, setCopiedHero] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<string>("s");

  const sim = useMemo(() => simulateGkeyStateMachine(demoInput), [demoInput]);

  const copyText = (text: string, target: "hero" | "install") => {
    navigator.clipboard.writeText(text);
    if (target === "hero") {
      setCopiedHero(true);
      setTimeout(() => setCopiedHero(false), 2000);
    } else {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    }
  };

  const currentTabObj =
    INSTALL_TABS.find((t) => t.id === activeInstallTab) || INSTALL_TABS[0];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8F7F4] text-[#18181B]">
      {/* =====================================================================
          STICKY MINIMAL HEADER
      ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-[#E2E0D8] bg-[#F8F7F4]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-md bg-[#18181B] text-[#F8F7F4] flex items-center justify-center font-semibold text-base shadow-xs group-hover:bg-[#3F6212] transition-colors">
              ሀ
            </span>
            <span className="font-mono font-bold text-lg tracking-tight">
              gkey
            </span>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-[#F0EFEA] border border-[#E2E0D8] text-[#52525B]">
              evdev + uinput
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#52525B]">
            <a
              href="#simulator"
              className="hover:text-[#18181B] transition-colors"
            >
              State Simulator
            </a>
            <a
              href="#architecture"
              className="hover:text-[#18181B] transition-colors"
            >
              Architecture
            </a>
            <a
              href="#keymap"
              className="hover:text-[#18181B] transition-colors"
            >
              Phonetic Map
            </a>
            <a
              href="#install"
              className="hover:text-[#18181B] transition-colors"
            >
              Install
            </a>
            <a
              href="/docs"
              className="hover:text-[#18181B] transition-colors"
            >
              Docs
            </a>
            <a
              href="/contribute"
              className="hover:text-[#18181B] transition-colors"
            >
              Contribute
            </a>
            <a
              href="#sponsor"
              className="hover:text-[#B45309] transition-colors"
            >
              Sponsor
            </a>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href={LINKS.githubRepo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium border border-[#E2E0D8] bg-[#F0EFEA] hover:bg-[#E7E5DF] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={LINKS.githubSponsors}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-[#B45309] text-white hover:bg-[#92400E] transition-colors shadow-xs"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Sponsor</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* =====================================================================
            HERO SECTION + INTERACTIVE STATE-MACHINE SANDBOX
        ===================================================================== */}
        <section className="py-14 sm:py-20 border-b border-[#E2E0D8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Engineering Pitch */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EFEA] border border-[#E2E0D8] text-xs font-mono text-[#3F6212]">
                  <span className="w-2 h-2 rounded-full bg-[#3F6212] animate-pulse" />
                  <span>Linux Kernel Input Subsystem • Ethiopic UTF-8</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.12] text-[#18181B]">
                  Native Ethiopic Phonetic Input for Linux.{" "}
                  <span className="text-[#52525B] font-normal">
                    Zero IME Bloat.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
                  <strong className="text-[#18181B] font-medium">gkey</strong>{" "}
                  intercepts raw hardware keystrokes directly from{" "}
                  <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-[#F0EFEA] border border-[#E2E0D8] text-[#18181B]">
                    /dev/input/event*
                  </code>{" "}
                  via <code className="font-mono text-sm">evdev</code> and
                  transliterates English phonetics into Ethiopic Fidel Unicode
                  characters using a deterministic finite state machine.
                </p>

                {/* Quick Clone Bar & Primary CTAs */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between gap-2 p-2.5 pl-4 rounded-lg bg-[#F0EFEA] border border-[#E2E0D8] font-mono text-xs sm:text-sm">
                    <div className="truncate text-[#18181B]">
                      <span className="text-[#3F6212] select-none">$ </span>
                      git clone https://github.com/aaronpweb/gkey.git
                    </div>
                    <button
                      onClick={() =>
                        copyText(
                          "git clone https://github.com/aaronpweb/gkey.git",
                          "hero"
                        )
                      }
                      className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#F8F7F4] border border-[#E2E0D8] hover:border-[#18181B] text-xs font-sans font-medium transition-colors"
                      title="Copy clone command"
                    >
                      {copiedHero ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#3F6212]" />
                          <span className="text-[#3F6212]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#52525B]" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href="#install"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#18181B] text-[#F8F7F4] text-sm font-medium hover:bg-[#27272A] transition-colors"
                    >
                      <Terminal className="w-4 h-4" />
                      <span>Installation Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href={LINKS.githubSponsors}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#B45309]/40 bg-[#B45309]/10 text-[#B45309] text-sm font-medium hover:bg-[#B45309]/15 transition-colors"
                    >
                      <Coffee className="w-4 h-4" />
                      <span>Buy Me a Coffee / Sponsor</span>
                    </a>
                  </div>
                </div>

                {/* Key Technical Highlights */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E2E0D8]">
                  <div>
                    <div className="font-mono text-xs uppercase text-[#52525B]">
                      Display Server
                    </div>
                    <div className="font-semibold text-sm sm:text-base mt-0.5">
                      Wayland, X11 & TTY
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase text-[#52525B]">
                      Lookup Time
                    </div>
                    <div className="font-semibold text-sm sm:text-base mt-0.5">
                      O(1) State Transitions
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase text-[#52525B]">
                      Footprint
                    </div>
                    <div className="font-semibold text-sm sm:text-base mt-0.5">
                      Zero GUI Overhead
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live State Machine Interactive Box */}
              <div
                id="simulator"
                className="lg:col-span-6 rounded-xl bg-[#F0EFEA] border border-[#E2E0D8] shadow-xs overflow-hidden"
              >
                {/* Top Bar */}
                <div className="px-4 py-3 border-b border-[#E2E0D8] bg-[#E8E6DF]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#3F6212]" />
                    <span className="font-mono text-xs font-semibold text-[#18181B]">
                      gkey Live State-Machine Sandbox
                    </span>
                  </div>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#3F6212]/10 text-[#3F6212] font-medium">
                    Interactive
                  </span>
                </div>

                <div className="p-5 space-y-5">
                  {/* Preset Quick Chips */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-[#52525B] mr-1">
                      Try presets:
                    </span>
                    {[
                      { label: "selam (ሰላም)", val: "selam" },
                      { label: "tihlo (ትህሎ)", val: "tihlo" },
                      { label: "shiro (ሽሮ)", val: "shiro" },
                      { label: "qwanqwa (ቋንቋ)", val: "qwanqwa" },
                      { label: "hagere (ሀገሬ)", val: "hagere" },
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        onClick={() => setDemoInput(preset.val)}
                        className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                          demoInput.toLowerCase() === preset.val
                            ? "bg-[#18181B] text-[#F8F7F4] border-[#18181B]"
                            : "bg-[#F8F7F4] text-[#52525B] border-[#E2E0D8] hover:border-[#18181B]"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>

                  {/* Phonetic Input Box */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label
                        htmlFor="phonetic-input"
                        className="text-xs font-mono uppercase tracking-wider text-[#52525B]"
                      >
                        1. Type English Phonetics (evdev stream)
                      </label>
                      <button
                        onClick={() => setDemoInput("")}
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#52525B] hover:text-[#18181B]"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset
                      </button>
                    </div>
                    <input
                      id="phonetic-input"
                      type="text"
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      placeholder="Type e.g. selam, shiro, qwanqwa..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#F8F7F4] border border-[#E2E0D8] focus:outline-none focus:border-[#3F6212] font-mono text-base text-[#18181B]"
                    />
                  </div>

                  {/* Finite State Machine Transition Visualizer */}
                  <div className="p-3.5 rounded-lg bg-[#F8F7F4] border border-[#E2E0D8] space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#52525B]">
                      <span>2. Finite State Machine Node</span>
                      <span className="text-[#3F6212] font-semibold">
                        STATE: {sim.currentState}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                      <div
                        className={`p-2 rounded border transition-all ${
                          sim.currentState === "IDLE"
                            ? "bg-[#3F6212]/15 border-[#3F6212] text-[#3F6212] font-bold"
                            : "bg-[#F0EFEA] border-[#E2E0D8] text-[#52525B]"
                        }`}
                      >
                        <div>S0: IDLE</div>
                        <div className="text-[10px] opacity-75 mt-0.5">
                          Await Keycode
                        </div>
                      </div>

                      <div
                        className={`p-2 rounded border transition-all ${
                          sim.currentState === "CONSONANT_BUFFER"
                            ? "bg-[#3F6212]/15 border-[#3F6212] text-[#3F6212] font-bold"
                            : "bg-[#F0EFEA] border-[#E2E0D8] text-[#52525B]"
                        }`}
                      >
                        <div>S1: 6th ORDER</div>
                        <div className="text-[10px] opacity-75 mt-0.5">
                          Base Consonant (ሳድስ)
                        </div>
                      </div>

                      <div
                        className={`p-2 rounded border transition-all ${
                          sim.currentState === "VOWEL_MUTATION" ||
                          sim.currentState === "COMPOUND_WA"
                            ? "bg-[#3F6212]/15 border-[#3F6212] text-[#3F6212] font-bold"
                            : "bg-[#F0EFEA] border-[#E2E0D8] text-[#52525B]"
                        }`}
                      >
                        <div>S2: MUTATE</div>
                        <div className="text-[10px] opacity-75 mt-0.5">
                          Vowel / Labial (1st–7th)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E2E0D8] font-mono text-[11px] text-[#52525B]">
                      <span>Last evdev event: {sim.lastKeycode}</span>
                      <span>Emitted codepoint: {sim.lastUnicode}</span>
                    </div>
                  </div>

                  {/* Emitted Fidel Output */}
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#52525B] mb-1.5">
                      3. Emitted Virtual uinput Output (UTF-8 Fidel)
                    </div>
                    <div className="min-h-[76px] px-4 py-3 rounded-lg bg-[#18181B] text-[#F8F7F4] flex items-center justify-between">
                      <span className="text-3xl sm:text-4xl font-semibold tracking-wide break-all">
                        {sim.fidelOutput || (
                          <span className="text-[#52525B] text-lg font-mono font-normal">
                            Waiting for keystrokes...
                          </span>
                        )}
                      </span>
                      <span className="text-xs font-mono px-2 py-1 rounded bg-[#27272A] text-[#A1A1AA] shrink-0 ml-3">
                        UTF-8
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            ARCHITECTURE SECTION (How gkey Works Under the Hood)
        ===================================================================== */}
        <section
          id="architecture"
          className="py-16 sm:py-20 border-b border-[#E2E0D8]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#3F6212]">
                Systems Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Engineered Close to the Kernel
              </h2>
              <p className="text-[#52525B] text-base leading-relaxed">
                Traditional Linux input frameworks (IBus, Fcitx) often break
                across Wayland compositors, tiling window managers, or raw TTY
                sessions. <strong>gkey</strong> operates directly at the Linux
                input event layer for universal compatibility.
              </p>
            </div>

            {/* 3-Step Pipeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-6 rounded-xl bg-[#F0EFEA] border border-[#E2E0D8] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-lg bg-[#F8F7F4] border border-[#E2E0D8] flex items-center justify-center text-[#18181B]">
                      <Keyboard className="w-5 h-5" />
                    </span>
                    <span className="font-mono text-xs text-[#52525B]">
                      STAGE 01
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Raw <code className="font-mono text-base">evdev</code>{" "}
                    Interception
                  </h3>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    Hooks directly into Linux{" "}
                    <code className="font-mono text-xs">/dev/input/event*</code>{" "}
                    character devices to capture hardware key press and release
                    structs before the display server processes them.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E0D8] font-mono text-xs text-[#3F6212]">
                  struct input_event → KEY_PRESS
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 rounded-xl bg-[#F0EFEA] border border-[#E2E0D8] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-lg bg-[#F8F7F4] border border-[#E2E0D8] flex items-center justify-center text-[#18181B]">
                      <Layers className="w-5 h-5" />
                    </span>
                    <span className="font-mono text-xs text-[#52525B]">
                      STAGE 02
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Finite State Machine Logic
                  </h3>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    Tracks consonant buffers and multi-vowel sequences in real
                    time. When a vowel modifier arrives following a 6th-order
                    base character, the state machine atomically mutates the
                    active Fidel glyph.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E0D8] font-mono text-xs text-[#3F6212]">
                  ስ (U+1235) + &apos;e&apos; → ሰ (U+1230)
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 rounded-xl bg-[#F0EFEA] border border-[#E2E0D8] flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-lg bg-[#F8F7F4] border border-[#E2E0D8] flex items-center justify-center text-[#18181B]">
                      <Zap className="w-5 h-5" />
                    </span>
                    <span className="font-mono text-xs text-[#52525B]">
                      STAGE 03
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Virtual <code className="font-mono text-base">uinput</code>{" "}
                    Emission
                  </h3>
                  <p className="text-sm text-[#52525B] leading-relaxed">
                    Creates a virtual kernel input device via{" "}
                    <code className="font-mono text-xs">/dev/uinput</code> that
                    emits the resolved Ethiopic Unicode sequence back into any
                    active application with sub-millisecond latency.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E2E0D8] font-mono text-xs text-[#3F6212]">
                  /dev/uinput → UTF-8 Fidel Stream
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            INTERACTIVE PHONETIC KEYMAP REFERENCE
        ===================================================================== */}
        <section
          id="keymap"
          className="py-16 sm:py-20 border-b border-[#E2E0D8]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-widest text-[#3F6212]">
                  Phonetic Transliteration Matrix
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Intuitive 7-Order Fidel Mapping
                </h2>
              </div>
              <p className="text-sm text-[#52525B] max-w-md">
                Select a consonant family below to inspect how{" "}
                <code className="font-mono text-xs">gkey</code> transitions
                between the 7 standard Ethiopic vowel orders and labialized
                variants.
              </p>
            </div>

            {/* Consonant Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(FIDEL_MAP).map((key) => {
                const item = FIDEL_MAP[key];
                const isSelected = selectedFamily === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedFamily(key)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs sm:text-sm border transition-all flex items-center gap-2 ${
                      isSelected
                        ? "bg-[#18181B] text-[#F8F7F4] border-[#18181B] shadow-xs"
                        : "bg-[#F0EFEA] text-[#18181B] border-[#E2E0D8] hover:bg-[#E6E4DD]"
                    }`}
                  >
                    <span className="text-base">{item.forms.geez}</span>
                    <span>{key}</span>
                  </button>
                );
              })}
            </div>

            {/* 7 Orders Display Grid */}
            {FIDEL_MAP[selectedFamily] && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  {
                    order: "6th (ሳድስ)",
                    stroke: selectedFamily,
                    glyph: FIDEL_MAP[selectedFamily].forms.sads,
                    desc: "Base Consonant",
                  },
                  {
                    order: "1st (ግዕዝ)",
                    stroke: `${selectedFamily}e`,
                    glyph: FIDEL_MAP[selectedFamily].forms.geez,
                    desc: "+ 'e' vowel",
                  },
                  {
                    order: "2nd (ካዕብ)",
                    stroke: `${selectedFamily}u`,
                    glyph: FIDEL_MAP[selectedFamily].forms.kaeb,
                    desc: "+ 'u' vowel",
                  },
                  {
                    order: "3rd (ሣልስ)",
                    stroke: `${selectedFamily}i`,
                    glyph: FIDEL_MAP[selectedFamily].forms.salis,
                    desc: "+ 'i' vowel",
                  },
                  {
                    order: "4th (ራብዕ)",
                    stroke: `${selectedFamily}a`,
                    glyph: FIDEL_MAP[selectedFamily].forms.rabe,
                    desc: "+ 'a' vowel",
                  },
                  {
                    order: "5th (ኃምስ)",
                    stroke: `${selectedFamily}ie`,
                    glyph: FIDEL_MAP[selectedFamily].forms.hamis,
                    desc: "+ 'ie' / 'ee'",
                  },
                  {
                    order: "7th (ሳብዕ)",
                    stroke: `${selectedFamily}o`,
                    glyph: FIDEL_MAP[selectedFamily].forms.sabe,
                    desc: "+ 'o' vowel",
                  },
                  {
                    order: "Labial (ዲቃላ)",
                    stroke: FIDEL_MAP[selectedFamily].forms.wa
                      ? `${selectedFamily}wa`
                      : "—",
                    glyph: FIDEL_MAP[selectedFamily].forms.wa || "—",
                    desc: "+ 'wa' compound",
                  },
                ].map((cell) => (
                  <div
                    key={cell.order}
                    className="p-4 rounded-xl bg-[#F0EFEA] border border-[#E2E0D8] flex flex-col items-center text-center justify-between"
                  >
                    <span className="text-[11px] font-mono text-[#52525B]">
                      {cell.order}
                    </span>
                    <span className="text-4xl font-semibold my-3 text-[#18181B]">
                      {cell.glyph}
                    </span>
                    <div className="space-y-0.5">
                      <div className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#F8F7F4] border border-[#E2E0D8] text-[#3F6212]">
                        {cell.stroke}
                      </div>
                      <div className="text-[10px] text-[#52525B] pt-1">
                        {cell.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================================
            README INSTALLATION BLOCK
        ===================================================================== */}
        <section
          id="install"
          className="py-16 sm:py-20 border-b border-[#E2E0D8]"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#3F6212]">
                Quick Deployment
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Install <span className="font-mono">gkey</span> in Seconds
              </h2>
              <p className="text-sm sm:text-base text-[#52525B]">
                Works out of the box on Arch Linux, Ubuntu, Debian, Fedora, and
                any Linux distribution with{" "}
                <code className="font-mono text-xs">evdev</code> and{" "}
                <code className="font-mono text-xs">uinput</code> enabled.
              </p>
            </div>

            <div className="rounded-xl bg-[#F0EFEA] border border-[#E2E0D8] overflow-hidden shadow-xs">
              {/* Terminal Header + Tabs */}
              <div className="px-4 py-2.5 bg-[#E6E4DD] border-b border-[#E2E0D8] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {INSTALL_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveInstallTab(tab.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                        activeInstallTab === tab.id
                          ? "bg-[#18181B] text-[#F8F7F4] font-semibold"
                          : "text-[#52525B] hover:text-[#18181B]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => copyText(currentTabObj.commands, "install")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#F8F7F4] border border-[#E2E0D8] hover:border-[#18181B] text-xs font-medium transition-colors"
                >
                  {copiedInstall ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#3F6212]" />
                      <span className="text-[#3F6212]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#52525B]" />
                      <span>Copy Commands</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description Bar */}
              <div className="px-5 py-2.5 bg-[#F8F7F4] border-b border-[#E2E0D8] text-xs text-[#52525B] flex items-center justify-between">
                <span>{currentTabObj.description}</span>
                <a
                  href={`${LINKS.githubRepo}#readme`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[#3F6212] hover:underline"
                >
                  View full README.md →
                </a>
              </div>

              {/* Code Pre Block */}
              <pre className="p-5 bg-[#18181B] text-[#F8F7F4] font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                <code>{currentTabObj.commands}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SPONSOR & BUY ME A COFFEE SECTION
        ===================================================================== */}
        <section id="sponsor" className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#F0EFEA] border border-[#E2E0D8] relative overflow-hidden">
              <div className="max-w-2xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B45309]/10 border border-[#B45309]/30 text-xs font-mono text-[#B45309]">
                  <Heart className="w-3.5 h-3.5 fill-[#B45309]" />
                  <span>Open-Source Ethiopian Digital Infrastructure</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
                  Support the Development of{" "}
                  <span className="font-mono">gkey</span>
                </h2>

                <p className="text-[#52525B] text-base leading-relaxed">
                  <strong>gkey</strong> is free, open-source software built from
                  scratch to make native Ethiopic typing effortless for Linux
                  developers, students, and engineers. If this tool saves you
                  time or supports your workflow, consider sponsoring the
                  project or buying me a coffee via GitHub Sponsors.
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href={LINKS.githubSponsors}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#B45309] text-white text-sm font-medium hover:bg-[#92400E] transition-colors shadow-xs"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Sponsor on GitHub / Buy Me a Coffee</span>
                  </a>

                  <a
                    href={LINKS.githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#F8F7F4] border border-[#E2E0D8] text-[#18181B] text-sm font-medium hover:border-[#18181B] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Star aaronpweb/gkey</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          MINIMAL FOOTER
      ===================================================================== */}
      <footer className="border-t border-[#E2E0D8] bg-[#F0EFEA]/60 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#52525B]">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-[#18181B]">gkey</span>
            <span>—</span>
            <span>
              Engineered by{" "}
              <a
                href={LINKS.authorProfile}
                target="_blank"
                rel="noreferrer"
                className="text-[#18181B] font-medium hover:underline"
              >
                Aaron Teshale (@aaronpweb)
              </a>
            </span>
          </div>

          <div className="flex items-center gap-5 font-mono">
            <a
              href={LINKS.githubRepo}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#18181B] transition-colors"
            >
              Repository
            </a>
            <a
              href={LINKS.githubSponsors}
              target="_blank"
              rel="noreferrer"
              className="text-[#B45309] hover:underline"
            >
              GitHub Sponsors
            </a>
            <a href="/docs" className="hover:text-[#18181B] transition-colors">
              Documentation
            </a>
            <a
              href="/contribute"
              className="hover:text-[#18181B] transition-colors"
            >
              Contribute
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
