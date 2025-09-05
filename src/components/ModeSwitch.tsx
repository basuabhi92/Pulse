// src/components/ModeSwitch.tsx
import { useEffect, useState } from "react";
import type { AppId } from "../api/apps";
import { getAppMode, setAppMode } from "../api/apps";

export default function ModeSwitch({ app }: { app: AppId }) {
    const [mode, setMode] = useState<"silent" | "push" | "digest">("silent");
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState<string>();

    useEffect(() => {
        (async () => {
            try {
                const res = await getAppMode(app);
                setMode(res.action);
            } catch (e: any) {
                setErr(e.message || "Failed to load mode");
            }
        })();
    }, [app]);

    async function save(next: "silent" | "push" | "digest") {
        try {
            setSaving(true);
            setMode(next);
            await setAppMode(app, next);
        } catch (e: any) {
            setErr(e.message || "Failed to save mode");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="card" style={{ display: "grid", gap: 8 }}>
            <div style={{ fontWeight: 600 }}>Delivery mode for {app}</div>
            <div className="row" style={{ gap: 8 }}>
                {(["silent", "push", "digest"] as const).map((m) => (
                    <button
                        key={m}
                        className={`tab ${mode === m ? "active" : ""}`}
                        onClick={() => save(m)}
                        disabled={saving}
                    >
                        {m === "silent" && "Silent (accumulate only)"}
                        {m === "push" && "Push (notify instantly)"}
                        {m === "digest" && "Digest (summary later)"}
                    </button>
                ))}
            </div>
            {err && <div style={{ color: "#b91c1c" }}>{err}</div>}
        </div>
    );
}
