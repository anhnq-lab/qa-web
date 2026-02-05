import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Share2, Link as LinkIcon, Bookmark, Check } from 'lucide-react';

const BlogPost: React.FC = () => {
  return (
    <div className="bg-white dark:bg-navy-950 w-full pt-8 pb-10 border-b border-navy-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link to="/" className="text-slate-500 hover:text-primary text-sm font-medium transition-colors">Trang chủ</Link>
          <span className="text-slate-500 text-sm font-medium">/</span>
          <Link to="/blog" className="text-slate-500 hover:text-primary text-sm font-medium transition-colors">Kiến thức BIM</Link>
          <span className="text-slate-500 text-sm font-medium">/</span>
          <span className="text-primary text-sm font-medium">Chuyển đổi số</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-black leading-[1.2] tracking-tight text-white mb-6">
          Ứng dụng AI trong quản lý dự án xây dựng tại Việt Nam
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-slate-400 text-sm mb-8">
          <div className="flex items-center gap-2">
            <img src="https://picsum.photos/50/50?random=1" alt="Author" className="w-8 h-8 rounded-full border border-navy-700" />
            <span className="font-medium text-white">Nguyễn Văn A</span>
          </div>
          <span className="hidden sm:inline opacity-50">•</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>12 Tháng 10, 2023</span>
          </div>
          <span className="hidden sm:inline opacity-50">•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>5 phút đọc</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-[21/9] bg-navy-800 rounded-xl overflow-hidden shadow-lg border border-navy-700 relative mb-3">
          <img src="https://picsum.photos/1200/600?random=15" alt="Construction AI" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent"></div>
        </div>
        <p className="text-center text-sm text-slate-500 mb-12 italic">Mô hình BIM kết hợp AI giúp tối ưu hóa tiến độ thi công</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 justify-center">
          
          {/* Main Content */}
          <article className="w-full lg:max-w-[720px] shrink-0">
            <p className="text-xl text-slate-300 leading-relaxed mb-8 font-medium">
              Ngành xây dựng Việt Nam đang đứng trước ngưỡng cửa của cuộc cách mạng số. Việc tích hợp Trí tuệ nhân tạo (AI) vào quy trình BIM (Building Information Modeling) không còn là xu hướng tương lai, mà là giải pháp cấp thiết để nâng cao hiệu quả và giảm thiểu rủi ro.
            </p>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4 pl-4 border-l-4 border-primary leading-tight">
                Thực trạng chuyển đổi số tại Việt Nam
              </h2>
              <p className="text-lg text-slate-400 leading-8 mb-4">
                Mặc dù BIM đã được quy định trong các dự án đầu tư công, việc áp dụng thực tế vẫn gặp nhiều rào cản. Các doanh nghiệp vừa và nhỏ (SME) thường gặp khó khăn về chi phí bản quyền phần mềm và đào tạo nhân sự. Tuy nhiên, sự xuất hiện của các công cụ AI hỗ trợ thiết kế đang dần thay đổi cuộc chơi.
              </p>
            </div>

            <blockquote className="my-10 p-6 bg-primary/10 rounded-r-xl border-l-4 border-primary">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-primary text-4xl">format_quote</span>
                <div>
                  <p className="text-xl font-medium italic text-slate-200 leading-relaxed mb-2">
                    "BIM không chỉ là phần mềm vẽ 3D, đó là quy trình quản lý thông tin xuyên suốt vòng đời dự án. AI chính là bộ não giúp quy trình đó thông minh hơn."
                  </p>
                  <footer className="text-sm font-bold text-primary">— TS. Trần Minh Tuấn, Viện Kinh tế Xây dựng</footer>
                </div>
              </div>
            </blockquote>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4 pl-4 border-l-4 border-primary leading-tight">
                Lợi ích của việc tích hợp AI vào BIM
              </h2>
              <p className="text-lg text-slate-400 leading-8 mb-6">
                Sự kết hợp giữa AI và BIM mang lại sức mạnh to lớn trong việc dự báo và tối ưu hóa. Dưới đây là ba lợi ích cốt lõi:
              </p>
              
              <div className="grid gap-4">
                {[
                  { title: 'Tự động phát hiện xung đột', desc: 'AI quét toàn bộ mô hình để tìm ra các điểm va chạm giữa hệ thống cơ điện (MEP) và kết cấu.' },
                  { title: 'Dự toán chi phí chính xác', desc: 'Học máy (Machine Learning) phân tích dữ liệu lịch sử để đưa ra các con số dự toán sát với thực tế.' },
                  { title: 'Tối ưu hóa năng lượng', desc: 'Mô phỏng các kịch bản tiêu thụ năng lượng của tòa nhà dựa trên hướng nắng, gió và vật liệu.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-lg bg-navy-800/50 hover:bg-navy-800 transition-colors border border-navy-700/50">
                    <div className="flex-shrink-0 size-8 rounded-full bg-green-900/30 text-green-400 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      <p className="text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-10">
               <img src="https://picsum.photos/800/500?random=18" alt="Engineer" className="w-full rounded-lg shadow-md border border-navy-700 mb-3" />
               <p className="text-center text-sm text-slate-500 italic">Kỹ sư hiện trường sử dụng dữ liệu BIM thời gian thực trên thiết bị di động.</p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 pl-4 border-l-4 border-primary leading-tight">
                Kết luận và Khuyến nghị
              </h2>
              <p className="text-lg text-slate-400 leading-8">
                Việc ứng dụng AI trong quản lý dự án xây dựng không còn là sự lựa chọn mà là con đường tất yếu để nâng cao năng lực cạnh tranh.
              </p>
            </div>

            {/* Author Box */}
            <div className="border-t border-navy-700 pt-8 mt-12">
              <div className="flex flex-col sm:flex-row gap-6 bg-navy-800 p-6 rounded-xl border border-navy-700">
                <div className="flex-shrink-0">
                   <img src="https://picsum.photos/100/100?random=1" alt="Author" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-slate-600 object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">Nguyễn Văn A</h3>
                    <span className="bg-blue-900/40 text-blue-300 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-800">Tác giả</span>
                  </div>
                  <p className="text-primary font-medium text-sm mb-2">Chuyên gia tư vấn cấp cao BIM & Digital Twin</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Với hơn 10 năm kinh nghiệm trong ngành xây dựng và công nghệ thông tin, ông A đã tư vấn chuyển đổi số thành công cho hơn 50 doanh nghiệp.
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 pl-4 border-l border-navy-800">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Mục lục</h4>
              <nav className="flex flex-col gap-3">
                {['Thực trạng chuyển đổi số', 'Lợi ích của tích hợp AI', 'Kết luận và Khuyến nghị'].map((item, i) => (
                   <a key={i} href="#" className="text-sm text-slate-400 hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary pl-2 -ml-[17px] py-1 block">
                     {i + 1}. {item}
                   </a>
                ))}
              </nav>

              <div className="mt-8 bg-blue-900/10 border border-blue-900/30 p-4 rounded-lg">
                <p className="text-sm font-bold text-primary mb-2">Bạn cần tư vấn BIM?</p>
                <p className="text-xs text-slate-400 mb-3">Nhận lộ trình chuyển đổi số miễn phí từ chuyên gia.</p>
                <button className="w-full text-xs bg-navy-800 text-primary border border-primary font-bold py-2 rounded hover:bg-navy-700 transition-colors">
                  Đăng ký ngay
                </button>
              </div>

              <div className="mt-8">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Chia sẻ bài viết</h4>
                <div className="flex gap-2">
                   {[Share2, LinkIcon, Bookmark].map((Icon, i) => (
                     <button key={i} className="size-8 rounded-full bg-navy-800 hover:bg-blue-900/50 text-slate-400 hover:text-blue-400 border border-navy-700 flex items-center justify-center transition-colors">
                       <Icon className="w-4 h-4" />
                     </button>
                   ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;