import { storage } from '../utils/storage';

export const session = {
    token: storage.get<string>('token'),
    setToken(tok?: string) { this.token = tok; if (tok) storage.set('token', tok); else storage.del('token'); }
};
