import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Users,
    Mail,
    Settings,
    BarChart3,
    ArrowLeft,
    Bell,
    Search
} from 'lucide-react';

const AdminLayout: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
        { path: '/admin/posts', icon: FileText, label: 'Bài viết' },
        { path: '/admin/leads', icon: Users, label: 'Leads' },
        { path: '/admin/subscribers', icon: Mail, label: 'Subscribers' },
        { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/admin/settings', icon: Settings, label: 'Cài đặt' },
    ];

    const isActive = (path: string, exact = false) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-navy-950 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-navy-900 border-r border-navy-800 flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-navy-800">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">AI</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-white">AI Construction</h1>
                            <p className="text-xs text-slate-500">Admin Panel</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${isActive(item.path, item.exact)
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'text-slate-400 hover:text-white hover:bg-navy-800'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Back to site */}
                <div className="p-4 border-t border-navy-800">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Về trang chủ
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="h-16 bg-navy-900 border-b border-navy-800 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="bg-navy-950 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary w-64"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium text-white">Admin</p>
                                <p className="text-xs text-slate-500">admin@aiconstruction.vn</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
