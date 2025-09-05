// src/utils/storage.ts
export const storage = {
    get<T>(key: string, def?: T): T | undefined {
        try {
            const v = localStorage.getItem(key);
            return v ? (JSON.parse(v) as T) : def;
        } catch {
            return def;
        }
    },
    set<T>(key: string, val: T) {
        localStorage.setItem(key, JSON.stringify(val));
    },
    del(key: string) {
        localStorage.removeItem(key);
    },
};
