# gkey web

The public website for gkey, the Linux Ethiopic phonetic input project.

## Development

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to the real production origin before deploying. It is used for canonical URLs, Open Graph metadata, JSON-LD, `sitemap.xml`, and `robots.txt`.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example npm run build
```

## Project structure

- `src/app/page.tsx` — interactive landing page.
- `src/app/docs` — crawlable documentation entry point.
- `src/app/contribute` — contribution and issue-reporting entry point.
- `src/app/sitemap.ts` and `src/app/robots.ts` — search crawler metadata.
- `src/components/seo` — structured SEO data.
- `src/config` — shared site links, copy, and installation data.

Keep product facts and installation commands synchronized with the canonical gkey repository before publishing.
