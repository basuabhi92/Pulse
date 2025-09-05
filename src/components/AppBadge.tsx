export function AppBadge({ app }: { app: 'instagram' | 'snapchat' | 'gmail' | 'x' }) {
    const label = { instagram: 'Instagram', snapchat: 'Snapchat', gmail: 'Gmail', x: 'X/Twitter' }[app];
    const bg = { instagram: '#d946ef', snapchat: '#facc15', gmail: '#ef4444', x: '#111827' }[app];
    return <span className="pill" style={{ background: bg }}>{label}</span>;
}