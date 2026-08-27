import { chromium, devices } from 'playwright';
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const b = await chromium.launch({ executablePath:'/home/kmkim/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome' });
for (const scheme of ['light','dark']) {
  const ctx = await b.newContext({viewport:{width:1440,height:900}, colorScheme:scheme});
  const p = await ctx.newPage(); let total=0;
  for (const r of ['/','/teams/','/projects/','/life/','/history/','/join/','/en/','/en/join/','/404.html']) {
    await p.goto('http://localhost:4173'+r, {waitUntil:'networkidle'});
    await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(800);
    await p.addScriptTag({content:axeSrc});
    const res = await p.evaluate(async()=>await window.axe.run(document,{resultTypes:['violations']}));
    total += res.violations.length;
    res.violations.forEach(v=>v.nodes.forEach(n=>console.log(`  ${scheme} ${r} [${v.id}] ${n.target.join(' ')}`)));
  }
  console.log(`## axe ${scheme}: ${total} / 9 pages`);
  await ctx.close();
}
const p = await (await b.newContext({viewport:{width:1440,height:900}, colorScheme:'light'})).newPage();
await p.goto('http://localhost:4173/', {waitUntil:'networkidle'});
await p.waitForTimeout(700);
console.log('badge:', await p.$eval('.hero-badge', e=>`"${e.textContent.trim()}" -> ${e.href} target=${e.target}`));
console.log('title:', await p.title());
console.log('touch-action on badge:', await p.$eval('.hero-badge', e=>getComputedStyle(e).touchAction));
await p.screenshot({path:'/tmp/vlab-shots/v14_hero.png', clip:{x:0,y:0,width:1440,height:620}});
// mobile sheet: safe area + overscroll
const m = await (await b.newContext({...devices['iPhone 13']})).newPage();
await m.goto('http://localhost:4173/', {waitUntil:'networkidle'});
await m.click('.burger'); await m.waitForTimeout(400);
console.log('sheet overscroll:', await m.$eval('#mobile-nav', e=>getComputedStyle(e).overscrollBehavior));
await m.screenshot({path:'/tmp/vlab-shots/v14_sheet.png'});
await b.close();
