import { supabase } from '../lib/supabase';
import type { InsertTables } from '../types/database';

export const subscriberService = {
    // Subscribe to newsletter
    async subscribe(email: string, name?: string) {
        // Check if already subscribed
        const { data: existing } = await supabase
            .from('subscribers')
            .select('id, status')
            .eq('email', email)
            .single();

        if (existing) {
            if (existing.status === 'unsubscribed') {
                // Reactivate
                const { data, error } = await supabase
                    .from('subscribers')
                    .update({ status: 'active', unsubscribed_at: null })
                    .eq('id', existing.id)
                    .select()
                    .single();

                if (error) throw error;
                return { data, reactivated: true };
            }
            return { data: existing, alreadySubscribed: true };
        }

        // New subscriber
        const { data, error } = await supabase
            .from('subscribers')
            .insert({ email, name, status: 'active' })
            .select()
            .single();

        if (error) throw error;
        return { data, isNew: true };
    },

    // Unsubscribe
    async unsubscribe(email: string) {
        const { data, error } = await supabase
            .from('subscribers')
            .update({
                status: 'unsubscribed',
                unsubscribed_at: new Date().toISOString()
            })
            .eq('email', email)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Admin: Get all subscribers
    async getSubscribers(status?: 'active' | 'unsubscribed' | 'bounced') {
        let query = supabase
            .from('subscribers')
            .select('*')
            .order('subscribed_at', { ascending: false });

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    // Admin: Get subscriber count
    async getSubscriberCount() {
        const { count, error } = await supabase
            .from('subscribers')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'active');

        if (error) throw error;
        return count || 0;
    },
};

export default subscriberService;
