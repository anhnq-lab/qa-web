import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Building2, Zap, Shield, Award, Clock, Phone, Headphones } from 'lucide-react';

interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    price?: string;
    popular?: boolean;
}

const services: Service[] = [
    {
        id: 'bim-consulting',
        icon: 'view_in_ar',
        title: 'Tư vấn triển khai BIM',
        description: 'Xây dựng lộ trình BIM phù hợp với quy mô và mục tiêu của doanh nghiệp, từ Level 1 đến Level 3.',
        features: [
            'Đánh giá năng lực BIM hiện tại',
            'Xây dựng BIM Execution Plan',
            'Đào tạo đội ngũ BIM Modeler',
            'Hỗ trợ triển khai pilot project',
            'Review và tối ưu quy trình',
        ],
        popular: true,
    },
    {
        id: 'software-solutions',
        icon: 'desktop_windows',
        title: 'Giải pháp phần mềm Chuyển đổi số',
        description: 'Triển khai các phần mềm quản lý dự án, dự toán, và thiết kế hàng đầu cho ngành xây dựng.',
        features: [
            'Phần mềm dự toán xây dựng',
            'Quản lý dự án chuyên nghiệp',
            'Quản lý chất lượng QMS',
            'Hệ thống CDE (Common Data Environment)',
            'Tích hợp API với hệ thống hiện có',
        ],
    },
    {
        id: 'legal-consulting',
        icon: 'gavel',
        title: 'Tư vấn pháp lý xây dựng',
        description: 'Hỗ trợ doanh nghiệp tuân thủ các quy định pháp luật về xây dựng, đấu thầu, quản lý dự án.',
        features: [
            'Tư vấn Nghị định 15/2021',
            'Hỗ trợ hồ sơ đấu thầu',
            'Tuân thủ ND111, ND175',
            'Rà soát hợp đồng xây dựng',
            'Đào tạo cập nhật pháp luật',
        ],
    },
    {
        id: 'training',
        icon: 'school',
        title: 'Đào tạo & Chuyển giao',
        description: 'Các khóa đào tạo chuyên sâu về BIM, phần mềm xây dựng, và kỹ năng quản lý dự án.',
        features: [
            'Revit Architecture/Structure/MEP',
            'Navisworks, BIM 360',
            'Project Management Professional',
            'Đào tạo in-house theo yêu cầu',
            'Cấp chứng chỉ hoàn thành',
        ],
    },
];

const Services: React.FC = () => {
    return (
        <div className="min-h-screen bg-navy-900">
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-primary/10"></div>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
                        <Zap className="w-4 h-4" />
                        Dịch vụ chuyển đổi số
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Giải pháp cho <span className="text-primary">Doanh nghiệp Xây dựng</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                        Từ tư vấn BIM, triển khai phần mềm đến đào tạo nhân sự - chúng tôi đồng hành cùng bạn trong hành trình chuyển đổi số.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/contact" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2">
                            Nhận tư vấn miễn phí
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="tel:+84999999999" className="border border-navy-700 hover:border-primary text-white px-8 py-4 rounded-xl font-bold transition-colors flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            Hotline: 0999 999 999
                        </a>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-8 bg-navy-950/50 border-y border-navy-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: <Users className="w-6 h-6" />, value: '100+', label: 'Doanh nghiệp tin dùng' },
                            { icon: <Building2 className="w-6 h-6" />, value: '50+', label: 'Dự án thành công' },
                            { icon: <Award className="w-6 h-6" />, value: '10+', label: 'Năm kinh nghiệm' },
                            { icon: <Headphones className="w-6 h-6" />, value: '24/7', label: 'Hỗ trợ khách hàng' },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="text-primary">{item.icon}</div>
                                <p className="text-2xl font-bold text-white">{item.value}</p>
                                <p className="text-sm text-slate-400">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className={`bg-navy-800 rounded-2xl p-8 border ${service.popular ? 'border-primary ring-2 ring-primary/20' : 'border-navy-700'} hover:border-primary/50 transition-all group relative`}
                            >
                                {service.popular && (
                                    <div className="absolute -top-3 right-6 bg-secondary text-navy-950 px-3 py-1 rounded-full text-xs font-bold">
                                        Phổ biến nhất
                                    </div>
                                )}

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-xl bg-navy-950 flex items-center justify-center text-primary border border-navy-700 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                                        <p className="text-slate-400 text-sm">{service.description}</p>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-300">
                                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={`/contact?service=${service.id}`}
                                    className={`w-full py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-colors ${service.popular
                                        ? 'bg-primary hover:bg-primary-hover text-white'
                                        : 'bg-navy-950 hover:bg-navy-700 text-white border border-navy-700'
                                        }`}
                                >
                                    Tìm hiểu thêm
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-16 bg-navy-950/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-white text-center mb-12">Quy trình làm việc</h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: '01', icon: 'handshake', title: 'Tư vấn', desc: 'Lắng nghe nhu cầu, đánh giá hiện trạng' },
                            { step: '02', icon: 'description', title: 'Đề xuất', desc: 'Xây dựng giải pháp phù hợp, báo giá' },
                            { step: '03', icon: 'build', title: 'Triển khai', desc: 'Thực hiện theo kế hoạch đã thống nhất' },
                            { step: '04', icon: 'support_agent', title: 'Hỗ trợ', desc: 'Đào tạo, bàn giao và bảo hành' },
                        ].map((item, i) => (
                            <div key={i} className="relative text-center group">
                                <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 hover:border-primary/40 transition-all">
                                    <div className="text-3xl font-black text-navy-700 group-hover:text-primary/30 transition-colors mb-2">{item.step}</div>
                                    <span className="material-symbols-outlined text-3xl text-primary mb-3 block">{item.icon}</span>
                                    <h3 className="text-white font-bold mb-2">{item.title}</h3>
                                    <p className="text-slate-400 text-sm">{item.desc}</p>
                                </div>
                                {i < 3 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 text-navy-700 z-10">
                                        <ArrowRight className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Bạn cần tư vấn giải pháp phù hợp?
                    </h2>
                    <p className="text-white/80 mb-8">
                        Để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí trong vòng 24 giờ.
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                        Liên hệ ngay
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
