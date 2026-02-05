import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Save,
    Eye,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import { supabase } from '../../src/lib/supabase';
import type { Category, InsertTables, UpdateTables } from '../../src/types/database';

const PostEditor: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        category_id: '',
        status: 'draft' as 'draft' | 'published' | 'archived',
        meta_title: '',
        meta_description: '',
        ai_generated: false
    });

    useEffect(() => {
        fetchCategories();
        if (isEdit) {
            fetchPost();
        }
    }, [id]);

    const fetchCategories = async () => {
        const { data } = await supabase.from('categories').select('*').order('name');
        setCategories(data || []);
    };

    const fetchPost = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt || '',
                    content: data.content || '',
                    featured_image: data.featured_image || '',
                    category_id: data.category_id || '',
                    status: data.status as 'draft' | 'published' | 'archived',
                    meta_title: data.meta_title || '',
                    meta_description: data.meta_description || '',
                    ai_generated: data.ai_generated || false
                });
            }
        } catch (error) {
            console.error('Failed to fetch post:', error);
            alert('Không thể tải bài viết');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: isEdit ? prev.slug : generateSlug(title)
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent, publish = false) => {
        e.preventDefault();

        if (!formData.title || !formData.slug) {
            alert('Vui lòng nhập tiêu đề và slug');
            return;
        }

        setSaving(true);
        try {
            const postData = {
                ...formData,
                category_id: formData.category_id || null,
                status: publish ? 'published' : formData.status,
                published_at: publish ? new Date().toISOString() : null
            };

            if (isEdit) {
                const { error } = await supabase
                    .from('posts')
                    .update(postData as UpdateTables<'posts'>)
                    .eq('id', id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('posts')
                    .insert(postData as InsertTables<'posts'>);

                if (error) throw error;
            }

            navigate('/admin/posts');
        } catch (error: any) {
            console.error('Failed to save post:', error);
            if (error.code === '23505') {
                alert('Slug đã tồn tại. Vui lòng chọn slug khác.');
            } else {
                alert('Không thể lưu bài viết');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/posts')}
                        className="p-2 text-slate-400 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            {isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}
                        </h1>
                        <p className="text-slate-400">
                            {formData.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => handleSubmit(e, false)}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-lg font-medium transition-colors border border-navy-700"
                    >
                        <Save className="w-4 h-4" />
                        Lưu nháp
                    </button>
                    <button
                        onClick={(e) => handleSubmit(e, true)}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                        Xuất bản
                    </button>
                </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
                {/* Main Content */}
                <div className="bg-navy-900 rounded-xl border border-navy-800 p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Tiêu đề <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="Nhập tiêu đề bài viết..."
                            className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary text-lg"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Slug (URL) <span className="text-red-400">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">/blog/</span>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="url-bai-viet"
                                className="flex-1 bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Tóm tắt
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Mô tả ngắn gọn về bài viết..."
                            className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-primary resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Nội dung (Markdown)
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={15}
                            placeholder="Viết nội dung bài viết bằng Markdown..."
                            className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-primary font-mono text-sm"
                        />
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category & Image */}
                    <div className="bg-navy-900 rounded-xl border border-navy-800 p-6 space-y-4">
                        <h3 className="font-semibold text-white">Cài đặt</h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Danh mục
                            </label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white focus:border-primary"
                            >
                                <option value="">Chọn danh mục</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Ảnh đại diện (URL)
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    name="featured_image"
                                    value={formData.featured_image}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="flex-1 bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:border-primary"
                                />
                                <button
                                    type="button"
                                    className="p-2 bg-navy-800 hover:bg-navy-700 text-slate-400 rounded-lg transition-colors"
                                >
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                            </div>
                            {formData.featured_image && (
                                <div className="mt-3 aspect-video bg-navy-800 rounded-lg overflow-hidden">
                                    <img
                                        src={formData.featured_image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="ai_generated"
                                checked={formData.ai_generated}
                                onChange={handleChange}
                                className="w-4 h-4 rounded border-navy-600 bg-navy-950 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-slate-300">Đánh dấu là nội dung AI</span>
                        </label>
                    </div>

                    {/* SEO */}
                    <div className="bg-navy-900 rounded-xl border border-navy-800 p-6 space-y-4">
                        <h3 className="font-semibold text-white">SEO</h3>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                name="meta_title"
                                value={formData.meta_title}
                                onChange={handleChange}
                                placeholder={formData.title || 'Tiêu đề SEO...'}
                                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Meta Description
                            </label>
                            <textarea
                                name="meta_description"
                                value={formData.meta_description}
                                onChange={handleChange}
                                rows={3}
                                placeholder={formData.excerpt || 'Mô tả SEO...'}
                                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:border-primary resize-none"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostEditor;
