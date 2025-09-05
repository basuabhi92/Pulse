import type { Rule } from '../api/rules';
import { AppBadge } from './AppBadge';

export default function RuleList({ rules, onEdit, onDelete, onToggle }: { rules: Rule[]; onEdit: (r: Rule) => void; onDelete: (r: Rule) => void; onToggle: (r: Rule) => void }) {
    return (
        <div className="grid" style={{ gap: 12 }}>
            {rules.map(r => (
                <div className="card row" key={r.id} style={{ justifyContent: 'space-between' }}>
                    <div>
                        <div className="row" style={{ gap: 8 }}>
                            <AppBadge app={r.app as any} />
                            <div style={{ fontWeight: 600 }}>{r.name}</div>
                            {!r.enabled && <span className="muted">(disabled)</span>}
                        </div>
                        <div className="muted" style={{ marginTop: 4 }}>Priority {r.priority} • Action: {r.then?.action || 'push'}</div>
                    </div>
                    <div className="row">
                        <button className="btn ghost" onClick={() => onToggle(r)}>{r.enabled ? 'Disable' : 'Enable'}</button>
                        <button className="btn ghost" onClick={() => onEdit(r)}>Edit</button>
                        <button className="btn" style={{ background: '#b91c1c' }} onClick={() => onDelete(r)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}