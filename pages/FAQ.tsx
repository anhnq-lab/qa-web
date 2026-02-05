import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqs: FAQItem[] = [
    // BIM
    {
        category: 'BIM',
        question: 'BIM là gì và tại sao doanh nghiệp xây dựng cần triển khai?',
        answer: 'BIM (Building Information Modeling) là phương pháp thiết kế và quản lý dự án xây dựng dựa trên mô hình 3D thông minh chứa đầy đủ thông tin. Doanh nghiệp cần BIM để: giảm 30% sai sót thiết kế, tiết kiệm 20% chi phí dự án, tăng năng suất phối hợp giữa các bên, và đáp ứng yêu cầu pháp lý ngày càng cao tại Việt Nam.',
    },
    {
        category: 'BIM',
        question: 'Doanh nghiệp nhỏ có nên triển khai BIM không?',
        answer: 'Hoàn toàn nên! BIM không chỉ dành cho các dự án lớn. Doanh nghiệp nhỏ có thể bắt đầu với BIM Level 1 (mô hình 3D cơ bản) với chi phí thấp. Quan trọng là xây dựng lộ trình phù hợp với quy mô và ngân sách. Chúng tôi có các gói tư vấn dành riêng cho SME.',
    },
    {
        category: 'BIM',
        question: 'Thời gian triển khai BIM mất bao lâu?',
        answer: 'Tùy thuộc vào quy mô và mục tiêu: BIM Level 1 (3-6 tháng), BIM Level 2 (6-12 tháng), BIM Level 3 (12-24 tháng). Giai đoạn pilot project thường mất 2-3 tháng để đánh giá hiệu quả trước khi triển khai rộng.',
    },
    // Dịch vụ
    {
        category: 'Dịch vụ',
        question: 'Chi phí tư vấn triển khai BIM khoảng bao nhiêu?',
        answer: 'Chi phí phụ thuộc vào scope dự án và mức độ hỗ trợ cần thiết. Chúng tôi có các gói từ tư vấn cơ bản (đánh giá hiện trạng, lập kế hoạch) đến triển khai toàn diện (đào tạo, pilot, hỗ trợ kỹ thuật). Liên hệ để nhận báo giá chi tiết phù hợp với nhu cầu của bạn.',
    },
    {
        category: 'Dịch vụ',
        question: 'Có hỗ trợ sau triển khai không?',
        answer: 'Có, chúng tôi cam kết hỗ trợ kỹ thuật 24/7 trong suốt thời gian triển khai và các gói bảo hành sau dự án. Đội ngũ tư vấn luôn sẵn sàng giải đáp thắc mắc, xử lý sự cố, và hỗ trợ cập nhật khi có yêu cầu mới.',
    },
    // Phần mềm
    {
        category: 'Phần mềm',
        question: 'Nên chọn phần mềm BIM nào: Revit, ArchiCAD hay Tekla?',
        answer: 'Mỗi phần mềm có thế mạnh riêng: Revit (phổ biến nhất, đa năng), ArchiCAD (mạnh về kiến trúc), Tekla (chuyên kết cấu thép). Việc lựa chọn phụ thuộc vào: lĩnh vực chính của doanh nghiệp, đối tác đang dùng gì, và ngân sách. Chúng tôi sẽ tư vấn lựa chọn phù hợp nhất.',
    },
    {
        category: 'Phần mềm',
        question: 'CDE (Common Data Environment) là gì?',
        answer: 'CDE là môi trường dữ liệu chung - nền tảng lưu trữ và chia sẻ thông tin dự án giữa các bên. CDE giúp: quản lý phiên bản tài liệu, kiểm soát truy cập, theo dõi tiến độ, và tránh xung đột dữ liệu. Đây là thành phần bắt buộc trong BIM Level 2.',
    },
    // Pháp lý
    {
        category: 'Pháp lý',
        question: 'Quy định pháp luật Việt Nam về BIM hiện nay như thế nào?',
        answer: 'Nghị định 15/2021/NĐ-CP yêu cầu áp dụng BIM cho công trình cấp I, II sử dụng vốn đầu tư công từ 2023. Thông tư 10/2023 hướng dẫn chi tiết về BIM trong quản lý dự án. Xu hướng sẽ mở rộng bắt buộc cho nhiều loại công trình hơn trong tương lai.',
    },
    {
        category: 'Pháp lý',
        question: 'Nghị định 111 và 175 về quản lý dự án ảnh hưởng gì?',
        answer: 'ND111/2024 quy định về quản lý chi phí đầu tư xây dựng, yêu cầu minh bạch trong dự toán. ND175 về quản lý dự án nhấn mạnh vai trò công nghệ số. Cả hai đều tạo động lực cho doanh nghiệp số hóa quy trình quản lý dự án.',
    },
    // Đào tạo
    {
        category: 'Đào tạo',
        question: 'Có các khóa đào tạo BIM cho người mới bắt đầu không?',
        answer: 'Có! Chúng tôi có các khóa: Revit cơ bản (40 giờ), BIM Coordinator (60 giờ), BIM Manager (80 giờ). Các khóa bao gồm lý thuyết + thực hành trên dự án thực tế. Có thể đào tạo in-house hoặc online theo yêu cầu.',
    },
    {
        category: 'Đào tạo',
        question: 'Sau đào tạo có được cấp chứng chỉ không?',
        answer: 'Có, học viên hoàn thành khóa học sẽ được cấp chứng chỉ hoàn thành. Ngoài ra, chúng tôi hỗ trợ và hướng dẫn thi các chứng chỉ quốc tế như Autodesk Certified Professional.',
    },
];

