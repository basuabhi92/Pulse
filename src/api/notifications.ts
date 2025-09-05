import { api } from './client';
export type NotificationItem = { id:string; app:'instagram'|'snapchat'|'gmail'|'x'; title:string; preview?:string; ts:string; labels?:string[]; priorityScore?:number };
export const listNotifications = (limit=50)=> api.get<NotificationItem[]>(`/notifications?limit=${limit}`);
