import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileText, Calculator, CheckSquare, BookOpen, Filter, Search, Star, Eye, ArrowRight } from 'lucide-react';

interface Tool {
    id: number;
    title: string;
    description: string;
    category: string;
    format: string;
    size: string;
    downloads: number;
    featured: boolean;
    icon: string;
    color: string;
}

const tools: Tool[] = [
    {
        id: 1,
        title: 'Mẫu dự toán chi phí xây dựng Excel',
        description: 'Bảng tính Excel hoàn chỉnh để lập dự toán chi phí xây dựng theo định mức nhà nước. Bao gồm các sheet: chi phí vật liệu, nhân công, máy thi công.',
        category: 'Dự toán',
        format: 'XLSX',
        size: '2.5 MB',
        downloads: 3420,
        featured: true,
        icon: 'calculate',
        color: 'text-emerald-400'
    },
    {
        id: 2,
        title: 'Checklist nghiệm thu công trình',
        description: 'Danh mục kiểm tra đầy đủ các hạng mục cần nghiệm thu trong xây dựng công trình dân dụng và công nghiệp.',
        category: 'Biểu mẫu',
        format: 'PDF',
        size: '1.2 MB',
        downloads: 2150,
        featured: true,
        icon: 'checklist',
        color: 'text-blue-400'
    },
    {
        id: 3,
        title: 'Mẫu hợp đồng thi công xây dựng',
        description: 'Mẫu hợp đồng chuẩn theo Nghị định 37/2015/NĐ-CP, bao gồm các điều khoản về tiến độ, thanh toán, bảo hành.',
        category: 'Pháp lý',
        format: 'DOCX',
        size: '850 KB',
        downloads: 1890,
        featured: false,
        icon: 'description',
        color: 'text-purple-400'
    },
    {
        id: 4,
        title: 'Bảng tính khối lượng BIM (QTO)',
        description: 'Template Excel để xuất và tổng hợp khối lượng từ mô hình BIM với Revit, phân chia theo hạng mục và tầng.',
        category: 'BIM',
        format: 'XLSX',
        size: '1.8 MB',
        downloads: 1650,
        featured: true,
        icon: 'view_in_ar',
        color: 'text-cyan-400'
    },
    {
        id: 5,
        title: 'Biểu mẫu nhật ký thi công',
        description: 'Mẫu nhật ký công trình theo quy định, ghi chép tiến độ, nhân lực, vật tư, vấn đề phát sinh hàng ngày.',
        category: 'Biểu mẫu',
        format: 'PDF',
        size: '500 KB',
        downloads: 1420,
        featured: false,
        icon: 'edit_note',
        color: 'text-amber-400'
    },
    {
        id: 6,
        title: 'Công cụ tính ROI chuyển đổi số',
        description: 'Bảng tính Excel giúp đánh giá hiệu quả đầu tư khi áp dụng BIM/Digital vào doanh nghiệp xây dựng.',
        category: 'Công cụ',
        format: 'XLSX',
        size: '1.1 MB',
        downloads: 980,
        featured: false,
        icon: 'trending_up',
        color: 'text-green-400'
    },
    {
        id: 7,
        title: 'Mẫu báo cáo tiến độ dự án',
        description: 'Template PowerPoint chuyên nghiệp để báo cáo tiến độ dự án xây dựng với biểu đồ và dashboard.',
        category: 'Biểu mẫu',
        format: 'PPTX',
        size: '3.2 MB',
        downloads: 890,
        featured: false,
        icon: 'slideshow',
        color: 'text-orange-400'
    },
    {
        id: 8,
        title: 'Checklist an toàn lao động',
        description: 'Danh mục kiểm tra an toàn lao động trên công trường theo tiêu chuẩn TCVN và OSHA.',
        category: 'An toàn',
        format: 'PDF',
        size: '750 KB',
        downloads: 1230,
        featured: false,
        icon: 'health_and_safety',
        color: 'text-red-400'
    },
    {
        id: 9,
        title: 'Bảng tra cốt thép theo TCVN',
        description: 'Bảng tra nhanh diện tích cốt thép, trọng lượng và khoảng cách bố trí theo tiêu chuẩn Việt Nam.',
        category: 'Kỹ thuật',
        format: 'PDF',
        size: '420 KB',
        downloads: 2100,
        featured: false,
        icon: 'grid_on',
        color: 'text-slate-400'
    }
];

