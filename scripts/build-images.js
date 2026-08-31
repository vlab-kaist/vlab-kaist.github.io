/**
 * Generates every image the site serves, from the originals in images.source/.
 *
 *   npm run images
 *
 * Why this exists: the old site shipped camera-original files straight to the
 * browser — an 11.7 MB homepage, a 20 MB PNG nobody referenced, and phones
 * downloading 4032px photos to fill a 280px slot. Everything here is derived,
 * so static/img/ can be deleted and rebuilt at any time.
 *
 * Outputs, per image: AVIF + WebP at each width, plus one JPEG so that no
 * browser ever gets a broken picture. Plus the icons and the OG share card.
 */
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync } from 'node:fs';

/*
 * `--only=sponsors` regenerates just the sponsor logos.
 *
 * A full run re-encodes every photo derivative, and the AVIF encoder is not
 * byte-deterministic across versions — adding one 3KB logo produced a 93-file
 * diff. The photos have not changed; only their bytes had. This flag exists so
 * that stops happening.
 */
const ONLY = process.argv.find((a) => a.startsWith('--only='))?.slice('--only='.length);
const shouldRun = (stage) => !ONLY || ONLY === stage;
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'images.source');
const OUT = join(ROOT, 'static', 'img');

/**
 * `widths` are the rendered widths we actually need — not arbitrary sizes.
 * Adding one costs ~2 files; adding a needless one costs bandwidth forever.
 *
 * `cropBottom` trims rows off the bottom of the source. Two of these images are
 * screengrabs of a YouTube page, and the player chrome — title bar, channel
 * avatar, subscribe button, like counter — was baked into the capture. Cropping
 * it here rather than in CSS means the bytes are never shipped at all.
 * TODO(owner): these are still third-party broadcast frames; see CONTENT-TODO.md.
 */
const IMAGES = {
	'team-2025': { file: 'team-2025.jpg', widths: [640, 1024, 1600, 2400] },
	'win-2025': { file: 'win-2025.jpg', widths: [640, 1024, 1600] },
	rocketleague: { file: 'rocketleague.jpg', widths: [640, 1024, 1600] },
	'flex-rlbot': { file: 'flex-rlbot.jpg', widths: [640, 1024, 1600], cropBottom: 190 },
	'quiz-2025': { file: 'quiz-2025.jpg', widths: [640, 1024, 1600], cropBottom: 204 },
	'win-2022': { file: 'win-2022.jpg', widths: [640, 1024, 1600] },
	seminar: { file: 'seminar.jpg', widths: [640, 1024, 1440] },
	wiki: { file: 'wiki.jpg', widths: [640, 1024, 1600] },

	// Club-life photos for the "동아리 생활" crossfade showcase.
	'life-practice': { file: 'life-practice.jpg', widths: [640, 1024, 1600] },
	'life-festival': { file: 'life-festival.jpg', widths: [640, 1024, 1600] },
	'life-picnic': { file: 'life-picnic.jpg', widths: [640, 1024, 1600] },
	'life-dinner': { file: 'life-dinner.jpg', widths: [640, 1024, 1600] },
	'life-strawberry': { file: 'life-strawberry.jpg', widths: [640, 1024, 1600] }
};

/**
 * Sponsor logos. Each is rendered at 4x its 30px display height so it stays
 * crisp on any screen.
 *
 * `cutWhite` flood-fills the white background to transparent — see cutBackground
 * below for why that is not just "make white transparent".
 */
const SPONSORS = {
	elice: { file: 'elice-logo.png', height: 120, cutWhite: true },
	// Colour Korean lockup, already transparent, so no background cut.
	// `reverse` additionally emits a white knockout for the ink theme: the mark
	// is #004191 across most of its pixels and measures 1.95:1 on ink, and the
	// school publishes no reverse version. A white knockout is the standard
	// treatment for a dark mark on a dark ground and keeps the background
	// transparent, where a plate does not and a brightness filter invents a
	// colour the school does not use.
	'kaist-cs': { file: 'kaist-cs-logo.png', height: 120, reverse: true }
};

