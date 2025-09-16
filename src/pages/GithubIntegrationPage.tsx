import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { session } from '../store/session';

export default function GithubIntegrationPage(){
  const nav = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [opts, setOpts] = useState(''); // optional JSON
  const [err,setErr] = useState<string>();
  const [loading,setLoading] = useState(false);
  const [popup, setPopup] = useState<{ ok: boolean; message: string }|null>(null);

  // Only read from query (?appId=...), no backend calls here
  const appId = useMemo(()=>{
    const raw = new URLSearchParams(window.location.search).get('appId');
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
  }, []);

  async function submit(e?: React.FormEvent){
    e?.preventDefault();
    setErr(undefined); setLoading(true); setPopup(null);
    try{
      if(!accessToken) throw new Error('Access token is required');
      if(!appId) throw new Error('Missing app id');
      const uid = session.userId;
      if(!uid) throw new Error('Missing user id');
      const body:any = { user_id: uid, app_id: appId, access_token: accessToken };
      if(opts.trim()){
        try{ body.opts = JSON.parse(opts); } catch{ body.opts = opts; }
      }
      await api.post('/app/integration', body);
      setPopup({ ok: true, message: 'GitHub connected successfully!' });
      setTimeout(()=> nav('/'), 1200);
    }catch(e:any){
      const msg = e?.message ?? 'Integration failed';
      setErr(msg);
      setPopup({ ok: false, message: msg });
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 560 }}>
      <div className="card" style={{ display:'grid', gap:12, position:'relative' }}>
        <div>
          <h2 style={{ margin: 0 }}>GitHub Integration</h2>
          <div className="muted">Provide a GitHub access token to connect.</div>
        </div>
        {!appId && <div className="muted" style={{color:'#b91c1c'}}>Missing app id. Open the GitHub card from the Apps tab.</div>}
        <form className="grid" style={{ gap: 10 }} onSubmit={submit}>
          <label className="grid" style={{ gap: 6 }}>
            <span>Access Token</span>
            <input type="password" placeholder="ghp_..." value={accessToken} onChange={(e)=>setAccessToken(e.target.value)} required />
          </label>
          <label className="grid" style={{ gap: 6 }}>
            <span>Options (optional, JSON or text)</span>
            <textarea rows={4} placeholder='{"repos":["owner/name"]}' value={opts} onChange={(e)=>setOpts(e.target.value)} />
          </label>
          {err && <div style={{ color: '#b91c1c' }}>{err}</div>}
          <button className="btn" type="submit" disabled={loading || !accessToken || !appId}>{loading ? 'Connecting…' : 'Connect GitHub'}</button>
        </form>

        {popup && (
          <div style={{position:'fixed', inset:0, display:'grid', placeItems:'center', background:'rgba(0,0,0,.35)'}} onClick={()=>setPopup(null)}>
            <div className="card" style={{ maxWidth: 360, padding: 18, border:'1px solid #e5e7eb', background:'#fff' }} onClick={(e)=>e.stopPropagation()}>
              <div style={{ fontWeight:600, color: popup.ok ? '#16a34a' : '#b91c1c' }}>{popup.ok ? 'Success' : 'Error'}</div>
              <div style={{ marginTop:8 }}>{popup.message}</div>
              <div className="row" style={{ justifyContent:'flex-end', marginTop:14 }}>
                <button className="tab" onClick={()=> popup.ok ? nav('/') : setPopup(null)}>{popup.ok ? 'Go to Notifications' : 'Close'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
