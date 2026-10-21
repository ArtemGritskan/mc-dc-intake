/* Mining Cluster — client-side questionnaire and PDF export. */
(() => {
 'use strict';
 const schema=window.MCDCI_CONFIG?.schema;if(!schema)return;
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 document.querySelectorAll('[data-mcdi]').forEach((root,instance)=>{
  let step=0,busy=false,lang='ru';
  const t=key=>window.MCDCI_I18N[lang][key];
  const title=s=>lang==='en'?s.titleEn:s.title;
  const label=f=>lang==='en'?f.labelEn:f.label;
  const sections=[...schema,{id:'review',title:'Проверка ответов'}];
  function field(f){
   const id=`mcdi-${instance}-${f.id}`;
   const attrs=`id="${id}" name="${f.id}" ${f.maxLength?`maxlength="${f.maxLength}"`:''}`;
   const control=f.options?`<select ${attrs}><option value="">—</option>${f.options.map(o=>`<option value="${esc(o)}">${esc(o)}</option>`).join('')}</select>`:f.type==='textarea'?`<textarea ${attrs}></textarea>`:`<input ${attrs} type="${f.type==='number'?'text':f.type}" ${f.type==='number'?`inputmode="${f.decimalDigits?'decimal':'numeric'}"`:''}>`;
   return `<div class="mcdi-field ${f.type==='textarea'?'mcdi-wide':''}"><label for="${id}">${esc(f.label)}</label>${control}${f.unknown!==false?`<label class="mcdi-check"><input type="checkbox" data-unknown="${f.id}"><span data-unknown-label>Пока неизвестно</span></label>`:''}</div>`;
  }
  root.innerHTML=`<header class="mcdi-heading"><div><div class="mcdi-eyebrow">MINING CLUSTER</div><h1>Запрос на проектирование<br>и строительство ЦОД</h1></div><span class="mcdi-badge">Анкета проекта</span></header><form novalidate><div class="mcdi-layout"><nav class="mcdi-nav" aria-label="Разделы формы"></nav><main class="mcdi-main"><div class="mcdi-step-counter" aria-live="polite"></div><div class="mcdi-progress" aria-hidden="true"><i></i></div>${schema.map(s=>`<section data-section="${s.id}" hidden><h2 tabindex="-1">${esc(s.title)}</h2><div class="mcdi-grid">${s.fields.map(field).join('')}</div></section>`).join('')}<section data-section="review" hidden><h2 tabindex="-1">Проверьте ответы</h2><div class="mcdi-review"></div></section><p class="mcdi-error" role="alert" hidden></p><footer class="mcdi-footer"><button type="button" class="mcdi-secondary" data-back>Назад</button><button type="button" class="mcdi-primary" data-next>Продолжить →</button></footer><p class="mcdi-notice">Ответы не сохраняются при перезагрузке страницы.</p></main></div></form>`;
  const form=root.querySelector('form');
  const controls=document.createElement('div');controls.className='mcdi-language';controls.setAttribute('role','group');controls.innerHTML='<button type="button" data-lang="ru" lang="ru" aria-label="Русский">RU</button><button type="button" data-lang="en" lang="en" aria-label="English">EN</button>';root.querySelector('.mcdi-heading').append(controls);
  const value=f=>{
   if(root.querySelector(`[data-unknown="${f.id}"]`)?.checked)return t('unknown');
   const raw=form.elements.namedItem(f.id).value.trim();
   if(lang==='en'&&raw&&f.options)return f.optionsEn[f.options.indexOf(raw)];
   return lang==='en'&&f.type==='number'?raw.replace(',','.'):raw;
  };
  const answers=(forPdf=false)=>schema.map(s=>({title:forPdf?s.title:title(s),id:s.id,rows:s.fields.map(f=>[forPdf?f.label:label(f),value(f)||t('empty')])}));
  function render(focus=false){
   root.lang=lang;controls.setAttribute('aria-label',t('language'));
   controls.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
   root.querySelector('h1').textContent=t('title');root.querySelector('.mcdi-badge').textContent=t('badge');
   root.querySelector('.mcdi-notice').textContent=t('notice');root.querySelector('[data-back]').textContent=t('back');
   root.querySelector('.mcdi-nav').setAttribute('aria-label',t('sections'));
   root.querySelector('[data-section="review"] h2').textContent=t('reviewTitle');
   root.querySelectorAll('[data-unknown-label]').forEach(e=>e.textContent=t('unknown'));
   schema.forEach(s=>{root.querySelector(`[data-section="${s.id}"] h2`).textContent=title(s);s.fields.forEach(f=>{const input=form.elements.namedItem(f.id);root.querySelector(`label[for="${input.id}"]`).textContent=label(f);if(f.options)Array.from(input.options).slice(1).forEach((o,i)=>o.textContent=lang==='en'?f.optionsEn[i]:f.options[i]);});});
   if(document.documentElement.hasAttribute('data-mcdi-preview')){document.documentElement.lang=lang;document.title=t('title')+' — Mining Cluster';}
   root.querySelector('.mcdi-nav').innerHTML=sections.map((s,i)=>`<button type="button" class="mcdi-step" data-step="${i}" ${i===step?'aria-current="step"':''}><span>${i+1}</span>${esc(s.id==='review'?t('review'):title(s))}</button>`).join('');
   root.querySelectorAll('[data-section]').forEach(s=>s.hidden=s.dataset.section!==sections[step].id);
   root.querySelector('[data-back]').disabled=step===0;
   root.querySelector('[data-next]').textContent=step===sections.length-1?t('download'):t('next');
   root.querySelector('.mcdi-step-counter').textContent=t('step').replace('{current}',step+1).replace('{total}',sections.length);
   root.querySelector('.mcdi-progress i').style.width=`${(step+1)/sections.length*100}%`;
   if(step===sections.length-1)root.querySelector('.mcdi-review').innerHTML=answers().map((s,i)=>`<div class="mcdi-summary-title"><h3>${esc(s.title)}</h3><button type="button" class="mcdi-link" data-step="${i}">${t('edit')}</button></div><dl>${s.rows.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`).join('');
   if(focus)root.querySelector(`[data-section="${sections[step].id}"] h2`).focus();
  }
  function validateField(f){
   const input=form.elements.namedItem(f.id);input.setCustomValidity('');if(input.disabled)return true;
   const raw=input.value,v=raw.trim();
   if(f.maxLength&&raw.length>f.maxLength)input.setCustomValidity(t('limit').replace('{max}',f.maxLength));
   else if(f.type==='number'&&v){const pattern=f.decimalDigits?/^\d{1,9}(?:[.,]\d{1,3})?$/:/^\d{1,9}$/;if(!pattern.test(v))input.setCustomValidity(t(f.decimalDigits?'decimal':'integer'));}
   else if(f.options&&v&&!f.options.includes(v))input.setCustomValidity(t('option'));
   else if(f.type==='email'&&input.validity.typeMismatch)input.setCustomValidity(t('email'));
   return input.checkValidity();
  }
  function valid(index){for(const f of schema[index]?.fields||[]){if(!validateField(f)){step=index;render();form.elements.namedItem(f.id).reportValidity();return false;}}return true;}
  function go(index){if(busy)return;if(index>step&&!valid(step))return;if(index===sections.length-1){for(let i=0;i<schema.length;i++)if(!valid(i))return;}step=index;root.querySelector('.mcdi-error').hidden=true;render(true);}
  async function download(){
   if(busy)return;for(let i=0;i<schema.length;i++)if(!valid(i))return;
   busy=true;const button=root.querySelector('[data-next]');button.disabled=true;button.textContent=t('preparing');controls.querySelectorAll('button').forEach(b=>b.disabled=true);
   try{const bytes=await window.MCDCI_PDF(answers(true),lang);const url=URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));const a=document.createElement('a');a.href=url;a.download=t('filename');document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
   catch(e){const err=root.querySelector('.mcdi-error');err.textContent=t('pdfError');err.hidden=false;}
   finally{busy=false;button.disabled=false;button.textContent=t('download');controls.querySelectorAll('button').forEach(b=>b.disabled=false);}
  }
  root.addEventListener('change',e=>{if(e.target.dataset.unknown)form.elements.namedItem(e.target.dataset.unknown).disabled=e.target.checked;});
  root.addEventListener('input',e=>{const f=schema.flatMap(s=>s.fields).find(f=>f.id===e.target.name);if(!f)return;e.target.setCustomValidity('');});
  root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||busy)return;if(b.dataset.lang){lang=b.dataset.lang;form.querySelectorAll('input,select,textarea').forEach(e=>e.setCustomValidity(''));root.querySelector('.mcdi-error').hidden=true;render();}if(b.dataset.step!==undefined)go(Number(b.dataset.step));if(b.hasAttribute('data-back'))go(step-1);if(b.hasAttribute('data-next')){if(step===sections.length-1)download();else go(step+1);}});
  form.addEventListener('submit',e=>{e.preventDefault();if(step===sections.length-1)download();});render();
 });
})();