const AVIF = { quality: 50, effort: 6 };
const WEBP = { quality: 78 };
const JPEG = { quality: 80, mozjpeg: true };

/**
 * Make a logo's white background transparent, without destroying white parts of
 * the artwork itself.
 *
 * Elice's logo is white lettering inside a purple blob, supplied on a solid
 * white background. A naive white -> transparent would knock out the lettering
 * too, since those pixels are also white. So instead this flood-fills inward
 * from the edges: pixels enclosed by the blob are never reached and survive.
 *
 * Rim pixels get partial alpha derived from their luminance, otherwise the blob
 * ships with a hard white fringe against a dark page.
 *
 * Never do this by colour-filtering a sponsor's mark — that alters their brand.
 * If a sponsor supplies a transparent asset, drop `cutWhite` and use it as-is.
 */
async function cutBackground(input) {
	const { data, info } = await sharp(input)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const { width: W, height: H } = info;
	const at = (x, y) => (y * W + x) * 4;
	const isWhite = (i) => data[i] > 232 && data[i + 1] > 232 && data[i + 2] > 232;

	const outside = new Uint8Array(W * H);
	const stack = [];
	for (let x = 0; x < W; x++) stack.push([x, 0], [x, H - 1]);
	for (let y = 0; y < H; y++) stack.push([0, y], [W - 1, y]);

	while (stack.length) {
		const [x, y] = stack.pop();
		if (x < 0 || y < 0 || x >= W || y >= H) continue;
		const idx = y * W + x;
		if (outside[idx] || !isWhite(at(x, y))) continue;
		outside[idx] = 1;
		stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
	}

	const NEIGHBOURS = [
		[1, 0],
		[-1, 0],
		[0, 1],
		[0, -1]
	];
	for (let y = 0; y < H; y++) {
		for (let x = 0; x < W; x++) {
			const i = at(x, y);
			if (outside[y * W + x]) {
				data[i + 3] = 0;
				continue;
			}
			const onRim = NEIGHBOURS.some(([dx, dy]) => {
				const nx = x + dx;
				const ny = y + dy;
				return nx >= 0 && ny >= 0 && nx < W && ny < H && outside[ny * W + nx];
			});
			if (onRim) {
				const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
				data[i + 3] = Math.max(0, Math.min(255, Math.round((255 - lum) * 1.6)));
			}
		}
	}

	return sharp(data, { raw: { width: W, height: H, channels: 4 } })
		.png()
		.toBuffer();
}

mkdirSync(OUT, { recursive: true });

const missing = Object.values(IMAGES).filter((i) => !existsSync(join(SRC, i.file)));
if (missing.length) {
	console.error(`Missing sources in images.source/:\n  ${missing.map((m) => m.file).join('\n  ')}`);
	process.exit(1);
}

let bytes = 0;
const manifest = {};

for (const [name, cfg] of shouldRun('photos') ? Object.entries(IMAGES) : []) {
	const input = join(SRC, cfg.file);
	const raw = await sharp(input).metadata();

	// Crop first, so every derivative and the recorded intrinsic size all agree.
	const height = raw.height - (cfg.cropBottom ?? 0);
	const base = () =>
		cfg.cropBottom
			? sharp(input).extract({ left: 0, top: 0, width: raw.width, height })
			: sharp(input);

	const widths = cfg.widths.filter((w) => w <= raw.width);
	manifest[name] = {
		width: raw.width,
		height,
		ratio: +(raw.width / height).toFixed(4),
		widths,
		fallback: Math.min(Math.max(...widths), raw.width)
	};

	for (const w of widths) {
		for (const [ext, opts] of [
			['avif', AVIF],
			['webp', WEBP]
		]) {
			const dest = join(OUT, `${name}-${w}.${ext}`);
			await base().resize({ width: w, withoutEnlargement: true })[ext](opts).toFile(dest);
			bytes += statSync(dest).size;
		}
	}

	const fb = manifest[name].fallback;
	const dest = join(OUT, `${name}-${fb}.jpg`);
	await base().resize({ width: fb, withoutEnlargement: true }).jpeg(JPEG).toFile(dest);
	bytes += statSync(dest).size;

	console.log(
		`  ${name.padEnd(14)} ${widths.join(', ')}${cfg.cropBottom ? `  (cropped ${cfg.cropBottom}px)` : ''}`
	);
}

