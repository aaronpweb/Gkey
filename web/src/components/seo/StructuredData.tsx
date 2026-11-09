import { siteConfig } from "@/config/site";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Linux",
        description: siteConfig.description,
        isAccessibleForFree: true,
        codeRepository: siteConfig.links.github,
        url: siteConfig.siteUrl,
        sameAs: [siteConfig.links.github, siteConfig.links.sponsors],
      },
      {
        "@type": "WebSite",
        name: siteConfig.title,
        url: siteConfig.siteUrl,
        description: siteConfig.description,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
