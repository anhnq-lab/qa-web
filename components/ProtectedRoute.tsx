import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../src/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { user, loading, isAdmin } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen bg-navy-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!user) {
        // Redirect to login, saving the attempted location
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        // User is logged in but not admin
        return (
            <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🔒</span>
                    </div>
                    <h1 className="text-xl font-bold text-white mb-2">Truy cập bị từ chối</h1>
                    <p className="text-slate-400 mb-4">Bạn không có quyền truy cập trang này</p>
                    <a href="/" className="text-primary hover:underline">
                        Quay về trang chủ
                    </a>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
