import { api } from './client';
export type Rule = { id: string; name: string; app: 'instagram' | 'snapchat' | 'gmail' | 'x'; enabled: boolean; priority: number; when: any; then: any };
export const RulesAPI = {
    list: () => api.get<Rule[]>(`/rules`),
    create: (input: Partial<Rule>) => api.post<Rule>(`/rules`, input),
    update: (id: string, input: Partial<Rule>) => api.put<Rule>(`/rules/${id}`, input),
    remove: (id: string) => api.del<void>(`/rules/${id}`),
    validate: (input: Partial<Rule>) => api.post(`/rules/validate`, input),
    dryRun: (id: string, sample: any) => api.post(`/rules/${id}/dry-run`, { sample }),
};