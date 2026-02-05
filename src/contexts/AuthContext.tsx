import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    isAdmin: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    devAutoLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dev credentials (only for development)
const DEV_ADMIN_EMAIL = 'admin@aiconstruction.vn';
const DEV_ADMIN_PASSWORD = 'Admin@123456';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isSupabaseConfigured()) {
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
    };

    // Auto login for development
    const devAutoLogin = async () => {
        if (import.meta.env.DEV || import.meta.env.VITE_DEV_MODE === 'true') {
            const { error } = await signIn(DEV_ADMIN_EMAIL, DEV_ADMIN_PASSWORD);
            if (error) {
                console.warn('Dev auto-login failed:', error.message);
            }
        }
    };

    // Check if user is admin (has admin role or specific email)
    const isAdmin = user?.email === DEV_ADMIN_EMAIL ||
        user?.user_metadata?.role === 'admin' ||
        user?.app_metadata?.role === 'admin';

    return (
        <AuthContext.Provider value={{
            user,
            session,
            loading,
            isAdmin,
            signIn,
            signOut,
            devAutoLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
