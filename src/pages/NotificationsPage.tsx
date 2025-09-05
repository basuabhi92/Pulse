// src/pages/NotificationsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAppCounters, type AppCounter } from "../api/apps.js";
import { AppBadge } from "../components/AppBadge";

export default function NotificationsPage() {
  const [counters, setCounters] = useState<AppCounter[]>([]);
  const [err, setErr] = useState<string>();

  useEffect(() => {
    (async () => {
      try {
        const res = await getAppCounters();
        // Optional: sort by unread desc, then lastTs desc
        res.sort((a, b) => (b.unread - a.unread) || (new Date(b.lastTs || 0).getTime() - new Date(a.lastTs || 0).getTime()));
        setCounters(res);
      } catch (e: any) {
        setErr(e.message);
      }
    })();
  }, []);

  return (
    <div className="grid" style={{ gap: 12 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>Your apps</h2>
        <div className="muted">Open an app to view accumulated notifications.</div>
      </div>

      {err && <div className="card" style={{ color: "#b91c1c" }}>{err}</div>}

      <div className="grid cols-2">
        {counters.map((c) => (
          <Link key={c.app} to={`/apps/${c.app}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className="row" style={{ gap: 8 }}>
                <AppBadge app={c.app as any} />
                <div style={{ fontWeight: 600, textTransform: "capitalize" }}>{c.app}</div>
              </div>
              {c.unread > 0 ? (
                <span className="pill" style={{ background: "#111827" }}>{c.unread} unread</span>
              ) : (
                <span className="muted">0 unread</span>
              )}
            </div>
            {c.lastTs && <div className="muted" style={{ marginTop: 6 }}>Last: {new Date(c.lastTs).toLocaleString()}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}
