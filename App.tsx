import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Tools from './pages/Tools';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import ChatWidget from './components/ChatWidget';
import { AuthProvider } from './src/contexts/AuthContext';

// Admin imports
import {
  AdminLayout,
  AdminDashboard,
  AdminPosts,
  AdminLeads,
  AdminSubscribers,
  PostEditor
} from './pages/admin';
import AdminLogin from './pages/admin/AdminLogin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="tools" element={<Tools />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Login (public) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes (protected) */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="posts/new" element={<PostEditor />} />
            <Route path="posts/:id/edit" element={<PostEditor />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
          </Route>
        </Routes>
        <ChatWidget />
      </AuthProvider>
    </HashRouter>
  );
};

export default App;