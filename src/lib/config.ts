/**
 * Canonical origin, used to build absolute URLs for OG tags, the sitemap and
 * JSON-LD. Crawlers and chat unfurlers reject relative image URLs, so these
 * have to be absolute at build time.
 *
 * If Vlab ever moves to a custom domain, change this one line and add a CNAME
 * file to static/.
 */
export const SITE_URL = 'https://vlab-kaist.github.io';

export const GITHUB_ORG = 'https://github.com/vlab-kaist';
