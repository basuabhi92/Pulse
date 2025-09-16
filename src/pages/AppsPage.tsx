import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

type AppRecord = { id: number; name: string; logoUrl?: string; description?: string };
type AppMap = Record<string, AppRecord>;

function normalizeApps(data: Record<string, any>): AppMap {
  const out: AppMap = {};
  if (!data || typeof data !== 'object') return out;
  for (const [key, raw] of Object.entries(data)) {
    if (raw && typeof raw === 'object' && typeof (raw as any).id === 'number') {
      out[key] = raw as AppRecord;
      continue;
    }
    if (typeof raw === 'string') {
      // Parse Java toString format: AppDto[id=1, name=GitHub, logoUrl=..., metadata={...}]
      const idMatch = /\bid=(\d+)/.exec(raw);
      const nameMatch = /\bname=([^,\]]+)/.exec(raw);
      const logoMatch = /\blogoUrl=([^,\]]+)/.exec(raw);
      const id = idMatch ? Number(idMatch[1]) : undefined;
      const name = nameMatch ? nameMatch[1].trim() : key;
      const logoUrl = logoMatch ? logoMatch[1].trim() : undefined;
      if (Number.isFinite(id as number)) {
        out[key] = { id: id as number, name, logoUrl };
      }
    }
  }
  return out;
}

export default function AppsPage(){
  const [apps,setApps] = useState<AppMap>({});
  const [err,setErr] = useState<string>();
  const fetchedRef = useRef(false);
  const nav = useNavigate();

  useEffect(()=> {
    if (fetchedRef.current) return; // prevent duplicate fetch in dev
    fetchedRef.current = true;
    (async()=>{
      try{
        const res = await api.get<Record<string, any>>('/app/list');
        setApps(normalizeApps(res));
      }catch(e:any){ setErr(e?.message ?? 'Failed to load apps'); }
    })();
  },[]);

  function open(appKey: string){
    const rec = apps[appKey];
    if (!rec || typeof rec.id !== 'number') { setErr('Missing app id for ' + appKey); return; }
    const id = rec.id;
    if (appKey.toLowerCase()==='github') nav(`/integrations/github?appId=${id}`);
    else nav(`/integrations/${appKey}?appId=${id}`);
  }

  const entries = Object.entries(apps);

  return (
    <div className="grid" style={{ gap: 12 }}>
      <h2 style={{ margin: 0 }}>Apps</h2>
      <p className="muted" style={{ marginTop: -6 }}>Connect an app to start receiving notifications.</p>
      {err && <div className="card" style={{ color:'#b91c1c' }}>{err}</div>}
      <div className="grid cols-3">
        {entries.map(([key, rec]) => (
          <button key={key} className="card row" style={{ gap: 12, textAlign:'left' }} onClick={()=>open(key)}>
            {rec.logoUrl ? <img src={rec.logoUrl} alt={rec.name||key} style={{ width: 36, height: 36, borderRadius: 8 }} /> : <div className="pill">{(rec.name||key).slice(0,2).toUpperCase()}</div>}
            <div>
              <div style={{ fontWeight: 600 }}>{rec.name || key}</div>
              {rec.description && <div className="muted">{rec.description}</div>}
            </div>
          </button>
        ))}
        {entries.length===0 && !err && <div className="muted">No apps available yet.</div>}
      </div>
    </div>
  );
}
