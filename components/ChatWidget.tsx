import React, { useState } from 'react';
import { MessageCircle, X, Send, Paperclip } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] sm:w-[380px] h-[500px] bg-navy-900 rounded-2xl shadow-2xl border border-navy-700 flex flex-col overflow-hidden animate-fade-in-up origin-bottom-right">
          {/* Header */}
          <div className="bg-navy-800 p-4 flex items-center justify-between border-b border-navy-700">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="https://picsum.photos/50/50?random=99" alt="AI" className="w-10 h-10 rounded-full border border-navy-700 object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-navy-800 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Trợ lý AI - BIM</h3>
                <p className="text-xs text-blue-300">Đang hoạt động</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-navy-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-navy-950">
             <div className="flex justify-center">
               <span className="text-[10px] text-slate-500 bg-navy-900 px-2 py-1 rounded-full border border-navy-800">Hôm nay 09:41</span>
             </div>
             
             {/* Bot Message */}
             <div className="flex items-end gap-2">
               <img src="https://picsum.photos/50/50?random=99" alt="AI" className="w-6 h-6 rounded-full mb-1" />
               <div className="bg-navy-800 text-slate-200 p-3 rounded-2xl rounded-bl-none text-sm border border-navy-700 max-w-[85%]">
                 Xin chào! <span className="text-white font-bold">BIM AI</span> có thể giúp gì cho doanh nghiệp của bạn về chuyển đổi số hôm nay?
               </div>
             </div>

             {/* Suggestion Chips */}
             <div className="flex gap-2 pl-8 overflow-x-auto pb-1 no-scrollbar">
               {['✨ Tư vấn BIM', '📄 Báo giá', '🔄 Quy trình'].map(chip => (
                 <button key={chip} className="flex-shrink-0 px-3 py-1.5 bg-navy-900 hover:bg-navy-800 border border-primary/30 rounded-full text-xs font-medium text-blue-400 transition-colors whitespace-nowrap">
                   {chip}
                 </button>
               ))}
             </div>

             {/* User Message */}
             <div className="flex items-end justify-end gap-2">
               <div className="bg-primary text-white p-3 rounded-2xl rounded-br-none text-sm max-w-[85%] shadow-lg shadow-primary/20">
                 Tôi muốn nhận báo giá gói tư vấn BIM Level 2.
               </div>
             </div>

             {/* Bot Form Message */}
             <div className="flex items-end gap-2">
               <img src="https://picsum.photos/50/50?random=99" alt="AI" className="w-6 h-6 rounded-full mb-1" />
               <div className="bg-navy-800 text-slate-200 p-4 rounded-2xl rounded-bl-none text-sm border border-navy-700 max-w-[90%] w-full shadow-lg">
                 <p className="mb-3">Vui lòng để lại thông tin để nhận báo giá chi tiết:</p>
                 <div className="space-y-3">
                   <input type="text" placeholder="Họ tên" className="w-full bg-navy-900 border border-navy-700 rounded p-2 text-xs text-white" />
                   <input type="text" placeholder="Email" className="w-full bg-navy-900 border border-navy-700 rounded p-2 text-xs text-white" />
                   <button className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded text-xs font-bold transition-colors">
                     Gửi thông tin
                   </button>
                 </div>
               </div>
             </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-navy-800 border-t border-navy-700">
            <div className="flex items-center gap-2">
              <button className="text-slate-400 hover:text-white p-2 hover:bg-navy-700 rounded-full transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                className="flex-1 bg-navy-900 border-none rounded-full px-4 py-2 text-sm text-white focus:ring-1 focus:ring-primary placeholder-slate-500"
              />
              <button className="bg-primary hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-500 mt-2">Được hỗ trợ bởi <span className="font-bold">BIM AI Tech</span></p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="size-14 bg-primary hover:bg-blue-600 text-white rounded-full shadow-xl shadow-primary/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 border-2 border-navy-900"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        {!isOpen && (
           <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-navy-900 rounded-full animate-bounce"></span>
        )}
      </button>

      {!isOpen && (
        <div className="absolute bottom-20 right-0 bg-navy-800 text-white p-3 rounded-xl rounded-br-none shadow-xl border border-navy-700 w-64 animate-fade-in-up">
           <p className="text-sm font-medium">👋 Chào bạn, tôi là trợ lý AI. Tôi có thể giúp gì cho bạn?</p>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;