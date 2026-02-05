import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Building2, Users, CheckCircle, ArrowRight, Linkedin, Mail, Phone, MapPin, Calendar, Target, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-navy-900">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-primary/10"></div>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Profile Image */}
                        <div className="relative flex-shrink-0">
                            <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg">
                                <Award className="w-4 h-4" />
                                10+ năm kinh nghiệm
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                                <Building2 className="w-4 h-4" />
                                Sales Representative @ CIC
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Nguyễn Quốc Anh
                            </h1>
                            <p className="text-xl text-slate-400 mb-6">
                                Chuyên gia Chuyển đổi số ngành Xây dựng | Tư vấn BIM & Công nghệ
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <a href="mailto:anhnq@cic.com" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                                    <Mail className="w-4 h-4" /> anhnq@cic.com
                                </a>
                                <a href="tel:+84999999999" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                                    <Phone className="w-4 h-4" /> 0999 999 999
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-navy-950/50 border-y border-navy-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '10+', label: 'Năm kinh nghiệm', icon: 'history' },
                            { value: '50+', label: 'Dự án tư vấn', icon: 'architecture' },
                            { value: '100+', label: 'Doanh nghiệp hỗ trợ', icon: 'business' },
                            { value: '500+', label: 'Bài viết chia sẻ', icon: 'article' },
                        ].map((stat, i) => (
                            <div key={i} className="group">
                                <span className="material-symbols-outlined text-3xl text-primary mb-2 block group-hover:scale-110 transition-transform">{stat.icon}</span>
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Story */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Target className="w-6 h-6 text-primary" />
                                Câu chuyện của tôi
                            </h2>
                            <div className="prose prose-invert max-w-none text-slate-400 space-y-4">
                                <p>
                                    Với hơn 10 năm kinh nghiệm trong ngành xây dựng và công nghệ thông tin, tôi đã đồng hành cùng hàng trăm doanh nghiệp trong hành trình chuyển đổi số.
                                </p>
                                <p>
                                    Từ một kỹ sư xây dựng, tôi nhận ra rằng công nghệ chính là chìa khóa để nâng cao năng suất, giảm thiểu rủi ro và tạo lợi thế cạnh tranh cho các doanh nghiệp xây dựng Việt Nam.
                                </p>
                                <p>
                                    Hiện tại, tôi đang làm việc tại <strong className="text-white">CIC - Trung tâm Tin học Xây dựng</strong>, nơi tôi có cơ hội tiếp cận những công nghệ tiên tiến nhất và mang chúng đến gần hơn với các đối tác.
                                </p>
                            </div>
                        </div>

                        {/* Mission */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Lightbulb className="w-6 h-6 text-secondary" />
                                Sứ mệnh
                            </h2>
                            <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
                                <blockquote className="text-lg text-slate-300 italic mb-4">
                                    "Giúp doanh nghiệp xây dựng Việt Nam chuyển đổi số thành công, nâng cao năng lực cạnh tranh trên thị trường quốc tế."
                                </blockquote>
                                <div className="space-y-3">
                                    {[
                                        'Tư vấn lộ trình BIM phù hợp với quy mô doanh nghiệp',
                                        'Đào tạo & chuyển giao công nghệ cho đội ngũ',
                                        'Hỗ trợ triển khai các giải pháp phần mềm xây dựng',
                                        'Cập nhật xu hướng công nghệ & pháp luật mới nhất',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-400">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise */}
            <section className="py-16 bg-navy-950/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Lĩnh vực chuyên môn</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: 'view_in_ar',
                                title: 'BIM & Digital Twin',
                                description: 'Tư vấn triển khai BIM từ Level 1-3, tích hợp Digital Twin cho vận hành tòa nhà.',
                                skills: ['Autodesk Revit', 'Navisworks', 'BIM 360', 'Forge API']
                            },
                            {
                                icon: 'gavel',
                                title: 'Pháp lý Xây dựng',
                                description: 'Tư vấn tuân thủ các quy định pháp luật về xây dựng, đấu thầu, quản lý dự án.',
                                skills: ['Nghị định 15', 'ND111/175', 'TCVN', 'ISO 19650']
                            },
                            {
                                icon: 'memory',
                                title: 'Chuyển đổi số',
                                description: 'Xây dựng lộ trình số hóa, đào tạo nhân sự, triển khai phần mềm quản lý.',
                                skills: ['ERP', 'Project Management', 'CDE', 'AI/ML']
                            }
                        ].map((area, i) => (
                            <div key={i} className="bg-navy-800 rounded-xl p-6 border border-navy-700 hover:border-primary/40 transition-all group">
                                <span className="material-symbols-outlined text-4xl text-primary mb-4 block group-hover:scale-110 transition-transform">{area.icon}</span>
                                <h3 className="text-lg font-bold text-white mb-2">{area.title}</h3>
                                <p className="text-slate-400 text-sm mb-4">{area.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {area.skills.map(skill => (
                                        <span key={skill} className="px-2 py-1 bg-navy-950 text-xs text-slate-400 rounded border border-navy-700">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
                        <Calendar className="w-6 h-6 text-primary" />
                        Hành trình sự nghiệp
                    </h2>

                    <div className="relative">
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-navy-700"></div>

                        {[
                            { year: '2024 - Nay', role: 'Sales Representative', company: 'CIC - Trung tâm Tin học Xây dựng', highlight: true },
                            { year: '2020 - 2024', role: 'BIM Manager', company: 'Công ty XYZ Construction', highlight: false },
                            { year: '2016 - 2020', role: 'BIM Coordinator', company: 'Tập đoàn ABC', highlight: false },
                            { year: '2014 - 2016', role: 'Kỹ sư Xây dựng', company: 'Công ty DEF', highlight: false },
                        ].map((item, i) => (
                            <div key={i} className={`relative pl-12 md:pl-0 mb-8 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}`}>
                                <div className={`absolute left-0 md:left-auto ${i % 2 === 0 ? 'md:right-[-8px]' : 'md:left-[-8px]'} top-1 w-4 h-4 rounded-full ${item.highlight ? 'bg-primary' : 'bg-navy-700'} border-4 border-navy-900`}></div>
                                <div className={`bg-navy-800 rounded-xl p-4 border ${item.highlight ? 'border-primary/30' : 'border-navy-700'}`}>
                                    <span className="text-primary text-sm font-bold">{item.year}</span>
                                    <h3 className="text-white font-semibold mt-1">{item.role}</h3>
                                    <p className="text-slate-400 text-sm">{item.company}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Sẵn sàng bắt đầu hành trình chuyển đổi số?
                    </h2>
                    <p className="text-white/80 mb-8">
                        Liên hệ ngay để được tư vấn giải pháp phù hợp với doanh nghiệp của bạn.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                            Liên hệ tư vấn
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                            <Linkedin className="w-5 h-5" />
                            LinkedIn
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
