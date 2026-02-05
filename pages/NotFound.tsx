import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-navy-900 px-4">
            <div className="text-center max-w-lg">
                {/* 404 Illustration */}
                <div className="relative mb-8">
                    <div className="text-[180px] md:text-[220px] font-black text-navy-800 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-navy-800 rounded-2xl p-6 border border-navy-700 shadow-2xl">
                            <FileQuestion className="w-16 h-16 text-primary animate-pulse" />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Không tìm thấy trang
                </h1>
                <p className="text-slate-400 mb-8 text-lg">
                    Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold transition-colors"
                    >
                        <Home className="w-5 h-5" />
                        Về trang chủ
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-6 py-3 rounded-xl font-bold transition-colors border border-navy-700"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-navy-800">
                    <p className="text-slate-500 text-sm mb-4">Hoặc thử các trang này:</p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {[
                            { label: 'Blog', path: '/blog' },
                            { label: 'Dịch vụ', path: '/services' },
                            { label: 'Công cụ', path: '/tools' },
                            { label: 'Liên hệ', path: '/contact' },
                        ].map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white rounded-lg text-sm font-medium transition-colors border border-navy-700"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
