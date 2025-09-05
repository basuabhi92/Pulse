import { api } from './client';
export function register(input:{email:string;password:string;name?:string;}){ return api.post<{token:string}>(`/auth/register`, input); }
export function login(input:{email:string;password:string;}){ return api.post<{token:string}>(`/auth/login`, input); }
