/*
 * Regenerates static/og.png only.
 *
 * `npm run images` rebuilds every derivative — 93 tracked files under
 * static/img/ — which is the right thing when a photo changes and the wrong
 * thing when the only edit is a line of text on the share card. This renders
 * the card and nothing else.
 *
 * The SVG is read out of build-images.js rather than duplicated here, so the
 * two cannot drift; if that template ever starts interpolating values, this
 * script fails loudly instead of writing a card full of `${...}`.
 *
 * REQUIRES PRETENDARD AS A SYSTEM FONT. The copy in static/fonts/ is 92 woff2
 * subsets, which fontconfig cannot use — the renderer resolves `font-family` by
 * name against installed fonts. Without it the card still renders, silently, in
 * a fallback face. Check with `fc-list | grep -i pretendard` before trusting
 * the output, and if it comes back empty, install the OFL build from
 * https://github.com/orioncactus/pretendard/releases (the variable .ttf), or
 * point fontconfig at it for one run:
 *
 *   FONTCONFIG_FILE=/path/to/fonts.conf npm run og
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const source = readFileSync(join(ROOT, 'scripts', 'build-images.js'), 'utf8');
const match = source.match(/const og = `([\s\S]*?)`;\n/);
if (!match) throw new Error('Could not find the `const og = ...` template in build-images.js');

const svg = match[1];
if (svg.includes('${')) {
	throw new Error(
		'The OG template now interpolates values; render it from build-images.js instead.'
	);
}

const png = await sharp(Buffer.from(svg))
	.png({ quality: 90 })
	.toFile(join(ROOT, 'static', 'og.png'));
console.log(`og.png  ${(png.size / 1024).toFixed(1)} KB  ${png.width}x${png.height}`);
