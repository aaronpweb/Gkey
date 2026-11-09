import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s | gkey",
  },
  description: siteConfig.description,
  keywords: [
    "Ethiopic keyboard",
    "Amharic Linux input",
    "Linux phonetic input",
    "Ge'ez keyboard",
    "evdev",
    "uinput",
    "gkey",
  ],
  authors: [{ name: "Aaron Teshale", url: siteConfig.links.author }],
  creator: "Aaron Teshale",
  publisher: "gkey open source project",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.siteUrl,
    siteName: "gkey",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.siteUrl,
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
      className="scroll-smooth"
    >
      <head>
        <StructuredData />
      </head>
      <body className="bg-[#F8F7F4] text-[#18181B] antialiased selection:bg-[#3F6212]/15 selection:text-[#3F6212]">
        {children}
      </body>
    </html>
  );
}
