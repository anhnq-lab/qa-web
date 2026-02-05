import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Eye, UserPlus, TrendingUp, MoreHorizontal, Edit, Filter } from 'lucide-react';

const data = [
  { name: 'Tuần 1', value: 10 },
  { name: 'Tuần 2', value: 45 },
  { name: 'Tuần 3', value: 30 },
  { name: 'Tuần 4', value: 80 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div>
        <h2 className="text-white tracking-tight text-2xl font-bold leading-tight">Tổng quan hiệu suất</h2>
        <p className="text-slate-400 mt-1 text-sm">Cập nhật dữ liệu từ nền tảng tư vấn BIM & AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stats Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           {[
             { title: 'Tổng bài viết', val: 142, icon: FileText, change: '+2%', color: 'text-primary', bg: 'bg-primary/10' },
             { title: 'Lượt xem trang', val: '12,450', icon: Eye, change: '+12%', color: 'text-amber-500', bg: 'bg-amber-500/10' },
             { title: 'Leads mới (Tuần)', val: 45, icon: UserPlus, change: '+5%', color: 'text-indigo-400', bg: 'bg-indigo-500/10' }
           ].map((stat, i) => (
             <div key={i} className="flex flex-col gap-3 rounded-xl p-6 bg-navy-900 border border-navy-800 shadow-sm">
               <div className="flex justify-between items-start">
                 <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                   <stat.icon className="w-6 h-6" />
                 </div>
                 <span className="flex items-center text-emerald-400 bg-emerald-900/20 text-xs font-semibold px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-1" /> {stat.change}
                 </span>
               </div>
               <div>
                 <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                 <p className="text-white text-3xl font-bold mt-1">{stat.val}</p>
               </div>
             </div>
           ))}
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8">
          <div className="h-full flex flex-col rounded-xl bg-navy-900 border border-navy-800 shadow-sm p-6">
             <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-white text-lg font-bold">Lượt xem 30 ngày qua</h3>
                  <p className="text-slate-400 text-sm">Xu hướng truy cập bài viết chuyên môn</p>
                </div>
                <button className="text-primary hover:bg-navy-800 p-2 rounded-lg transition-colors">
                   <MoreHorizontal className="w-5 h-5" />
                </button>
             </div>
             <div className="flex-1 w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
         {/* Customers Table */}
         <div className="bg-navy-900 rounded-xl border border-navy-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-navy-800 flex justify-between items-center">
              <h3 className="text-white font-bold">Khách hàng mới nhất</h3>
              <a href="#" className="text-sm text-primary font-medium hover:underline">Xem tất cả</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-navy-950/50 text-xs uppercase font-semibold text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Tên</th>
                    <th className="px-6 py-4">Công ty</th>
                    <th className="px-6 py-4">Quan tâm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                   {[
                     { name: 'Nguyễn Văn A', co: 'Vinaconex', tag: 'Tư vấn BIM', color: 'text-cyan-300 bg-cyan-900/30 border-cyan-800/30' },
                     { name: 'Trần Thị B', co: 'Coteccons', tag: 'AI Design', color: 'text-purple-300 bg-purple-900/30 border-purple-800/30' },
                     { name: 'Lê Hoàng C', co: 'Hoa Binh Group', tag: 'Tư vấn BIM', color: 'text-cyan-300 bg-cyan-900/30 border-cyan-800/30' },
                     { name: 'Phạm Minh D', co: 'Delta Corp', tag: 'Đào tạo', color: 'text-amber-300 bg-amber-900/30 border-amber-800/30' }
                   ].map((row, i) => (
                     <tr key={i} className="hover:bg-navy-800/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                        <td className="px-6 py-4">{row.co}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-xs font-semibold border ${row.color}`}>{row.tag}</span>
                        </td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
         </div>

         {/* Posts Management */}
         <div className="bg-navy-900 rounded-xl border border-navy-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-navy-800 flex justify-between items-center">
               <h3 className="text-white font-bold">Quản lý bài viết</h3>
               <button className="p-1 hover:bg-navy-800 rounded text-slate-500">
                 <Filter className="w-5 h-5" />
               </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-navy-950/50 text-xs uppercase font-semibold text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Tiêu đề</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                   {[
                     { title: 'Ứng dụng AI trong thiết kế kết cấu', date: '12/10/2023', status: 'Đã đăng', sColor: 'text-cyan-300 bg-cyan-900/30 border-cyan-500/20', dot: 'bg-cyan-400' },
                     { title: 'Lộ trình BIM Level 2 cho doanh nghiệp', date: '10/10/2023', status: 'Đã đăng', sColor: 'text-cyan-300 bg-cyan-900/30 border-cyan-500/20', dot: 'bg-cyan-400' },
                     { title: 'Tối ưu hóa năng lượng với BIM 6D', date: '08/10/2023', status: 'Bản nháp', sColor: 'text-slate-400 bg-slate-800', dot: 'bg-slate-400' },
                     { title: 'Top 5 công cụ Scan-to-BIM 2024', date: '05/10/2023', status: 'Bản nháp', sColor: 'text-slate-400 bg-slate-800', dot: 'bg-slate-400' }
                   ].map((row, i) => (
                     <tr key={i} className="hover:bg-navy-800/50 transition-colors">
                       <td className="px-6 py-4">
                         <p className="font-medium text-white truncate max-w-[200px]">{row.title}</p>
                         <p className="text-xs text-slate-500 mt-0.5">{row.date}</p>
                       </td>
                       <td className="px-6 py-4">
                         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${row.sColor}`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${row.dot}`}></span> {row.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button className="text-slate-400 hover:text-primary transition-colors mx-1">
                           <Edit className="w-4 h-4" />
                         </button>
                       </td>
                     </tr>
                   ))}
                </tbody>
              </table>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;