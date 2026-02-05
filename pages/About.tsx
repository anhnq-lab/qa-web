import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Target, Users, Zap, Heart, BookOpen, Wrench, Globe, ArrowRight, Sparkles, Building2, Brain, Share2, Lightbulb } from 'lucide-react';
import SEO from '../components/SEO';
import AIAvatar from '../components/AIAvatar';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-navy-900">
            <SEO
                title="Về AI Construction"
                description="AI Construction - Nền tảng chia sẻ kiến thức, công cụ và kết nối cộng đồng xây dựng trong kỷ nguyên 4.0. Cùng nhau phát triển ngành xây dựng Việt Nam."
            />

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-primary/10"></div>
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* AI Avatar */}
                        <div className="relative flex-shrink-0">
                            <AIAvatar size={256} />
                            <div className="absolute -bottom-3 -right-3 bg-secondary text-navy-950 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg z-10">
                                <Sparkles className="w-4 h-4" />
                                AI-Powered
                            </div>
                        </div>

                        {/* Info */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                                <Building2 className="w-4 h-4" />
                                Nền tảng Chuyển đổi số Xây dựng
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                AI <span className="text-primary">Construction</span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-6 max-w-xl">
                                Trợ lý AI kết nối cộng đồng, chia sẻ kiến thức và công cụ để cùng nhau phát triển ngành xây dựng trong kỷ nguyên 4.0.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                <Link to="/tools" className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-colors">
                                    <Wrench className="w-5 h-5" />
                                    Khám phá công cụ
                                </Link>
                                <Link to="/blog" className="flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-6 py-3 rounded-xl font-bold transition-colors border border-navy-700">
                                    <BookOpen className="w-5 h-5" />
                                    Đọc bài viết
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 bg-navy-950/50 border-y border-navy-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                        <Target className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Sứ mệnh của chúng tôi</h2>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
                        <strong className="text-white">Kết nối</strong> cộng đồng xây dựng, <strong className="text-white">chia sẻ</strong> kiến thức chuyên môn, và cung cấp <strong className="text-white">công cụ bổ ích</strong> để mọi người cùng nhau phát triển ngành xây dựng Việt Nam trong kỷ nguyên công nghiệp 4.0.
                    </p>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Chúng tôi làm gì?</h2>
                        <p className="text-slate-400">AI Construction hỗ trợ bạn trên hành trình chuyển đổi số</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <BookOpen className="w-8 h-8" />,
                                title: 'Chia sẻ kiến thức',
                                description: 'Bài viết chuyên sâu về BIM, pháp luật xây dựng, quản lý dự án, và xu hướng công nghệ mới nhất.',
                            },
                            {
                                icon: <Wrench className="w-8 h-8" />,
                                title: 'Cung cấp công cụ',
                                description: 'Biểu mẫu, template, checklist miễn phí giúp bạn làm việc hiệu quả hơn mỗi ngày.',
                            },
                            {
                                icon: <Share2 className="w-8 h-8" />,
                                title: 'Kết nối cộng đồng',
                                description: 'Xây dựng mạng lưới chuyên gia, doanh nghiệp, và những người đam mê công nghệ xây dựng.',
                            },
                            {
                                icon: <Brain className="w-8 h-8" />,
                                title: 'Tư vấn AI',
                                description: 'Trợ lý AI sẵn sàng giải đáp thắc mắc về BIM, pháp lý, và chuyển đổi số 24/7.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-navy-800 rounded-xl p-6 border border-navy-700 hover:border-primary/40 transition-all group text-center">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-navy-950 text-primary mb-4 group-hover:scale-110 transition-transform border border-navy-700">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-navy-950/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">Giá trị cốt lõi</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Heart className="w-10 h-10" />,
                                title: 'Cộng đồng là trên hết',
                                description: 'Mọi nội dung và công cụ đều được tạo ra với mục tiêu phục vụ cộng đồng xây dựng Việt Nam.',
                                color: 'text-red-400',
                            },
                            {
                                icon: <Lightbulb className="w-10 h-10" />,
                                title: 'Không ngừng học hỏi',
                                description: 'Công nghệ thay đổi từng ngày. Chúng tôi cam kết cập nhật kiến thức mới nhất cho bạn.',
                                color: 'text-yellow-400',
                            },
                            {
                                icon: <Globe className="w-10 h-10" />,
                                title: 'Mở và minh bạch',
                                description: 'Chia sẻ kiến thức miễn phí, không giấu giếm. Cùng nhau phát triển, cùng nhau thành công.',
                                color: 'text-green-400',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-navy-800 rounded-2xl p-8 border border-navy-700 text-center">
                                <div className={`${item.color} mb-4 inline-block`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '500+', label: 'Bài viết chất lượng', icon: 'article' },
                            { value: '50+', label: 'Công cụ miễn phí', icon: 'construction' },
                            { value: '10K+', label: 'Người theo dõi', icon: 'groups' },
                            { value: '24/7', label: 'AI hỗ trợ', icon: 'smart_toy' },
                        ].map((stat, i) => (
                            <div key={i} className="group">
                                <span className="material-symbols-outlined text-4xl text-primary mb-3 block group-hover:scale-110 transition-transform">{stat.icon}</span>
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Bot className="w-16 h-16 text-white/80 mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Sẵn sàng bắt đầu hành trình?
                    </h2>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Khám phá kho tàng kiến thức, công cụ miễn phí, và trò chuyện với AI để giải đáp mọi thắc mắc về ngành xây dựng.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/blog" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                            Khám phá ngay
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                            <Users className="w-5 h-5" />
                            Liên hệ hợp tác
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
