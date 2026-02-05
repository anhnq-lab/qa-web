import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, Loader2, AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '../../src/contexts/AuthContext';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn, user, loading: authLoading, devAutoLogin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const from = (location.state as any)?.from?.pathname || '/admin';

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error: signInError } = await signIn(email, password);

        if (signInError) {
            setError('Email hoặc mật khẩu không đúng');
            setLoading(false);
        } else {
            navigate(from, { replace: true });
        }
    };

    const handleDevLogin = async () => {
        setError('');
        setLoading(true);

        // Fill in dev credentials
        setEmail('admin@aiconstruction.vn');
        setPassword('Admin@123456');

        await devAutoLogin();
        setLoading(false);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-navy-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">AI</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">AI Construction Admin</h1>
                    <p className="text-slate-400 mt-2">Đăng nhập để quản lý nội dung</p>
                </div>

                {/* Login Form */}
                <div className="bg-navy-900 rounded-2xl p-8 border border-navy-800 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@aiconstruction.vn"
                                    required
                                    className="w-full bg-navy-950 border border-navy-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-navy-950 border border-navy-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    Đăng nhập
                                </>
                            )}
                        </button>
                    </form>

                    {/* Dev Login Button */}
                    {(import.meta.env.DEV || import.meta.env.VITE_DEV_MODE === 'true') && (
                        <div className="mt-6 pt-6 border-t border-navy-800">
                            <button
                                onClick={handleDevLogin}
                                disabled={loading}
                                className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Zap className="w-4 h-4" />
                                Đăng nhập Dev (Auto)
                            </button>
                            <p className="text-xs text-slate-500 text-center mt-2">
                                Chỉ hiển thị trong môi trường development
                            </p>
                        </div>
                    )}
                </div>

                {/* Back to site */}
                <div className="text-center mt-6">
                    <a href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                        ← Quay về trang chủ
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