const categories = ['Tất cả', 'Dự toán', 'Biểu mẫu', 'BIM', 'Pháp lý', 'Công cụ', 'An toàn', 'Kỹ thuật'];

const Tools: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = tools.filter(tool => {
        const matchesCategory = selectedCategory === 'Tất cả' || tool.category === selectedCategory;
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredTools = tools.filter(t => t.featured);

    return (
        <div className="min-h-screen bg-navy-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-primary/20 py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                            <span className="material-symbols-outlined text-lg">folder_open</span>
                            Thư viện công cụ miễn phí
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Công cụ & Biểu mẫu <span className="text-primary">Xây dựng</span>
                        </h1>
                        <p className="text-lg text-slate-400 mb-8">
                            Tải miễn phí các mẫu dự toán, checklist, hợp đồng, và công cụ tính toán phục vụ công việc quản lý dự án xây dựng.
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm công cụ, biểu mẫu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-navy-800 border border-navy-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 border-b border-navy-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <p className="text-3xl font-bold text-white">{tools.length}+</p>
                            <p className="text-sm text-slate-400">Công cụ & Biểu mẫu</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">{tools.reduce((acc, t) => acc + t.downloads, 0).toLocaleString()}</p>
                            <p className="text-sm text-slate-400">Lượt tải xuống</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">{categories.length - 1}</p>
                            <p className="text-sm text-slate-400">Danh mục</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">100%</p>
                            <p className="text-sm text-slate-400">Miễn phí</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Tools */}
            <section className="py-12 bg-navy-950/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Star className="w-5 h-5 text-secondary" />
                        <h2 className="text-xl font-bold text-white">Được tải nhiều nhất</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredTools.map(tool => (
                            <div key={tool.id} className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl p-6 border border-navy-700 hover:border-primary/50 transition-all group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-navy-950 flex items-center justify-center ${tool.color} border border-navy-700`}>
                                        <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
                                    </div>
                                    <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs font-bold rounded-full">
                                        {tool.downloads.toLocaleString()} tải
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {tool.title}
                                </h3>
                                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{tool.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className="px-2 py-1 bg-navy-950 rounded border border-navy-700">{tool.format}</span>
                                        <span>{tool.size}</span>
                                    </div>
                                    <button className="flex items-center gap-1 text-primary text-sm font-bold hover:text-white transition-colors">
                                        <Download className="w-4 h-4" />
                                        Tải về
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* All Tools */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Category Filter */}
                    <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
                        <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                                        ? 'bg-primary text-white'
                                        : 'bg-navy-800 text-slate-400 hover:text-white border border-navy-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTools.map(tool => (
                            <div key={tool.id} className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group">
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl bg-navy-950 flex items-center justify-center ${tool.color} border border-navy-700 flex-shrink-0`}>
                                            <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-bold text-white mb-1 group-hover:text-primary transition-colors line-clamp-2">
                                                {tool.title}
                                            </h3>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded bg-navy-950 ${tool.color} border border-navy-700`}>
                                                {tool.category}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{tool.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-navy-700">
                                        <div className="flex items-center gap-3 text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <FileText className="w-3 h-3" /> {tool.format}
                                            </span>
                                            <span>{tool.size}</span>
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-3 h-3" /> {tool.downloads.toLocaleString()}
                                            </span>
                                        </div>
                                        <button className="flex items-center gap-1 bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                                            <Download className="w-3 h-3" />
                                            Tải
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTools.length === 0 && (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-6xl text-navy-700 mb-4">search_off</span>
                            <p className="text-slate-400">Không tìm thấy công cụ phù hợp. Thử từ khóa khác?</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Cần công cụ tùy chỉnh cho doanh nghiệp?
                    </h2>
                    <p className="text-white/80 mb-8">
                        Chúng tôi có thể xây dựng các template, dashboard và công cụ tối ưu cho quy trình của bạn.
                    </p>
                    <a href="#/contact" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                        Liên hệ tư vấn
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Tools;
