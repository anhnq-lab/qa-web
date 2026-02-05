import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, Settings, LogOut, Search, Bell, Plus, Ruler } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Tổng quan', path: '/admin' },
    { icon: FileText, label: 'Bài viết', path: '/admin/posts' },
    { icon: Users, label: 'Khách hàng', path: '/admin/leads' },
    { icon: Settings, label: 'Cài đặt', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-navy-950 text-slate-300">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col justify-between border-r border-navy-800 bg-navy-950 flex-shrink-0">
        <div>
          <div className="p-6 border-b border-navy-800">
            <div className="flex gap-3 items-center">
               <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Ruler className="w-6 h-6" />
                </div>
              <div className="flex flex-col">
                <h1 className="text-white text-base font-bold leading-tight">Admin Portal</h1>
                <p className="text-slate-500 text-xs font-medium">BIM & AI Consult</p>
              </div>
            </div>
          </div>
          
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-slate-400 hover:bg-navy-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-navy-800">
          <button 
            onClick={() => navigate('/')}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Quay lại trang chủ</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Admin Header */}
        <header className="h-16 flex items-center justify-between px-6 py-3 bg-navy-900/90 backdrop-blur-md border-b border-navy-800 z-10">
          <div className="flex-1 max-w-lg">
            <div className="relative group">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Tìm kiếm bài viết, lead, dữ liệu..." 
                className="w-full pl-10 pr-4 py-2 bg-navy-800 border border-transparent focus:border-primary/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-navy-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-navy-900"></span>
            </button>
            <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 bg-primary hover:bg-primary-hover text-white gap-2 text-sm font-bold px-5 transition-colors shadow-lg shadow-primary/20">
              <Plus className="w-5 h-5" />
              <span>Viết bài mới</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 border-2 border-navy-800"></div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth bg-navy-950">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;