// ---- Typed manifest so Picture.svelte can emit width/height and avoid CLS ----
const ts = `// AUTO-GENERATED by scripts/build-images.js — do not edit by hand.
// Regenerate with \`npm run images\`.

export interface ImageMeta {
	width: number;
	height: number;
	ratio: number;
	widths: number[];
	fallback: number;
}

export const images = ${JSON.stringify(manifest, null, '\t')} as const satisfies Record<string, ImageMeta>;

export type ImageName = keyof typeof images;
`;
// Only on a full pass: on `--only=sponsors` the manifest is empty and writing
// it would blank the file Picture.svelte reads its dimensions from.
if (shouldRun('photos')) writeFileSync(join(ROOT, 'src', 'lib', 'data', 'images.ts'), ts);

// ---- Sponsor logos ----
const SPONSOR_OUT = join(ROOT, 'static', 'sponsors');
mkdirSync(SPONSOR_OUT, { recursive: true });

for (const [name, cfg] of shouldRun('sponsors') ? Object.entries(SPONSORS) : []) {
	const input = join(SRC, cfg.file);
	if (!existsSync(input)) {
		console.error(`Missing sponsor logo: images.source/${cfg.file}`);
		process.exit(1);
	}
	const prepared = cfg.cutWhite ? await cutBackground(input) : readFileSync(input);
	const dest = join(SPONSOR_OUT, `${name}.png`);
	await sharp(prepared)
		.trim({ threshold: 1 })
		.resize({ height: cfg.height, withoutEnlargement: true })
		.png({ compressionLevel: 9, palette: true })
		.toFile(dest);
	bytes += statSync(dest).size;
	console.log(`  ${name.padEnd(14)} sponsor logo (${(statSync(dest).size / 1024).toFixed(1)} KB)`);

	if (!cfg.reverse) continue;

	// White knockout: keep the artwork's alpha exactly, replace every colour
	// with white. Shape and spacing are untouched — only value changes, which
	// is what a reverse lockup is.
	const src = sharp(prepared).ensureAlpha();
	const { width, height } = await src.metadata();
	const alpha = await src.extractChannel('alpha').raw().toBuffer();
	const knockout = await sharp({
		create: { width, height, channels: 3, background: '#ffffff' }
	})
		.joinChannel(alpha, { raw: { width, height, channels: 1 } })
		.png()
		.toBuffer();

	const reverseDest = join(SPONSOR_OUT, `${name}-reverse.png`);
	await sharp(knockout)
		.trim({ threshold: 1 })
		.resize({ height: cfg.height, withoutEnlargement: true })
		.png({ compressionLevel: 9, palette: true })
		.toFile(reverseDest);
	bytes += statSync(reverseDest).size;
	console.log(
		`  ${(name + '-reverse').padEnd(14)} sponsor logo (${(statSync(reverseDest).size / 1024).toFixed(1)} KB)`
	);
}

