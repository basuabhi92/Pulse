import { api } from './client';
export type AppId = 'instagram'|'snapchat'|'gmail'|'x';
export type IntegrationStatus = { app:AppId; connected:boolean; updatedAt?:string };
export const listIntegrations = ()=> api.get<IntegrationStatus[]>(`/app/list`);
export const getStatus = (app:AppId)=> api.get<IntegrationStatus>(`/integrations/${app}/status`);
export const beginAuthorize = (app:AppId, redirectUri:string)=> api.get<{authUrl:string}>(`/integrations/${app}/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`);
export const oauthCallback = (query:Record<string,string>)=> api.post(`/integrations/oauth/callback`, { query });
