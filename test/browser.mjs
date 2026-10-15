import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const url=process.env.TEST_URL||'http://127.0.0.1:3000';
const out='qa';await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1900,height:990},deviceScaleFactor:1,reducedMotion:'reduce'});
const errors=[],badResponses=[];
page.on('pageerror',error=>errors.push(String(error)));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('response',r=>{if(r.status()>=400&&r.url().startsWith(url))badResponses.push(`${r.status()} ${r.url()}`);});
const results=[];
try {
 assert.equal((await page.goto(url,{waitUntil:'networkidle'})).status(),200);await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('h1').count(),1);
 assert.equal(await page.locator('[role="tab"]').count(),7);
 for(let i=0;i<7;i++){await page.locator('[role="tab"]').nth(i).click();assert.equal(await page.locator('[role="tab"][aria-selected="true"]').count(),1);assert.equal(await page.locator('[role="tabpanel"]:visible').count(),1);const controls=await page.locator('[role="tab"]').nth(i).getAttribute('aria-controls');assert.equal(await page.locator(`#${controls}`).isVisible(),true);}
 const last=page.locator('[role="tab"]').nth(6);await last.press('Home');assert.equal(await page.locator('[role="tab"]').nth(0).getAttribute('aria-selected'),'true');await page.locator('[role="tab"]').nth(0).press('ArrowLeft');assert.equal(await last.getAttribute('aria-selected'),'true');
 results.push('7 tabs: click, Home, ArrowLeft, wraparound, panel visibility, selection and focus');
 const notice=page.locator('[data-notice-title]').first();await notice.click();assert.equal(await page.locator('dialog').isVisible(),true);await page.locator('.dialog-close').press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);assert.equal(await notice.evaluate(el=>document.activeElement===el),true);results.push('Honest pending-link dialog: open, Esc, focus restoration');
 for(const selector of ['#projeto','#metodo','#conquistas','#albuns','#pessoas','#impacto']){await page.locator(`#navigation a[href="${selector}"]`).click();const y=await page.locator(selector).evaluate(el=>el.getBoundingClientRect().top);assert.ok(y>=49&&y<=100,`${selector} visible below header: ${y}`);}results.push('6 navigation anchors clear fixed header');
 await page.locator('.album-jump[data-album="2026-londres"]').click();assert.equal(await page.locator('#tab-2026-londres').getAttribute('aria-selected'),'true');await last.click();
 const captures=[
 ['01-hero','#inicio',0],['02-projeto','#projeto',-183],['03-metodo','#metodo',-32],
 ['04-numeros','.numbers',-103],['05-trajetoria','#ano-2022',-67],['06-albuns','#albuns',-99],
 ['07-presente','#presente',-55],['08-professores','#pessoas',-135],['09-alunos','.students-heading',-66],
 ['10-impacto','#impacto',135],['11-relatos','.horizontal-testimony',-473],['12-noticias','#reconhecimento',-9],
 ['13-noticias-cta','.closing',-602],['14-cta-rodape','.closing',-249],
 ];
 const positions={};
 for(const [name,selector,offset] of captures){const y=await page.locator(selector).evaluate(el=>el.getBoundingClientRect().top+scrollY);positions[name]={selector,y,scroll:Math.max(0,y+offset)};await page.evaluate(y=>scrollTo(0,y),Math.max(0,y+offset));await page.screenshot({path:`${out}/${name}.png`,animations:'disabled'});}
 await writeFile(`${out}/capture-positions.json`,JSON.stringify(positions,null,2));
 for(const width of [320,390,600,768,1024,1440,1900]){
  await page.setViewportSize({width,height:width>800?990:844});
  await page.goto(url,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const bodyWidth=await page.evaluate(()=>document.documentElement.scrollWidth);assert.ok(bodyWidth<=width,`no body overflow at ${width}: ${bodyWidth}`);
  const headingOverflow=await page.locator('h1,h2,h3').evaluateAll(els=>els.filter(el=>el.getBoundingClientRect().right>innerWidth+1||el.getBoundingClientRect().left<0).map(el=>el.textContent));assert.deepEqual(headingOverflow,[],`headings contained at ${width}`);
  if(width<=800){const toggle=page.locator('.menu-toggle');await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');await page.locator('#navigation a[href="#albuns"]').click();assert.equal(await toggle.getAttribute('aria-expanded'),'false');await toggle.click();await toggle.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');await page.evaluate(()=>scrollTo(0,0));}
  await page.screenshot({path:`${out}/responsive-${width}.png`,fullPage:true,animations:'disabled'});
  results.push(`Responsive ${width}px: no horizontal overflow; headings inside viewport${width<=800?'; mobile menu links and Esc work':''}`);
 }
 assert.deepEqual(errors,[],'no browser console / JS errors');assert.deepEqual(badResponses,[],'all local assets return successful HTTP responses');
 results.push('No browser console errors or missing assets; all fonts local');
 await writeFile(`${out}/results.json`,JSON.stringify({passed:true,url,results,errors,badResponses},null,2));
 console.log(JSON.stringify({passed:true,results},null,2));
} catch(error){await page.screenshot({path:`${out}/failure.png`,fullPage:true});await writeFile(`${out}/results.json`,JSON.stringify({passed:false,error:String(error),results,errors,badResponses},null,2));throw error;} finally{await browser.close();}