const categories = ['Tất cả', 'BIM', 'Dịch vụ', 'Phần mềm', 'Pháp lý', 'Đào tạo'];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = selectedCategory === 'Tất cả' || faq.category === selectedCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-navy-900">
            <SEO
                title="Câu hỏi thường gặp"
                description="Giải đáp các thắc mắc về BIM, chuyển đổi số, phần mềm xây dựng, và dịch vụ tư vấn. Tìm câu trả lời cho doanh nghiệp của bạn."
            />

            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-navy-950 via-navy-900 to-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                        <HelpCircle className="w-4 h-4" />
                        FAQ
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Câu hỏi thường gặp
                    </h1>
                    <p className="text-lg text-slate-400 mb-8">
                        Tìm câu trả lời cho các thắc mắc về BIM, chuyển đổi số, và dịch vụ của chúng tôi.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm câu hỏi..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-navy-800 border border-navy-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-6 border-b border-navy-800 sticky top-16 bg-navy-900/95 backdrop-blur-sm z-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
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
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        {filteredFAQs.map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-navy-800 rounded-xl border transition-all ${openIndex === index ? 'border-primary/40' : 'border-navy-700'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full p-6 flex items-start justify-between gap-4 text-left"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="px-2 py-0.5 bg-navy-950 text-xs font-medium text-primary rounded border border-navy-700 flex-shrink-0 mt-1">
                                            {faq.category}
                                        </span>
                                        <h3 className="text-white font-semibold text-lg">{faq.question}</h3>
                                    </div>
                                    <div className="flex-shrink-0 text-slate-400">
                                        {openIndex === index ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </div>
                                </button>

                                {openIndex === index && (
                                    <div className="px-6 pb-6 pt-0">
                                        <div className="pl-[72px] text-slate-400 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-12">
                            <HelpCircle className="w-16 h-16 text-navy-700 mx-auto mb-4" />
                            <p className="text-slate-400">Không tìm thấy câu hỏi phù hợp. Thử từ khóa khác?</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-navy-950/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-navy-800 rounded-2xl p-8 border border-navy-700">
                        <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Không tìm thấy câu trả lời?
                        </h2>
                        <p className="text-slate-400 mb-6">
                            Liên hệ trực tiếp với chúng tôi để được tư vấn chi tiết hơn.
                        </p>
                        <Link to="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-colors">
                            Liên hệ tư vấn
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
