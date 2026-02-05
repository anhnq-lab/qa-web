import React, { useEffect, useState } from 'react';
import {
    Search,
    Loader2,
    Mail,
    Download,
    Trash2,
    UserCheck,
    UserX
} from 'lucide-react';
import { supabase } from '../../src/lib/supabase';
import type { Subscriber } from '../../src/types/database';

const AdminSubscribers: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchSubscribers();
    }, [statusFilter]);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('subscribers')
                .select('*')
                .order('subscribed_at', { ascending: false });

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            const { data, error } = await query;
            if (error) throw error;
            setSubscribers(data || []);
        } catch (error) {
            console.error('Failed to fetch subscribers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa subscriber này?')) return;

        try {
            const { error } = await supabase.from('subscribers').delete().eq('id', id);
            if (error) throw error;
            setSubscribers(subscribers.filter(s => s.id !== id));
        } catch (error) {
            console.error('Failed to delete subscriber:', error);
        }
    };

    const handleExport = () => {
        const activeSubscribers = subscribers.filter(s => s.status === 'active');
        const csv = [
            ['Email', 'Name', 'Subscribed At'],
            ...activeSubscribers.map(s => [s.email, s.name || '', s.subscribed_at])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sub.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const stats = {
        total: subscribers.length,
        active: subscribers.filter(s => s.status === 'active').length,
        unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Newsletter Subscribers</h1>
                    <p className="text-slate-400">Quản lý danh sách đăng ký nhận tin</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Download className="w-5 h-5" />
                    Export CSV
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-navy-900 rounded-xl p-6 border border-navy-800">
                    <div className="flex items-center gap-3 mb-2">
                        <Mail className="w-5 h-5 text-slate-400" />
                        <span className="text-sm text-slate-400">Tổng số</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="bg-navy-900 rounded-xl p-6 border border-navy-800">
                    <div className="flex items-center gap-3 mb-2">
                        <UserCheck className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-slate-400">Đang hoạt động</span>
                    </div>
                    <p className="text-3xl font-bold text-green-400">{stats.active}</p>
                </div>
                <div className="bg-navy-900 rounded-xl p-6 border border-navy-800">
                    <div className="flex items-center gap-3 mb-2">
                        <UserX className="w-5 h-5 text-red-400" />
                        <span className="text-sm text-slate-400">Đã hủy</span>
                    </div>
                    <p className="text-3xl font-bold text-red-400">{stats.unsubscribed}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-navy-900 rounded-xl p-4 border border-navy-800 flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-navy-950 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-primary"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-sm text-white focus:border-primary"
                >
                    <option value="all">Tất cả</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="unsubscribed">Đã hủy</option>
                </select>
            </div>

            {/* Subscribers Table */}
            <div className="bg-navy-900 rounded-xl border border-navy-800 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : filteredSubscribers.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        Chưa có subscriber nào
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-navy-800/50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Email</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Tên</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Trạng thái</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Ngày đăng ký</th>
                                <th className="text-right text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-800">
                            {filteredSubscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-navy-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-white">{sub.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-300">{sub.name || '-'}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.status === 'active'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {sub.status === 'active' ? 'Hoạt động' : 'Đã hủy'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">{formatDate(sub.subscribed_at)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={`mailto:${sub.email}`}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="Gửi email"
                                            >
                                                <Mail className="w-4 h-4" />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(sub.id)}
                                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminSubscribers;
