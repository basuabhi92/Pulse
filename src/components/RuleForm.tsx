import { useState } from 'react';
import type { Rule } from '../api/rules';

const APPS = [ 'instagram','snapchat','gmail','x' ] as const;

type Props = { initial?: Partial<Rule>; onSubmit:(r:Partial<Rule>)=>Promise<void>|void; onCancel?:()=>void };

export default function RuleForm({ initial, onSubmit, onCancel }: Props){
const [name,setName]=useState(initial?.name||'');
const [app,setApp]=useState<any>(initial?.app||'gmail');
const [priority,setPriority]=useState<number>(initial?.priority??50);
const [enabled,setEnabled]=useState<boolean>(initial?.enabled??true);
const [keywords,setKeywords]=useState<string>((initial?.when?.match?.keywords||[]).join(', '));
const [action,setAction]=useState<string>(initial?.then?.action||'push');

async function save(){
const rule: Partial<Rule>={ name, app, enabled, priority, when:{ match:{ keywords: keywords.split(',').map(s=>s.trim()).filter(Boolean) }}, then:{ action } };
await onSubmit(rule);
}

return (
<div className="card" style={{display:'grid',gap:12}}>
<div>
<div className="muted">Rule name</div>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Starred Gmail → Push"/>
</div>
<div className="grid cols-3">
<div>
<div className="muted">App</div>
<select value={app} onChange={e=>setApp(e.target.value)}>
{APPS.map(a=> <option key={a} value={a}>{a}</option>)}
</select>
</div>
<div>
<div className="muted">Action</div>
<select value={action} onChange={e=>setAction(e.target.value)}>
<option value="push">Push</option>
<option value="digest">Digest</option>
<option value="mute">Mute</option>
<option value="email">Email</option>
</select>
</div>
<div>
<div className="muted">Priority (lower = earlier)</div>
<input type="number" min={0} max={100} value={priority} onChange={e=>setPriority(parseInt(e.target.value))}/>
</div>
</div>
<div>
<div className="muted">Keywords (comma separated)</div>
<input value={keywords} onChange={e=>setKeywords(e.target.value)} placeholder="urgent, P0, meeting"/>
</div>
<div className="row" style={{justifyContent:'space-between'}}>
<label className="row"><input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)}/> Enabled</label>
<div className="row">
{onCancel && <button className="btn ghost" onClick={onCancel}>Cancel</button>}
<button className="btn" onClick={save}>Save rule</button>
</div>
</div>
</div>
);
}