import { AppBadge } from './AppBadge';
import type { AppId, IntegrationStatus } from '../api/integrations';

export default function AppCard({ status, onClick }: { status: IntegrationStatus; onClick: (app: AppId) => void }) {
    return (
        <button className="card" onClick={() => onClick(status.app)}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
                <AppBadge app={status.app} />
                <span className="muted" style={{ color: status.connected ? '#16a34a' : '#6b7280' }}>{status.connected ? 'Connected' : 'Not connected'}</span>
            </div>
            {status.updatedAt && <div className="muted" style={{ marginTop: 6 }}>Updated {new Date(status.updatedAt).toLocaleString()}</div>}
        </button>
    );
}