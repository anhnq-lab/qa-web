import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create client even without env vars (for build time), but will show warning
export const supabase: SupabaseClient<Database> = createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
    return !!supabaseUrl && !!supabaseAnonKey;
};

// Helper for auth
export const getUser = async () => {
    if (!isSupabaseConfigured()) return null;
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};

// Helper for session
export const getSession = async () => {
    if (!isSupabaseConfigured()) return null;
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};

// Sign in with email/password
export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    return { data, error };
};

// Sign out
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};
