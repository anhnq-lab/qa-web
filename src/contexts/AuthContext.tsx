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

// Auto-login enabled for all environments (dev + production)
const isAutoLoginEnabled = () => {
    return true; // Always auto-login for convenience
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

    // Auto login function
    const performAutoLogin = async () => {
        if (!isSupabaseConfigured()) return false;

        console.log('🔐 Dev mode: Attempting auto-login...');
        const { error } = await supabase.auth.signInWithPassword({
            email: DEV_ADMIN_EMAIL,
            password: DEV_ADMIN_PASSWORD
        });

        if (error) {
            console.warn('⚠️ Auto-login failed:', error.message);
            return false;
        }

        console.log('✅ Auto-login successful!');
        return true;
    };

    useEffect(() => {
        if (!isSupabaseConfigured()) {
            setLoading(false);
            return;
        }

        // Get initial session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session) {
                // Already have a session
                setSession(session);
                setUser(session.user);
                setLoading(false);
            } else if (isAutoLoginEnabled() && !autoLoginAttempted) {
                // No session in dev mode - try auto login
                setAutoLoginAttempted(true);
                const success = await performAutoLogin();
                if (!success) {
                    setLoading(false);
                }
                // If success, the onAuthStateChange will update the state
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [autoLoginAttempted]);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
    };

    // Manual auto login (for button click)
    const devAutoLogin = async () => {
        if (isAutoLoginEnabled()) {
            await performAutoLogin();
        }
    };

    // Check if user is admin
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
