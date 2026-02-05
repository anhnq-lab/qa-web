import { supabase } from '../lib/supabase';
import type { Lead, InsertTables } from '../types/database';

export const leadService = {
    // Submit new lead (public)
    async submitLead(lead: InsertTables<'leads'>) {
        const { data, error } = await supabase
            .from('leads')
            .insert({
                ...lead,
                status: 'new',
                score: 0,
                metadata: {
                    user_agent: typeof window !== 'undefined' ? navigator.userAgent : '',
                    referrer: typeof document !== 'undefined' ? document.referrer : '',
                    submitted_at: new Date().toISOString(),
                },
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Admin: Get all leads
    async getLeads(status?: Lead['status'], limit = 50) {
        let query = supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Admin: Update lead status
    async updateLeadStatus(id: string, status: Lead['status']) {
        const { data, error } = await supabase
            .from('leads')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Admin: Update lead score
    async updateLeadScore(id: string, score: number) {
        const { data, error } = await supabase
            .from('leads')
            .update({ score })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Admin: Get lead stats
    async getLeadStats() {
        const { data, error } = await supabase
            .from('leads')
            .select('status');

        if (error) throw error;

        const stats = {
            total: data.length,
            new: data.filter(l => l.status === 'new').length,
            contacted: data.filter(l => l.status === 'contacted').length,
            qualified: data.filter(l => l.status === 'qualified').length,
            converted: data.filter(l => l.status === 'converted').length,
            lost: data.filter(l => l.status === 'lost').length,
        };

        return stats;
    },
};

export default leadService;
