
'use client';
import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
export default function ToolBrowser({initial=[]}){const [tools,setTools]=useState(initial);const [q,setQ]=useState('');const [cat,setCat]=useState('All');const [err,setErr]=useState('');
useEffect(()=>{fetch('/api/v1/tools').then(r=>r.ok?r.json():null).then(d=>{if(d?.tools)setTools(d.tools)}).catch(()=>setErr('Backend is not connected yet. Showing bundled tool catalogue.'))},[]);
const cats=['All',...new Set(tools.map(t=>t.category))];const list=useMemo(()=>tools.filter(t=>(cat==='All'||t.category===cat)&&(`${t.name} ${t.description} ${t.category}`).toLowerCase().includes(q.toLowerCase())),[tools,q,cat]);
return <><div className="search"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search 29+ online tools..."/><button onClick={()=>setQ('')}>Clear</button></div><div className="row" style={{margin:'18px 0 22px'}}>{cats.map(c=><button key={c} className={'btn '+(cat===c?'':'ghost')} onClick={()=>setCat(c)}>{c}</button>)}</div>{err&&<p className="muted">{err}</p>}<div className="grid">{list.map(t=><Link className="tool" href={'/tool/'+t.slug} key={t.slug}><span className="tag">{t.category}</span><h3>{t.name}</h3><p>{t.description}</p><div className="toolfoot"><span>Open tool</span><span>→</span></div></Link>)}</div></>}
