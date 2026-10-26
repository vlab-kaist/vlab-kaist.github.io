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

/**
 * Is recruiting open? The one switch for the hero badge and the join page's
 * apply button. When false, neither links to the form; both say recruiting is
 * closed instead. Flip it to true when a round opens (and check that
 * `join.ctaHref` in i18n points at that round's form).
 */
export const RECRUITING = false;
