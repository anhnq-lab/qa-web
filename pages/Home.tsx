import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, ArrowRight, Activity, Users, Award, Headphones, Calendar, Clock, ArrowRightCircle, Mail } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#020617] via-navy-900 to-[#1e3a8a] text-white pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-sm text-blue-100">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow"></span>
                Giải pháp công nghệ 4.0
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Chuyển đổi số <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-primary">Ngành Xây dựng</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                Tư vấn giải pháp BIM & AI tiên tiến giúp tối ưu hóa quy trình, giảm thiểu rủi ro và tiết kiệm chi phí cho doanh nghiệp xây dựng Việt Nam.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/contact" className="bg-secondary hover:bg-secondary-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-amber-500/20 transform hover:-translate-y-1">
                  Tư vấn miễn phí
                </Link>
                <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all backdrop-blur-sm flex items-center gap-2 border border-white/10">
                  <PlayCircle className="w-6 h-6" />
                  Xem demo
                </button>
              </div>
              
              <div className="flex items-center gap-4 pt-6 text-sm text-slate-400">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <img key={i} src={`https://picsum.photos/100/100?random=${i}`} alt="user" className="w-8 h-8 rounded-full border-2 border-navy-900 object-cover" />
                   ))}
                </div>
                <p>Được tin dùng bởi 500+ kỹ sư</p>
              </div>
            </div>
            
            <div className="relative lg:h-[500px] flex items-center justify-center">
               <div className="relative w-full aspect-square max-w-lg group">
                  <div className="absolute inset-0 bg-primary rounded-full filter blur-[100px] opacity-20 animate-pulse-slow"></div>
                  <div className="w-full h-full bg-navy-800 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src="https://picsum.photos/800/800?random=10" 
                      alt="Dashboard Visualization" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent flex items-end p-8">
                       <div className="bg-navy-800/80 backdrop-blur-md p-4 rounded-xl border border-navy-700 w-full">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Tiến độ dự án</span>
                            <span className="text-xs font-bold text-green-400">Correct +2.4%</span>
                          </div>
                          <div className="w-full bg-navy-950 rounded-full h-2">
                             <div className="bg-gradient-to-r from-primary to-cyan-300 h-2 rounded-full w-[75%]"></div>
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
        
        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-auto text-navy-900 fill-current" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-navy-800 rounded-2xl shadow-xl border border-navy-700 p-8 lg:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-navy-700/50">
          {[
            { icon: 'apartment', num: '500+', label: 'Dự án' },
            { icon: 'groups', num: '50+', label: 'Khách hàng' },
            { icon: 'workspace_premium', num: '10', label: 'Năm kinh nghiệm' },
            { icon: 'support_agent', num: '24/7', label: 'Hỗ trợ kỹ thuật' }
          ].map((stat, idx) => (
             <div key={idx} className="flex flex-col items-center text-center group pl-4 first:pl-0">
                <div className="bg-navy-900 p-3 rounded-full mb-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary border border-navy-700">
                  <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                </div>
                <h3 className="text-3xl font-bold text-white">{stat.num}</h3>
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wide mt-1">{stat.label}</p>
             </div>
          ))}
        </div>
      </div>

      {/* Featured Blog Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-navy-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Bài viết nổi bật</h2>
            <p className="text-slate-400 max-w-xl">Cập nhật những xu hướng công nghệ mới nhất trong ngành xây dựng, từ BIM, AI đến IoT và Big Data.</p>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-1 text-primary font-semibold hover:text-sky-300 transition-colors">
            Xem tất cả bài viết
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             {
               title: 'Ứng dụng AI trong quản lý dự án: Giảm thiểu rủi ro và tối ưu chi phí',
               desc: 'Khám phá cách trí tuệ nhân tạo đang thay đổi cách chúng ta quản lý tiến độ.',
               tag: 'AI trong Xây dựng',
               color: 'bg-primary',
               date: '12 Tháng 5, 2023',
               readTime: '5 phút đọc',
               img: 101
             },
             {
               title: 'Lợi ích của BIM 5D: Từ lý thuyết đến thực tiễn',
               desc: 'Phân tích chi tiết về mô hình thông tin xây dựng 5D và cách nó giúp kiểm soát dòng tiền.',
               tag: 'Kiến thức BIM',
               color: 'bg-purple-600',
               date: '10 Tháng 5, 2023',
               readTime: '8 phút đọc',
               img: 102
             },
             {
               title: 'Xu hướng chuyển đổi số ngành xây dựng Việt Nam 2024',
               desc: 'Báo cáo mới nhất về tình hình áp dụng công nghệ số tại các doanh nghiệp xây dựng lớn.',
               tag: 'Tin tức',
               color: 'bg-teal-600',
               date: '08 Tháng 5, 2023',
               readTime: '3 phút đọc',
               img: 103
             }
           ].map((post, i) => (
              <article key={i} className="bg-navy-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group flex flex-col h-full border border-navy-700">
                 <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(https://picsum.photos/600/400?random=${post.img})` }}></div>
                    <div className={`absolute top-4 left-4 ${post.color} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide`}>
                      {post.tag}
                    </div>
                 </div>
                 <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                       <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                       <span>•</span>
                       <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    <Link to={`/blog/${i}`} className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                      {post.desc}
                    </p>
                    <Link to={`/blog/${i}`} className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      Xem thêm
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                 </div>
              </article>
           ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Dịch vụ của chúng tôi</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Giải pháp toàn diện cho mọi dự án</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Tư vấn BIM', icon: 'model_training', color: 'text-primary', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
              { title: 'Giải pháp AI', icon: 'smart_toy', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
              { title: 'Quản lý dữ liệu', icon: 'dataset', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
            ].map((service, idx) => (
              <div key={idx} className="bg-navy-800 p-8 rounded-2xl shadow-sm border border-navy-700 hover:border-primary/50 transition-all group">
                 <div className={`w-14 h-14 ${service.bg} ${service.color} rounded-xl flex items-center justify-center mb-6 border ${service.border} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                 </div>
                 <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Mô tả ngắn gọn về dịch vụ này và cách nó mang lại giá trị cho khách hàng của chúng tôi.
                 </p>
                 <Link to="/contact" className={`${service.color} font-semibold text-sm hover:underline`}>Tìm hiểu thêm</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-navy-800 border-y border-navy-700">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#38bdf8 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-navy-700">
             <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Đăng ký nhận tin tức công nghệ mới nhất</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto">
             Nhận thông tin cập nhật hàng tuần về xu hướng BIM, AI và chuyển đổi số trong ngành xây dựng trực tiếp vào hộp thư của bạn.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email của bạn..." 
              className="flex-1 px-6 py-4 rounded-xl bg-navy-900 border border-navy-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-navy-900/80 transition-all"
            />
            <button type="submit" className="px-8 py-4 bg-secondary hover:bg-secondary-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-900/20 whitespace-nowrap">
              Đăng ký ngay
            </button>
          </form>
          <p className="text-slate-500 text-xs mt-4">Chúng tôi cam kết không spam. Hủy đăng ký bất cứ lúc nào.</p>
        </div>
      </section>
    </>
  );
};

export default Home;