import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ethiopic",
});

export const metadata: Metadata = {
  title: "gkey — Native Linux Ethiopic Phonetic Input Method",
  description:
    "Low-level Linux phonetic keyboard input method mapping English keystrokes into Ethiopic Fidel Unicode characters via evdev and deterministic state machine logic.",
  openGraph: {
    title: "gkey — Kernel-Level Ethiopic Input for Linux",
    description:
      "Display-server agnostic Fidel phonetic input method powered by evdev, uinput, and deterministic finite state machines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${notoEthiopic.variable} scroll-smooth`}
    >
      <body className="bg-[#F8F7F4] text-[#18181B] antialiased selection:bg-[#3F6212]/15 selection:text-[#3F6212]">
        {children}
      </body>
    </html>
  );
}
