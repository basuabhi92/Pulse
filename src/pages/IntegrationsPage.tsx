import { useEffect, useState } from 'react';
import AppCard from '../components/AppCard';
import type { AppId, IntegrationStatus } from '../api/integrations';
import { listIntegrations, getStatus, beginAuthorize } from '../api/integrations';

const PUBLIC_URL = import.meta.env.VITE_APP_PUBLIC_URL as string;

export default function IntegrationsPage(){
const [items,setItems]=useState<IntegrationStatus[]>([]);
const [msg,setMsg]=useState<string>('');

useEffect(()=>{ (async()=> setItems(await listIntegrations()))(); },[]);

async function onClick(app:AppId){
const s=await getStatus(app);
if(s.connected){ setMsg(`${app} is already connected.`); setTimeout(()=>setMsg(''),2000); return; }
const redirect = `${PUBLIC_URL}/oauth/callback?app=${app}`;
const { authUrl } = await beginAuthorize(app, redirect);
if(!authUrl) { setMsg('Authorization not available'); return; }
window.location.href = authUrl; // hand off to provider
}

return (
<div className="grid cols-2">
{items.map(it=> <AppCard key={it.app} status={it} onClick={onClick}/>) }
{msg && <div className="card">{msg}</div>}
</div>
);
}
