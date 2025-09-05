import { session } from '../store/session';

const BASE = import.meta.env.VITE_API_BASE_URL as string;

async function req<T>(path:string, init: RequestInit = {}): Promise<T> {
const h = new Headers(init.headers);
h.set('Content-Type','application/json');
if(session.token) h.set('Authorization', `Bearer ${session.token}`);
const res = await fetch(`${BASE}${path}`, { ...init, headers: h });
if(!res.ok) throw new Error(`${res.status} ${await res.text()}`);
return res.headers.get('content-type')?.includes('application/json') ? res.json() : (undefined as T);
}

export const api = {
get: <T>(p:string)=>req<T>(p),
post:<T>(p:string, body?:any)=>req<T>(p,{method:'POST', body: JSON.stringify(body??{})}),
put: <T>(p:string, body?:any)=>req<T>(p,{method:'PUT', body: JSON.stringify(body??{})}),
del: <T>(p:string)=>req<T>(p,{method:'DELETE'})
};
