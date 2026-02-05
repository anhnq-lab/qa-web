import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FileText,
    Users,
    Mail,
    Eye,
    TrendingUp,
    ArrowUpRight,
    Plus
} from 'lucide-react';
import { supabase } from '../../src/lib/supabase';

interface Stats {
    posts: number;
    leads: number;
    subscribers: number;
    views: number;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<Stats>({ posts: 0, leads: 0, subscribers: 0, views: 0 });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch counts
                const [postsRes, leadsRes, subsRes, viewsRes] = await Promise.all([
                    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
                    supabase.from('leads').select('*', { count: 'exact', head: true }),
                    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
                    supabase.from('page_views').select('*', { count: 'exact', head: true }),
                ]);

                setStats({
                    posts: postsRes.count || 0,
                    leads: leadsRes.count || 0,
                    subscribers: subsRes.count || 0,
                    views: viewsRes.count || 0,
                });

                // Fetch recent leads
                const { data: leads } = await supabase
                    .from('leads')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setRecentLeads(leads || []);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Bài viết', value: stats.posts, icon: FileText, color: 'from-blue-500 to-blue-600', link: '/admin/posts' },
        { label: 'Leads', value: stats.leads, icon: Users, color: 'from-green-500 to-green-600', link: '/admin/leads' },
        { label: 'Subscribers', value: stats.subscribers, icon: Mail, color: 'from-purple-500 to-purple-600', link: '/admin/subscribers' },
        { label: 'Lượt xem', value: stats.views, icon: Eye, color: 'from-amber-500 to-amber-600', link: '/admin/analytics' },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-slate-400">Tổng quan hoạt động của website</p>
                </div>
                <Link
                    to="/admin/posts/new"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Tạo bài viết
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Link
                        key={stat.label}
                        to={stat.link}
                        className="bg-navy-900 rounded-xl p-6 border border-navy-800 hover:border-primary/30 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white mb-1">
                                {loading ? '...' : stat.value.toLocaleString()}
                            </p>
                            <p className="text-slate-400 text-sm">{stat.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <div className="bg-navy-900 rounded-xl border border-navy-800">
                    <div className="p-6 border-b border-navy-800 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Users className="w-5 h-5 text-green-400" />
                            Leads mới nhất
                        </h2>
                        <Link to="/admin/leads" className="text-primary text-sm font-medium hover:underline">
                            Xem tất cả
                        </Link>
                    </div>
                    <div className="divide-y divide-navy-800">
                        {loading ? (
                            <div className="p-6 text-center text-slate-400">Đang tải...</div>
                        ) : recentLeads.length === 0 ? (
                            <div className="p-6 text-center text-slate-400">Chưa có lead nào</div>
                        ) : (
                            recentLeads.map((lead) => (
                                <div key={lead.id} className="p-4 hover:bg-navy-800/50 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium text-white">{lead.name}</p>
                                            <p className="text-sm text-slate-400">{lead.email}</p>
                                            {lead.company && (
                                                <p className="text-xs text-slate-500 mt-1">{lead.company}</p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${lead.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                                                    lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        lead.status === 'qualified' ? 'bg-green-500/20 text-green-400' :
                                                            'bg-slate-500/20 text-slate-400'
                                                }`}>
                                                {lead.status}
                                            </span>
                                            <p className="text-xs text-slate-500 mt-1">{formatDate(lead.created_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-navy-900 rounded-xl border border-navy-800">
                    <div className="p-6 border-b border-navy-800">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Hành động nhanh
                        </h2>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <Link
                            to="/admin/posts/new"
                            className="flex flex-col items-center gap-3 p-6 bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors border border-navy-700 hover:border-primary/30"
                        >
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-blue-400" />
                            </div>
                            <span className="font-medium text-white text-sm">Tạo bài viết</span>
                        </Link>
                        <Link
                            to="/admin/leads"
                            className="flex flex-col items-center gap-3 p-6 bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors border border-navy-700 hover:border-primary/30"
                        >
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-green-400" />
                            </div>
                            <span className="font-medium text-white text-sm">Xem leads</span>
                        </Link>
                        <Link
                            to="/admin/subscribers"
                            className="flex flex-col items-center gap-3 p-6 bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors border border-navy-700 hover:border-primary/30"
                        >
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Mail className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="font-medium text-white text-sm">Subscribers</span>
                        </Link>
                        <Link
                            to="/admin/analytics"
                            className="flex flex-col items-center gap-3 p-6 bg-navy-800 rounded-xl hover:bg-navy-700 transition-colors border border-navy-700 hover:border-primary/30"
                        >
                            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                <Eye className="w-6 h-6 text-amber-400" />
                            </div>
                            <span className="font-medium text-white text-sm">Analytics</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
