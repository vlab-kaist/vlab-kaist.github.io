/**
 * Fails the build if any internal link or asset reference in build/ points at
 * something that does not exist.
 *
 *   npm run check:links
 *
 * This exists because of poster_22f.png: the Fall-2022 recruiting page linked an
 * image that was never committed, so the live recruiting poster 404'd from
 * February 2023 onward and nobody noticed for four years. Nothing in the repo
 * could have caught it. Now something does.
 *
 * External links are listed but not fetched — a club site should not fail its
 * own deploy because someone else's server is down.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(ROOT, 'build');

if (!existsSync(BUILD)) {
	console.error('build/ not found — run `npm run build` first.');
	process.exit(1);
}

/** Every file in build/, as a set of absolute paths. */
function walk(dir, acc = []) {
	for (const entry of readdirSync(dir)) {
		const p = join(dir, entry);
		if (statSync(p).isDirectory()) walk(p, acc);
		else acc.push(p);
	}
	return acc;
}

const files = walk(BUILD);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

// Attributes that point at something we can verify.
const REF = /(?:href|src|content)="([^"]+)"|srcset="([^"]+)"/g;

const broken = [];
const external = new Set();
let checked = 0;

for (const file of htmlFiles) {
	const html = readFileSync(file, 'utf8');

	for (const match of html.matchAll(REF)) {
		const raw = match[1] ?? match[2];
		if (!raw) continue;

		// srcset carries "url 640w, url 1024w" — check each candidate.
		const candidates = match[2] ? raw.split(',').map((c) => c.trim().split(/\s+/)[0]) : [raw];

		for (const link of candidates) {
			if (!link || link.startsWith('#') || link.startsWith('data:')) continue;
			if (/^(https?:)?\/\//.test(link) || /^(mailto|tel):/.test(link)) {
				external.add(link);
				continue;
			}
			// Only verify things that look like a path, not og:type="website" etc.
			if (!link.startsWith('/') && !link.startsWith('.')) continue;

			checked++;
			const clean = link.split('#')[0].split('?')[0];
			if (!clean) continue;

			const target = clean.startsWith('/') ? join(BUILD, clean) : resolve(dirname(file), clean);

			// A directory URL is served by its index.html.
			const ok =
				existsSync(target) ||
				existsSync(join(target, 'index.html')) ||
				existsSync(`${target}.html`);

			if (!ok) {
				broken.push({ from: relative(BUILD, file), link });
			}
		}
	}
}

console.log(
	`Scanned ${htmlFiles.length} pages · ${checked} internal refs · ${external.size} external`
);

if (broken.length) {
	console.error(`\n${broken.length} broken internal reference(s):\n`);
	for (const b of broken) console.error(`  ${b.from}  ->  ${b.link}`);
	process.exit(1);
}

console.log('No broken internal references.');
