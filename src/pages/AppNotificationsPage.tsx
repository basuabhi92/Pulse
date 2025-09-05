// src/pages/AppNotificationsPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { AppId, AppNotification } from "../api/apps.js";
import { listAppNotifications, markAllRead } from "../api/apps.js";
import ModeSwitch from "../components/ModeSwitch";
import { AppBadge } from "../components/AppBadge";

export default function AppNotificationsPage() {
  const { app: appParam } = useParams();
  const app = (appParam as AppId) ?? "gmail";

  const [items, setItems] = useState<AppNotification[]>([]);
  const [err, setErr] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [include, setInclude] = useState<"unread" | "read" | "all">("unread");

  async function load() {
    try {
      setLoading(true);
      const res = await listAppNotifications(app, { limit: 100, include });
      setItems(res.items);
      setErr(undefined);
    } catch (e: any) {
      setErr(e.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app, include]);

  async function onMarkAll() {
    try {
      const { cleared } = await markAllRead(app);
      // After mark-all, reload; backend either deletes immediately or TTL-purges soon.
      await load();
      alert(`Cleared ${cleared} notifications for ${app}`);
    } catch (e: any) {
      alert(`Failed to clear: ${e.message}`);
    }
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row" style={{ gap: 8 }}>
          <Link className="tab" to="/">← All apps</Link>
          <AppBadge app={app} />
          <div style={{ fontWeight: 600, fontSize: 16 }}>Notifications</div>
        </div>
        <div className="row" style={{ gap: 8 }}>
          <select
            value={include}
            onChange={(e) => setInclude(e.target.value as any)}
            className="tab"
          >
            <option value="unread">Unread</option>
            <option value="all">All (unread first)</option>
            <option value="read">Read</option>
          </select>
          <button className="btn" onClick={onMarkAll}>Mark all read & clear</button>
        </div>
      </div>

      <ModeSwitch app={app} />

      {err && <div className="card" style={{ color: "#b91c1c" }}>{err}</div>}
      {loading ? (
        <div className="card">Loading…</div>
      ) : items.length === 0 ? (
        <div className="card">No notifications to show.</div>
      ) : (
        <div className="grid" style={{ gap: 12 }}>
          {items.map((n) => (
            <div key={n.id} className="card">
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="row" style={{ gap: 8 }}>
                  <div style={{ fontWeight: 600 }}>{n.title}</div>
                </div>
                <div className="muted">{new Date(n.ts).toLocaleString()}</div>
              </div>
              {n.preview && <div className="muted" style={{ marginTop: 6 }}>{n.preview}</div>}
              {n.labels?.length ? (
                <div className="row" style={{ gap: 6, marginTop: 8 }}>
                  {n.labels.map((l) => (
                    <span key={l} className="pill" style={{ background: "#111827" }}>{l}</span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
