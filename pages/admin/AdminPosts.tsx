import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    MoreVertical,
    Filter,
    Loader2
} from 'lucide-react';
import { supabase } from '../../src/lib/supabase';
import type { Post, Category } from '../../src/types/database';

type PostWithCategory = Post & { categories: Category | null };

const AdminPosts: React.FC = () => {
    const [posts, setPosts] = useState<PostWithCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchPosts();
    }, [statusFilter]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('posts')
                .select('*, categories(*)')
                .order('created_at', { ascending: false });

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            const { data, error } = await query;
            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;

        try {
            const { error } = await supabase.from('posts').delete().eq('id', id);
            if (error) throw error;
            setPosts(posts.filter(p => p.id !== id));
        } catch (error) {
            console.error('Failed to delete post:', error);
            alert('Không thể xóa bài viết');
        }
    };

    const handlePublish = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published';

        try {
            const { error } = await supabase
                .from('posts')
                .update({
                    status: newStatus,
                    published_at: newStatus === 'published' ? new Date().toISOString() : null
                })
                .eq('id', id);

            if (error) throw error;
            fetchPosts();
        } catch (error) {
            console.error('Failed to update post:', error);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            published: 'bg-green-500/20 text-green-400 border-green-500/30',
            draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            archived: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
        };
        const labels: Record<string, string> = {
            published: 'Đã đăng',
            draft: 'Nháp',
            archived: 'Lưu trữ',
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Quản lý bài viết</h1>
                    <p className="text-slate-400">Tạo và quản lý nội dung blog</p>
                </div>
                <Link
                    to="/admin/posts/new"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Tạo bài viết
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-navy-900 rounded-xl p-4 border border-navy-800 flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm bài viết..."
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
                        <option value="published">Đã đăng</option>
                        <option value="draft">Nháp</option>
                        <option value="archived">Lưu trữ</option>
                    </select>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-navy-900 rounded-xl border border-navy-800 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 mb-4">Chưa có bài viết nào</p>
                        <Link
                            to="/admin/posts/new"
                            className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                            <Plus className="w-4 h-4" />
                            Tạo bài viết đầu tiên
                        </Link>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-navy-800/50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Tiêu đề</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Danh mục</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Trạng thái</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Lượt xem</th>
                                <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Ngày tạo</th>
                                <th className="text-right text-xs font-semibold text-slate-400 uppercase tracking-wider px-6 py-4">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-800">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-navy-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-navy-700 rounded-lg overflow-hidden flex-shrink-0">
                                                {post.featured_image ? (
                                                    <img src={post.featured_image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                                                        <Eye className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-white truncate max-w-[300px]">{post.title}</p>
                                                <p className="text-xs text-slate-500 truncate max-w-[300px]">{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-300">
                                            {post.categories?.name || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(post.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-300">{post.view_count}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-400">{formatDate(post.created_at)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handlePublish(post.id, post.status)}
                                                className={`p-2 rounded-lg transition-colors ${post.status === 'published'
                                                        ? 'text-yellow-400 hover:bg-yellow-500/10'
                                                        : 'text-green-400 hover:bg-green-500/10'
                                                    }`}
                                                title={post.status === 'published' ? 'Chuyển về nháp' : 'Xuất bản'}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <Link
                                                to={`/admin/posts/${post.id}/edit`}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
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

export default AdminPosts;
