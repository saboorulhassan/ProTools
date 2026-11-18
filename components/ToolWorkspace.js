
'use client';
import {useMemo,useState} from 'react';
export default function ToolWorkspace({tool}){const [text,setText]=useState('');const [result,setResult]=useState('');const [file,setFile]=useState(null);
const run=()=>{let out='';switch(tool.slug){
case 'word-counter':case 'character-counter':out=`Words: ${(text.trim().match(/\S+/g)||[]).length}\nCharacters: ${text.length}\nCharacters (no spaces): ${text.replace(/\s/g,'').length}\nLines: ${text?text.split(/\r\n|\r|\n/).length:0}`;break;
case 'case-converter':out=`UPPERCASE\n${text.toUpperCase()}\n\nlowercase\n${text.toLowerCase()}\n\nTitle Case\n${text.toLowerCase().replace(/\b\w/g,m=>m.toUpperCase())}`;break;
case 'remove-duplicate-lines':out=[...new Set(text.split(/\r\n|\r|\n/))].join('\n');break;
case 'text-to-slug':out=text.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');break;
case 'json-formatter':try{out=JSON.stringify(JSON.parse(text),null,2)}catch(e){out='Invalid JSON: '+e.message}break;
case 'base64':try{out=btoa(unescape(encodeURIComponent(text)))}catch(e){out='Unable to encode'}break;
case 'url-encoder':out=encodeURIComponent(text);break;
case 'meta-tag-generator':out=`<title>${text.slice(0,60)}</title>\n<meta name="description" content="${text.slice(0,160)}">`;break;
case 'robots-generator':out='User-agent: *\nAllow: /\nSitemap: https://yourdomain.com/sitemap.xml';break;
case 'sitemap-generator':out=text.split(/\r\n|\r|\n/).filter(Boolean).map(u=>`<url><loc>${u.trim()}</loc></url>`).join('\n');break;
case 'keyword-density':{const words=text.toLowerCase().match(/\b[\p{L}\p{N}]+\b/gu)||[];const counts={};words.forEach(w=>counts[w]=(counts[w]||0)+1);out=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,30).map(([w,n])=>`${w}: ${n} (${(n/Math.max(words.length,1)*100).toFixed(2)}%)`).join('\n');break}
case 'percentage-calculator':{const [a,b]=text.split(',').map(Number);out=Number.isFinite(a)&&Number.isFinite(b)?`${a}% of ${b} = ${(a/100*b).toFixed(4)}`:'Enter values as percentage,number e.g. 15,200';break}
default:out='This tool needs its dedicated processing module. It is listed in the catalogue but is not active in this frontend build yet.';}
setResult(out)};
const copy=()=>navigator.clipboard?.writeText(result);
return <div className="toolwork panel"><p className="muted">{tool.description}</p>{tool.category==='Image'||tool.category==='PDF'?<div className="field"><label>Select a file (local preview only)</label><input type="file" onChange={e=>setFile(e.target.files?.[0]||null)}/><p className="muted">{file?file.name:'PDF/image processing adapter must be connected to backend before processing.'}</p></div>:<div className="field"><label>Input</label><textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Enter or paste your content here..."/></div>}<button className="btn" onClick={run}>Process</button>{result&&<div style={{marginTop:20}}><div className="row" style={{justifyContent:'space-between'}}><b>Result</b><button className="btn ghost" onClick={copy}>Copy result</button></div><pre className="result">{result}</pre></div>}</div>}
