import { storage } from '../utils/storage';

function decodeJwt(token?: string): any | undefined {
  try {
    if (!token) return undefined;
    const [, payload] = token.split('.');
    if (!payload) return undefined;
    return JSON.parse(atob(payload.replace(/-/g,'+').replace(/_/g,'/')));
  } catch { return undefined; }
}

export const session = {
  token: storage.get<string>('token'),
  get payload(){ return decodeJwt(this.token); },
  get userId(): string | undefined { return this.payload?.sub; },
  setToken(tok?: string) { this.token = tok; if (tok) storage.set('token', tok); else storage.del('token'); }
};
