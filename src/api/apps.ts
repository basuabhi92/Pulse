// src/api/apps.ts
import { api } from "./client";

export type AppId = "instagram" | "snapchat" | "gmail" | "x";

export type AppCounter = {
    app: AppId;
    unread: number;
    lastTs?: string;
};

export type AppMode = "silent" | "push" | "digest";

export type AppNotification = {
    id: string;
    app: AppId;
    title: string;
    preview?: string;
    ts: string;            // ISO timestamp
    read: boolean;
    labels?: string[];
};

export async function getAppCounters(): Promise<AppCounter[]> {
    return api.get(`/apps/counters`);
}

export async function listAppNotifications(
    app: AppId,
    opts?: { limit?: number; cursor?: string; include?: "unread" | "read" | "all" }
): Promise<{ items: AppNotification[]; nextCursor?: string }> {
    const p = new URLSearchParams();
    if (opts?.limit) p.set("limit", String(opts.limit));
    if (opts?.cursor) p.set("cursor", opts.cursor);
    if (opts?.include) p.set("include", opts.include);
    const qs = p.toString() ? `?${p.toString()}` : "";
    return api.get(`/apps/${app}/notifications${qs}`);
}

export async function markAllRead(app: AppId, beforeTs?: string): Promise<{ cleared: number }> {
    return api.post(`/apps/${app}/mark-all-read`, beforeTs ? { beforeTs } : {});
}

export async function getAppMode(app: AppId): Promise<{ app: AppId; action: AppMode }> {
    return api.get(`/apps/${app}/mode`);
}

export async function setAppMode(app: AppId, action: AppMode): Promise<{ ok: true }> {
    return api.post(`/apps/${app}/mode`, { action });
}
