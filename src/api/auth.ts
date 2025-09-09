import { api } from './client';
type TokenPayload = { token: string };

export async function register(input: { email: string; password: string; name?: string }): Promise<TokenPayload> {
  const res = await api.post<TokenPayload>("/auth/register", input);
  return (res as any).data ?? res;
}

export async function login(input: { email: string; password: string }): Promise<TokenPayload> {
  const res = await api.post<TokenPayload>("/auth/login", input);
  return (res as any).data ?? res;
}
