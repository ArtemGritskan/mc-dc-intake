/* PDF is generated locally. Embedded font supports Cyrillic on every computer. */
window.MCDCI_PDF=async function(groups,lang='ru'){
 const wording=window.MCDCI_I18N.ru;
 const {PDFDocument,rgb}=window.PDFLib;
 const doc=await PDFDocument.create();doc.registerFontkit(window.fontkit);
 const bytes=Uint8Array.from(atob(window.MCDCI_FONT),c=>c.charCodeAt(0));
 const font=await doc.embedFont(bytes,{subset:true});
 doc.setTitle(wording.title);doc.setAuthor(wording.brand);doc.setCreator(wording.brand);doc.setProducer(wording.brand);doc.setLanguage('ru-RU');
 const black=rgb(.07,.07,.07),gray=rgb(.35,.4,.46),blue=rgb(0,.39,.82);
 const width=595.28,height=841.89,margin=48,lineWidth=width-2*margin;
 let page,y;
 function addPage(){page=doc.addPage([width,height]);y=height-margin;}
 function clean(text){return String(text).normalize('NFC').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'').replace(/\t/g,'    ');}
 function wrap(text,size,maxWidth=lineWidth){
  const lines=[];
  for(const paragraph of clean(text).split(/\r?\n/)){
   let line='';
   for(const word of paragraph.split(/\s+/)){
    if(font.widthOfTextAtSize((line?line+' ':'')+word,size)<=maxWidth){line+=(line?' ':'')+word;continue;}
    if(line){lines.push(line);line='';}
    for(const char of word){if(font.widthOfTextAtSize(line+char,size)>maxWidth){lines.push(line);line='';}line+=char;}
   }
   lines.push(line);
  }
  return lines;
 }
 function ensure(space){if(y-space<55)addPage();}
 function textLines(lines,size,color){for(const line of lines){ensure(size*1.5);page.drawText(line,{x:margin,y,font,size,color});y-=size*1.5;}}
 addPage();y=height-margin-16;textLines(wrap(wording.title,16),16,black);y-=8;
 textLines([wording.pdfStage],10,gray);y-=15;
 for(const group of groups){ensure(85);textLines(wrap(group.title,13),13,blue);y-=8;
  for(const [question,answer] of group.rows){const questionLines=wrap(question,10);ensure(questionLines.length*15+32);textLines(questionLines,10,gray);textLines(wrap(answer,11),11,black);y-=13;}
  y-=8;
 }
 const pages=doc.getPages();pages.forEach((p,i)=>{p.drawText(`${i+1} / ${pages.length}`,{x:width-margin-35,y:28,font,size:9,color:gray});});
 return doc.save();
};
