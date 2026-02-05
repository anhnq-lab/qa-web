import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, MapPin, Phone, Mail, Facebook, Linkedin, Instagram, Ruler } from 'lucide-react';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-300 bg-navy-900 selection:bg-primary selection:text-navy-950">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-navy-900/90 backdrop-blur shadow-sm border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Ruler className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">AI Construction</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors">Trang chủ</Link>
              <Link to="/blog" className="text-slate-300 hover:text-white font-medium transition-colors">Blog</Link>
              <Link to="/tools" className="text-slate-300 hover:text-white font-medium transition-colors">Công cụ</Link>
              <Link to="/contact" className="text-slate-300 hover:text-white font-medium transition-colors">Liên hệ</Link>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => navigate('/admin')}
                className="text-sm font-medium text-slate-400 hover:text-primary transition-colors"
              >
                Đăng nhập
              </button>
              <Link to="/contact" className="bg-secondary hover:bg-secondary-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2">
                <span>Liên hệ</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-navy-800 border-t border-navy-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-navy-700" onClick={() => setIsMobileMenuOpen(false)}>Trang chủ</Link>
              <Link to="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-navy-700" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              <Link to="/tools" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-navy-700" onClick={() => setIsMobileMenuOpen(false)}>Công cụ & Biểu mẫu</Link>
              <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-navy-700" onClick={() => setIsMobileMenuOpen(false)}>Liên hệ</Link>
              <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-navy-700" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-navy-700 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-8 bg-primary/10 rounded flex items-center justify-center text-primary">
                  <Ruler className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-white">AI Construction</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Đối tác tin cậy trong hành trình chuyển đổi số của doanh nghiệp xây dựng Việt Nam. Tiên phong ứng dụng công nghệ để kiến tạo tương lai.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all border border-navy-700">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all border border-navy-700">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all border border-navy-700">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6">Liên kết nhanh</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors">Về chúng tôi</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors">Dịch vụ tư vấn</Link></li>
                <li><Link to="/blog" className="text-slate-400 hover:text-primary transition-colors">Dự án tiêu biểu</Link></li>
                <li><Link to="/blog" className="text-slate-400 hover:text-primary transition-colors">Blog công nghệ</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors">Tuyển dụng</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6">Dịch vụ</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors">Tư vấn BIM/Revit</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors">Giải pháp AI & Big Data</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors">Đào tạo nhân sự</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors">Quét 3D Laser Scanning</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-6">Liên hệ</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <span>Tầng 12, Tòa nhà TechTower, Quận Cầu Giấy, Hà Nội</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>(84) 987 654 321</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>contact@aiconstruct.vn</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © 2024 AI Construction Portal. Bảo lưu mọi quyền.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;