import React, { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    Loader2,
    Mail,
    Phone,
    Building2,
    MessageSquare,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';
import { supabase } from '../../src/lib/supabase';
import type { Lead } from '../../src/types/database';

const AdminLeads: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    useEffect(() => {
        fetchLeads();
    }, [statusFilter]);

    const fetchLeads = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            const { data, error } = await query;
            if (error) throw error;
            setLeads(data || []);
        } catch (error) {
            console.error('Failed to fetch leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: Lead['status']) => {
        try {
            const { error } = await supabase
                .from('leads')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
            if (selectedLead?.id === id) {
                setSelectedLead({ ...selectedLead, status: newStatus });
            }
        } catch (error) {
            console.error('Failed to update lead:', error);
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.company || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusConfig = (status: string) => {
        const configs: Record<string, { bg: string; text: string; label: string; icon: any }> = {
            new: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Mới', icon: Clock },
            contacted: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Đã liên hệ', icon: Phone },
            qualified: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Tiềm năng', icon: CheckCircle },
            converted: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Chuyển đổi', icon: CheckCircle },
            lost: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Mất', icon: XCircle },
        };
        return configs[status] || configs.new;
    };

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.status === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        converted: leads.filter(l => l.status === 'converted').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Quản lý Leads</h1>
                <p className="text-slate-400">Theo dõi và chuyển đổi khách hàng tiềm năng</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: 'Tổng', value: stats.total, color: 'bg-slate-500' },
                    { label: 'Mới', value: stats.new, color: 'bg-blue-500' },
                    { label: 'Đã liên hệ', value: stats.contacted, color: 'bg-yellow-500' },
                    { label: 'Tiềm năng', value: stats.qualified, color: 'bg-green-500' },
                    { label: 'Chuyển đổi', value: stats.converted, color: 'bg-purple-500' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-navy-900 rounded-xl p-4 border border-navy-800">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                            <span className="text-sm text-slate-400">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-navy-900 rounded-xl p-4 border border-navy-800 flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, email, công ty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-navy-950 border border-navy-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-primary"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-sm text-white focus:border-primary"
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="new">Mới</option>
                        <option value="contacted">Đã liên hệ</option>
                        <option value="qualified">Tiềm năng</option>
                        <option value="converted">Chuyển đổi</option>
                        <option value="lost">Mất</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Leads List */}
                <div className="flex-1 bg-navy-900 rounded-xl border border-navy-800 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : filteredLeads.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            Không có lead nào
                        </div>
                    ) : (
                        <div className="divide-y divide-navy-800">
                            {filteredLeads.map((lead) => {
                                const statusConfig = getStatusConfig(lead.status);
                                return (
                                    <div
                                        key={lead.id}
                                        onClick={() => setSelectedLead(lead)}
                                        className={`p-4 cursor-pointer hover:bg-navy-800/50 transition-colors ${selectedLead?.id === lead.id ? 'bg-navy-800/50 border-l-2 border-primary' : ''
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-primary/50 to-blue-500/50 rounded-full flex items-center justify-center text-white font-bold">
                                                    {lead.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{lead.name}</p>
                                                    <p className="text-sm text-slate-400">{lead.email}</p>
                                                    {lead.company && (
                                                        <p className="text-xs text-slate-500 mt-1">{lead.company}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                    <statusConfig.icon className="w-3 h-3" />
                                                    {statusConfig.label}
                                                </span>
                                                <p className="text-xs text-slate-500 mt-1">{formatDate(lead.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Lead Detail */}
                {selectedLead && (
                    <div className="w-96 bg-navy-900 rounded-xl border border-navy-800 p-6">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                {selectedLead.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{selectedLead.name}</h3>
                                <p className="text-slate-400">{selectedLead.email}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            {selectedLead.phone && (
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Phone className="w-4 h-4 text-slate-500" />
                                    <a href={`tel:${selectedLead.phone}`} className="hover:text-primary">{selectedLead.phone}</a>
                                </div>
                            )}
                            {selectedLead.company && (
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Building2 className="w-4 h-4 text-slate-500" />
                                    {selectedLead.company}
                                </div>
                            )}
                            <div className="flex items-start gap-3 text-slate-300">
                                <MessageSquare className="w-4 h-4 text-slate-500 mt-1" />
                                <p className="text-sm">{selectedLead.message || 'Không có tin nhắn'}</p>
                            </div>
                        </div>

                        <div className="border-t border-navy-800 pt-4">
                            <p className="text-sm text-slate-500 mb-3">Cập nhật trạng thái:</p>
                            <div className="grid grid-cols-2 gap-2">
                                {(['new', 'contacted', 'qualified', 'converted', 'lost'] as const).map((status) => {
                                    const config = getStatusConfig(status);
                                    return (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusChange(selectedLead.id, status)}
                                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${selectedLead.status === status
                                                    ? `${config.bg} ${config.text} border-current`
                                                    : 'bg-navy-800 text-slate-400 border-navy-700 hover:border-slate-500'
                                                }`}
                                        >
                                            {config.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <a
                                href={`mailto:${selectedLead.email}`}
                                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2 rounded-lg font-medium transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                Email
                            </a>
                            {selectedLead.phone && (
                                <a
                                    href={`tel:${selectedLead.phone}`}
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    Gọi
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminLeads;
