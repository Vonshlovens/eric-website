/**
 * Sitemap XML Generator
 *
 * Generates a sitemap for search engines to discover and index pages.
 * Update the base URL when deploying to production.
 */

import type { RequestHandler } from './$types';

const baseUrl = 'https://example.com'; // TODO: Update with actual domain
const pages = [
  { path: '', priority: 1.0, changefreq: 'weekly' }
];

export const GET: RequestHandler = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
};
