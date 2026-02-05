import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Clock, Calendar, ArrowRight, User } from 'lucide-react';

const Blog: React.FC = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6">Kiến thức & Xu hướng Công nghệ Xây dựng</h1>
        <div className="border-b border-navy-800 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 min-w-max">
            {['Tất cả', 'BIM & Công nghệ', 'Pháp luật Xây dựng', 'Case Study', 'Quản lý dự án', 'Vật liệu mới'].map((tab, idx) => (
              <button 
                key={idx}
                className={`pb-3 border-b-[3px] font-medium text-sm transition-colors ${idx === 0 ? 'border-primary text-white font-bold' : 'border-transparent text-slate-400 hover:text-primary'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="w-full lg:w-3/4 flex flex-col gap-10">
          
          {/* Featured Post */}
          <Link to="/blog/featured" className="bg-navy-800 rounded-xl shadow-lg border border-navy-700 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto">
                <div className="absolute top-4 left-4 bg-primary text-navy-950 text-xs font-extrabold px-3 py-1 rounded-full z-10 shadow-lg">
                  Bài viết nổi bật
                </div>
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" style={{ backgroundImage: 'url(https://picsum.photos/800/600?random=20)' }}>
                  <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Quản lý dự án</span>
                  <span className="text-slate-400 text-xs">• 12 Tháng 10, 2023</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                  Ứng dụng AI trong quản lý tiến độ thi công tại các dự án cao tầng Việt Nam
                </h2>
                <p className="text-slate-400 text-base mb-6 line-clamp-3">
                  Khám phá cách trí tuệ nhân tạo đang thay đổi cuộc chơi trong việc tối ưu hóa nguồn lực, dự báo rủi ro chậm tiến độ và giảm thiểu lãng phí.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3">
                    <img src="https://picsum.photos/50/50?random=1" alt="Author" className="size-8 rounded-full border-2 border-navy-700" />
                    <span className="text-sm font-medium text-slate-200">Nguyễn Văn A</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 5 phút đọc
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Latest Posts Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">feed</span>
                Bài viết mới nhất
              </h3>
              <Link to="/blog" className="text-primary text-sm font-bold hover:text-white transition-colors flex items-center">
                Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Digital Twin: Bản sao số trong vận hành tòa nhà', cat: 'BIM & Công nghệ', color: 'text-primary border-navy-700' },
                { title: 'Những điểm mới trong Nghị định 15/2021/NĐ-CP', cat: 'Pháp luật', color: 'text-rose-400 border-navy-700' },
                { title: 'Thành công của Coteccons khi áp dụng BIM Level 2', cat: 'Case Study', color: 'text-amber-400 border-navy-700' },
                { title: 'Bê tông tự phục hồi: Tương lai xây dựng?', cat: 'Vật liệu mới', color: 'text-teal-400 border-navy-700' },
                { title: 'Kỹ năng mềm cần thiết cho Project Manager', cat: 'Quản lý dự án', color: 'text-indigo-400 border-navy-700' },
                { title: 'Big Data trong xây dựng: Biến dữ liệu thô thành vàng', cat: 'Công nghệ', color: 'text-purple-400 border-navy-700' }
              ].map((item, i) => (
                <Link key={i} to={`/blog/${i + 1}`} className="bg-navy-800 rounded-xl shadow-md border border-navy-700 overflow-hidden flex flex-col h-full group hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(https://picsum.photos/400/300?random=${i + 30})` }}></div>
                    <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors"></div>
                    <div className={`absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold ${item.color.split(' ')[0]} border border-navy-700`}>
                      {item.cat}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
                      Mô tả ngắn gọn về bài viết để thu hút người đọc click vào xem chi tiết...
                    </p>
                    <div className="pt-4 border-t border-navy-700 flex items-center justify-between text-xs text-slate-500">
                      <span>Tác giả XYZ</span>
                      <span>{i + 1} ngày trước</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <button className="flex items-center gap-2 px-8 py-3 rounded-xl border border-navy-700 bg-navy-800 hover:bg-navy-700 hover:border-primary font-bold text-sm text-white transition-all shadow-lg">
                Xem thêm bài viết
                <span className="material-symbols-outlined text-base">expand_more</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-8">
          {/* Search Widget */}
          <div className="bg-navy-800 rounded-xl p-5 shadow-lg border border-navy-700">
            <h3 className="font-bold text-white mb-4">Tìm kiếm</h3>
            <div className="relative">
              <input type="text" placeholder="Từ khóa, chủ đề..." className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-navy-600 transition-colors" />
              <button className="absolute right-2 top-2 p-1 text-slate-400 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Popular Posts */}
          <div className="bg-navy-800 rounded-xl p-5 shadow-lg border border-navy-700">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-secondary w-5 h-5" />
              Bài viết phổ biến
            </h3>
            <div className="flex flex-col gap-5">
              {[
                { title: 'Lộ trình BIM cho doanh nghiệp SME', views: '12k' },
                { title: 'Top 5 phần mềm quản lý dự án tốt nhất 2024', views: '8.5k' },
                { title: 'Giải pháp nhà lắp ghép thông minh', views: '6k' },
                { title: 'Hướng dẫn xin cấp phép xây dựng online', views: '5.2k' },
                { title: 'An toàn lao động trong thi công cao tầng', views: '4.8k' }
              ].map((post, i) => (
                <Link key={i} to={`/blog/popular/${i}`} className="group flex gap-3 items-start">
                  <span className="text-2xl font-bold text-navy-700 group-hover:text-primary transition-colors">{i + 1}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="text-xs text-slate-500 mt-1 block">{post.views} lượt xem</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-navy-800 rounded-xl p-5 shadow-lg border border-navy-700">
            <h3 className="font-bold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['#BIM', '#AI', '#Revit', '#Construction4.0', '#Legal', '#Safety', '#GreenBuilding', '#DigitalTwin'].map(tag => (
                <Link key={tag} to={`/blog/tag/${tag}`} className="px-3 py-1.5 bg-navy-950 border border-navy-700 hover:border-primary hover:text-primary text-xs font-medium text-slate-400 rounded-full transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Widget */}
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-6 text-navy-950 text-center shadow-lg shadow-primary/20">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <span className="material-symbols-outlined text-2xl text-white">mail</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">Đăng ký nhận tin</h3>
            <p className="text-white/90 text-sm mb-4">Cập nhật xu hướng công nghệ xây dựng mới nhất hàng tuần.</p>
            <input type="email" placeholder="Email của bạn" className="w-full rounded-lg px-4 py-2 text-sm text-navy-950 border-none mb-3 bg-white/95 focus:bg-white placeholder-navy-600/50" />
            <button className="w-full py-2 bg-navy-950 hover:bg-black text-white rounded-lg text-sm font-bold transition-colors">
              Đăng ký
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Blog;