import { useEffect, useState } from 'react';
import { listNotifications, type NotificationItem } from '../api/notifications';
import { AppBadge } from '../components/AppBadge';

export default function NotificationsPage(){
const [items,setItems]=useState<NotificationItem[]>([]);
const [err,setErr]=useState<string>();
useEffect(()=>{ (async()=>{ try{ setItems(await listNotifications()); }catch(e:any){ setErr(e.message);} })(); },[]);
return (
<div className="grid" style={{gap:12}}>
{err && <div className="card" style={{color:'#b91c1c'}}>{err}</div>}
{items.map(n=> (
<div key={n.id} className="card">
<div className="row" style={{justifyContent:'space-between'}}>
<div className="row" style={{gap:8}}>
<AppBadge app={n.app as any}/>
<div style={{fontWeight:600}}>{n.title}</div>
</div>
<div className="muted">{new Date(n.ts).toLocaleString()}</div>
</div>
{n.preview && <div className="muted" style={{marginTop:6}}>{n.preview}</div>}
{n.labels?.length ? <div style={{marginTop:8}} className="row">{n.labels.map(l=> <span key={l} className="pill" style={{background:'#111827'}}>{l}</span>)}</div> : null}
</div>
))}
</div>
);
}
