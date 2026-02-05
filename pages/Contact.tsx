import React, { useState } from 'react';
import { Send, Clock, ShieldCheck, Star, ChevronDown, Loader2, CheckCircle } from 'lucide-react';
import { useSubmitLead } from '../src/hooks/useSubmitLead';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });

  const { submitLead, loading, success, error, reset } = useSubmitLead();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await submitLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      company: formData.company || null,
      message: formData.message || null,
      source: 'contact_page'
    });

    if (result) {
      setFormData({ name: '', phone: '', email: '', company: '', message: '' });
    }
  };

  return (
    <div className="bg-navy-950 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Form Section */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                Tư vấn giải pháp chuyển đổi số
              </span>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Kết nối với chuyên gia <span className="text-primary">BIM & AI</span> hàng đầu
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Để lại thông tin để nhận tư vấn miễn phí về lộ trình ứng dụng công nghệ cho doanh nghiệp xây dựng của bạn.
              </p>
            </div>

            <div className="bg-navy-900 rounded-xl p-6 lg:p-8 shadow-xl border border-navy-800">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Gửi thành công!</h3>
                  <p className="text-slate-400 mb-6">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24h.
                  </p>
                  <button
                    onClick={reset}
                    className="px-6 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-slate-300">Họ và tên <span className="text-red-400">*</span></span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-lg border border-navy-700 bg-navy-950 text-white focus:border-primary focus:ring-primary px-4 py-3 text-sm placeholder:text-slate-500"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-slate-300">Số điện thoại</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="0912 xxx xxx"
                        className="w-full rounded-lg border border-navy-700 bg-navy-950 text-white focus:border-primary focus:ring-primary px-4 py-3 text-sm placeholder:text-slate-500"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-slate-300">Email <span className="text-red-400">*</span></span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="email@congty.com"
                        className="w-full rounded-lg border border-navy-700 bg-navy-950 text-white focus:border-primary focus:ring-primary px-4 py-3 text-sm placeholder:text-slate-500"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-slate-300">Tên công ty</span>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Công ty Xây dựng ABC"
                        className="w-full rounded-lg border border-navy-700 bg-navy-950 text-white focus:border-primary focus:ring-primary px-4 py-3 text-sm placeholder:text-slate-500"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-slate-300">Nội dung cần tư vấn</span>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mô tả ngắn gọn nhu cầu..."
                      className="w-full rounded-lg border border-navy-700 bg-navy-950 text-white focus:border-primary focus:ring-primary px-4 py-3 text-sm placeholder:text-slate-500 resize-none"
                    ></textarea>
                  </label>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                      ❌ Có lỗi xảy ra. Vui lòng thử lại sau.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full bg-secondary hover:bg-secondary-hover text-navy-950 font-bold rounded-lg py-3.5 px-4 shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] text-base flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <span>Gửi yêu cầu ngay</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-500 mt-1">
                    Bằng việc gửi thông tin, bạn đồng ý với <a href="#" className="underline hover:text-primary text-slate-400">Chính sách bảo mật</a> của chúng tôi.
                  </p>
                </form>
              )}
            </div>

            <div className="lg:hidden flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-navy-800 rounded-lg text-blue-300 border border-blue-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Phản hồi nhanh 24h</h3>
                  <p className="text-xs text-slate-400">Đội ngũ tư vấn sẵn sàng hỗ trợ</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-navy-800 rounded-lg text-blue-300 border border-blue-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Bảo mật thông tin</h3>
                  <p className="text-xs text-slate-400">Cam kết bảo mật 100% dữ liệu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual/Trust Section */}
          <div className="flex flex-col h-full order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl group border border-navy-800">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-90"></div>

              <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />)}
                  <span className="text-sm font-medium ml-2 opacity-90">5.0/5.0 từ 200+ Doanh nghiệp</span>
                </div>
                <blockquote className="text-lg font-medium leading-snug mb-4 italic text-blue-100">
                  "Giải pháp BIM AI đã giúp chúng tôi giảm 30% chi phí lãng phí vật liệu và tối ưu tiến độ thi công."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-sm font-bold text-white">TH</div>
                  <div>
                    <p className="text-sm font-bold text-white">Trần Huy</p>
                    <p className="text-xs text-blue-200">Giám đốc dự án, VinConstruction</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-navy-900 border border-navy-800 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-blue-300">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Hỗ trợ 24/7</h4>
                  <p className="text-sm text-slate-400">Phản hồi yêu cầu trong 30p</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-navy-900 border border-navy-800 shadow-lg">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-blue-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Bảo mật NDA</h4>
                  <p className="text-sm text-slate-400">Cam kết bảo vệ dữ liệu dự án</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-navy-950 py-16 lg:py-24 border-t border-navy-800">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Câu hỏi thường gặp</h2>
            <p className="text-slate-400">Giải đáp những thắc mắc phổ biến về dịch vụ tư vấn BIM & AI</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'Doanh nghiệp quy mô nhỏ có nên áp dụng BIM không?', a: 'Hoàn toàn có. BIM không chỉ dành cho các dự án lớn. Đối với doanh nghiệp nhỏ, BIM giúp giảm thiểu sai sót thiết kế, tính toán khối lượng chính xác và tăng khả năng cạnh tranh.' },
              { q: 'Chi phí triển khai AI được tính như thế nào?', a: 'Chi phí phụ thuộc vào độ phức tạp của bài toán, quy mô dữ liệu và hạ tầng hiện có. Chúng tôi thường chia làm 3 giai đoạn: Đánh giá, Triển khai thí điểm và Mở rộng.' },
              { q: 'Thời gian để thấy hiệu quả sau khi chuyển đổi số?', a: 'Thông thường, các doanh nghiệp bắt đầu thấy sự cải thiện về quy trình và giảm thiểu lỗi sai sau 3-6 tháng triển khai.' },
              { q: 'Chính sách bảo mật dữ liệu dự án của các bạn ra sao?', a: 'Chúng tôi cam kết ký thỏa thuận bảo mật (NDA) trước khi tiếp nhận bất kỳ dữ liệu nào. Hệ thống lưu trữ đạt chuẩn ISO 27001.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-navy-900 rounded-xl overflow-hidden border border-navy-800 hover:border-primary/50 transition-all">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-white">
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </span>
                </summary>
                <div className="text-slate-300 p-5 pt-0 text-sm leading-relaxed border-t border-navy-800 mt-2">
                  <div className="pt-4">{faq.a}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;