// ---- Icons (full pass only; `npm run og` covers the share card on its own) ----
if (shouldRun('icons')) {
	const favicon = readFileSync(join(ROOT, 'static', 'favicon.svg'));

	// Maskable/apple icons are composited onto an opaque field: iOS ignores
	// transparency and would otherwise render the mark on black.
	await sharp({
		create: { width: 180, height: 180, channels: 4, background: '#0a0a10' }
	})
		.composite([
			{ input: await sharp(favicon).resize(140, 140).png().toBuffer(), gravity: 'center' }
		])
		.png()
		.toFile(join(ROOT, 'static', 'apple-touch-icon.png'));

	for (const size of [192, 512]) {
		await sharp({ create: { width: size, height: size, channels: 4, background: '#0a0a10' } })
			.composite([
				{
					input: await sharp(favicon)
						.resize(Math.round(size * 0.78), Math.round(size * 0.78))
						.png()
						.toBuffer(),
					gravity: 'center'
				}
			])
			.png()
			.toFile(join(ROOT, 'static', `icon-${size}.png`));
	}

	// The previous favicon.ico was 121 KB because it embedded 256px and 128px
	// frames — for a 16px tab slot. 32+16 is all anything actually reads.
	const icoFrames = await Promise.all(
		[32, 16].map(async (s) =>
			sharp({ create: { width: s, height: s, channels: 4, background: '#0a0a10' } })
				.composite([
					{
						input: await sharp(favicon)
							.resize(Math.round(s * 0.82), Math.round(s * 0.82))
							.png()
							.toBuffer(),
						gravity: 'center'
					}
				])
				.png()
				.toBuffer()
		)
	);
	writeFileSync(join(ROOT, 'static', 'favicon.ico'), await pngToIco(icoFrames));

	// ---- OG share card ----
	// The old site had no og:image at all, so every link shared into KakaoTalk or
	// Discord — i.e. every recruiting link — previewed as a bare grey URL.
	// Gradients use userSpaceOnUse: librsvg's handling of objectBoundingBox units
	// on <circle> is unreliable and produced a speckled artifact instead of a glow.
	const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="wordmark" gradientUnits="userSpaceOnUse" x1="80" y1="130" x2="470" y2="250">
      <stop offset="0" stop-color="#e0246f"/>
      <stop offset="0.45" stop-color="#a445f2"/>
      <stop offset="1" stop-color="#0ca4dd"/>
    </linearGradient>
    <radialGradient id="glow1" gradientUnits="userSpaceOnUse" cx="1010" cy="140" r="440">
      <stop offset="0" stop-color="#a445f2" stop-opacity=".40"/>
      <stop offset="0.6" stop-color="#a445f2" stop-opacity=".10"/>
      <stop offset="1" stop-color="#a445f2" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" gradientUnits="userSpaceOnUse" cx="200" cy="580" r="420">
      <stop offset="0" stop-color="#0ca4dd" stop-opacity=".30"/>
      <stop offset="0.6" stop-color="#0ca4dd" stop-opacity=".08"/>
      <stop offset="1" stop-color="#0ca4dd" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0a10"/>
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <text x="80" y="250" font-family="Pretendard, 'Malgun Gothic', sans-serif" font-size="128" font-weight="800" fill="url(#wordmark)" letter-spacing="-4">Vlab</text>
  <text x="80" y="332" font-family="Pretendard, 'Malgun Gothic', sans-serif" font-size="42" font-weight="600" fill="#f2f2f7">카포전을 이기는 동아리</text>
  <text x="80" y="394" font-family="Pretendard, 'Malgun Gothic', sans-serif" font-size="28" font-weight="400" fill="#a2a2b8">KAIST 인공지능 · 과학퀴즈 학술동아리</text>
  <rect x="80" y="466" width="420" height="1" fill="#2e2e40"/>
  <text x="80" y="534" font-family="Pretendard, 'Malgun Gothic', sans-serif" font-size="36" font-weight="700" fill="#f2f2f7">3 : 0</text>
  <text x="80" y="570" font-family="Pretendard, 'Malgun Gothic', sans-serif" font-size="19" fill="#6b6b80">2025 AI 종목</text>
  <text x="300" y="534" font-family="Pretendard, 'Malgun Gothic', sans-serif" font-size="36" font-weight="700" fill="#f2f2f7">29</text>
  <text x="300" y="570" font-family="Pretendard, 'Malgun Gothic', sans-serif" font-size="19" fill="#6b6b80">활동 인원</text>
  <text x="1120" y="570" text-anchor="end" font-family="Pretendard, 'Malgun Gothic', sans-serif" font-size="20" fill="#6b6b80">vlab-kaist.github.io</text>
</svg>`;
	await sharp(Buffer.from(og))
		.png({ quality: 90 })
		.toFile(join(ROOT, 'static', 'og.png'));
	bytes += statSync(join(ROOT, 'static', 'og.png')).size;
}

console.log(
	`\nDerivatives: ${(bytes / 1048576).toFixed(2)} MB total across all sizes and formats.`
);
