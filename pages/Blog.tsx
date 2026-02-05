import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { usePosts, useFeaturedPosts, useSearchPosts } from '../src/hooks/usePosts';
import { useCategoriesWithCount } from '../src/hooks/useCategories';
import { useSubscribe } from '../src/hooks/useSubscribe';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  // Fetch data from Supabase
  const { posts, loading: postsLoading } = usePosts({
    limit: 6,
    categorySlug: selectedCategory || undefined
  });
  const { posts: featuredPosts } = useFeaturedPosts(1);
  const { categories } = useCategoriesWithCount();
  const { posts: searchResults, loading: searchLoading } = useSearchPosts(searchQuery);
  const { subscribe, loading: subscribeLoading, success: subscribeSuccess, message: subscribeMessage } = useSubscribe();

  const featuredPost = featuredPosts[0];
  const displayPosts = searchQuery.length >= 2 ? searchResults : posts;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await subscribe(email);
      if (subscribeSuccess) setEmail('');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (slug: string | undefined) => {
    const colors: Record<string, string> = {
      'bim-cong-nghe': 'text-primary',
      'phap-luat': 'text-rose-400',
      'case-study': 'text-amber-400',
      'chuyen-doi-so': 'text-teal-400',
      'cong-cu': 'text-purple-400',
    };
    return colors[slug || ''] || 'text-primary';
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Kiến thức & Xu hướng Công nghệ Xây dựng
        </h1>
        <div className="border-b border-navy-800 overflow-x-auto no-scrollbar">
          <div className="flex gap-8 min-w-max">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`pb-3 border-b-[3px] font-medium text-sm transition-colors ${selectedCategory === null
                  ? 'border-primary text-white font-bold'
                  : 'border-transparent text-slate-400 hover:text-primary'
                }`}
            >
              Tất cả
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`pb-3 border-b-[3px] font-medium text-sm transition-colors flex items-center gap-2 ${selectedCategory === cat.slug
                    ? 'border-primary text-white font-bold'
                    : 'border-transparent text-slate-400 hover:text-primary'
                  }`}
              >
                {cat.name}
                {cat.postCount > 0 && (
                  <span className="bg-navy-700 text-xs px-1.5 py-0.5 rounded-full">{cat.postCount}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Content */}
        <div className="w-full lg:w-3/4 flex flex-col gap-10">

          {/* Featured Post */}
          {featuredPost && !searchQuery && (
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="bg-navy-800 rounded-xl shadow-lg border border-navy-700 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-auto">
                  <div className="absolute top-4 left-4 bg-primary text-navy-950 text-xs font-extrabold px-3 py-1 rounded-full z-10 shadow-lg">
                    Bài viết nổi bật
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100 min-h-[280px]"
                    style={{
                      backgroundImage: featuredPost.featured_image
                        ? `url(${featuredPost.featured_image})`
                        : 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800)'
                    }}
                  >
                    <div className="absolute inset-0 bg-navy-950/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`bg-navy-700/50 ${getCategoryColor(featuredPost.categories?.slug)} border border-navy-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                      {featuredPost.categories?.name || 'Bài viết'}
                    </span>
                    <span className="text-slate-400 text-xs">• {formatDate(featuredPost.published_at)}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-400 text-base mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full border-2 border-navy-700 bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <span className="text-sm font-medium text-slate-200">AI Construction</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {featuredPost.view_count} lượt xem
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Latest Posts Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">feed</span>
                {searchQuery ? `Kết quả tìm kiếm "${searchQuery}"` : 'Bài viết mới nhất'}
              </h3>
              {!searchQuery && (
                <Link to="/blog" className="text-primary text-sm font-bold hover:text-white transition-colors flex items-center">
                  Xem tất cả <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              )}
            </div>

            {(postsLoading || searchLoading) ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <span className="ml-3 text-slate-400">Đang tải bài viết...</span>
              </div>
            ) : displayPosts.length === 0 ? (
              <div className="text-center py-20 bg-navy-800 rounded-xl border border-navy-700">
                <span className="material-symbols-outlined text-6xl text-navy-600 mb-4">article</span>
                <p className="text-slate-400">
                  {searchQuery ? 'Không tìm thấy bài viết phù hợp' : 'Chưa có bài viết nào'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="bg-navy-800 rounded-xl shadow-md border border-navy-700 overflow-hidden flex flex-col h-full group hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-video w-full overflow-hidden relative">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: post.featured_image
                            ? `url(${post.featured_image})`
                            : `url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop)`
                        }}
                      ></div>
                      <div className="absolute inset-0 bg-navy-950/10 group-hover:bg-transparent transition-colors"></div>
                      <div className={`absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold ${getCategoryColor(post.categories?.slug)} border border-navy-700`}>
                        {post.categories?.name || 'Bài viết'}
                      </div>
                      {post.ai_generated && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 rounded text-xs font-bold text-white">
                          AI
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {post.excerpt || 'Đọc bài viết để tìm hiểu thêm...'}
                      </p>
                      <div className="pt-4 border-t border-navy-700 flex items-center justify-between text-xs text-slate-500">
                        <span>{post.view_count} lượt xem</span>
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {displayPosts.length > 0 && !searchQuery && (
              <div className="mt-10 flex justify-center">
                <button className="flex items-center gap-2 px-8 py-3 rounded-xl border border-navy-700 bg-navy-800 hover:bg-navy-700 hover:border-primary font-bold text-sm text-white transition-all shadow-lg">
                  Xem thêm bài viết
                  <span className="material-symbols-outlined text-base">expand_more</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-8">
          {/* Search Widget */}
          <div className="bg-navy-800 rounded-xl p-5 shadow-lg border border-navy-700">
            <h3 className="font-bold text-white mb-4">Tìm kiếm</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Từ khóa, chủ đề..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-navy-950 border border-navy-700 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary text-white placeholder-navy-600 transition-colors"
              />
              <button className="absolute right-2 top-2 p-1 text-slate-400 hover:text-primary transition-colors">
                {searchLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
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
              {posts.slice(0, 5).map((post, i) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group flex gap-3 items-start">
                  <span className="text-2xl font-bold text-navy-700 group-hover:text-primary transition-colors">{i + 1}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <span className="text-xs text-slate-500 mt-1 block">{post.view_count} lượt xem</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-navy-800 rounded-xl p-5 shadow-lg border border-navy-700">
            <h3 className="font-bold text-white mb-4">Danh mục</h3>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.slug
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'hover:bg-navy-700 text-slate-400 hover:text-white'
                    }`}
                >
                  <span>{cat.name}</span>
                  <span className="bg-navy-700 px-2 py-0.5 rounded-full text-xs">{cat.postCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter Widget */}
          <form onSubmit={handleSubscribe} className="bg-gradient-to-br from-primary to-blue-600 rounded-xl p-6 text-navy-950 text-center shadow-lg shadow-primary/20">
            <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
              <span className="material-symbols-outlined text-2xl text-white">mail</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-white">Đăng ký nhận tin</h3>
            <p className="text-white/90 text-sm mb-4">Cập nhật xu hướng công nghệ xây dựng mới nhất hàng tuần.</p>

            {subscribeSuccess ? (
              <div className="bg-white/20 rounded-lg p-3 text-white text-sm">
                ✅ {subscribeMessage}
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg px-4 py-2 text-sm text-navy-950 border-none mb-3 bg-white/95 focus:bg-white placeholder-navy-600/50"
                />
                <button
                  type="submit"
                  disabled={subscribeLoading}
                  className="w-full py-2 bg-navy-950 hover:bg-black text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {subscribeLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Đăng ký
                </button>
              </>
            )}
          </form>
        </aside>
      </div>
    </div>
  );
};

export default Blog;