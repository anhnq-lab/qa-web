-- =====================================================
-- AI CONSTRUCTION PORTAL - Initial Database Schema
-- Created: 2026-02-05
-- =====================================================

-- Categories for blog posts
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts / Articles
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  source_url TEXT,
  source_name TEXT,
  ai_generated BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads from contact forms
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  score INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Crawled content sources
CREATE TABLE IF NOT EXISTS content_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  feed_url TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_crawled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat conversations for AI chatbot
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT,
  messages JSONB DEFAULT '[]',
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page views / Analytics
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
  visitor_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES for performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at DESC);

-- =====================================================
-- TRIGGERS for updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS posts_updated_at ON posts;
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS chat_sessions_updated_at ON chat_sessions;
CREATE TRIGGER chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =====================================================
-- RLS (Row Level Security)
-- =====================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Public: Read categories
CREATE POLICY "Categories are viewable by everyone" ON categories
FOR SELECT USING (true);

-- Public: Read published posts
CREATE POLICY "Published posts are viewable by everyone" ON posts
FOR SELECT USING (status = 'published');

-- Public: Anyone can submit leads
CREATE POLICY "Anyone can create leads" ON leads
FOR INSERT WITH CHECK (true);

-- Public: Anyone can subscribe
CREATE POLICY "Anyone can subscribe" ON subscribers
FOR INSERT WITH CHECK (true);

-- Public: Anyone can create chat sessions
CREATE POLICY "Anyone can create chat sessions" ON chat_sessions
FOR INSERT WITH CHECK (true);

-- Public: Anyone can update their own chat session
CREATE POLICY "Anyone can update chat sessions" ON chat_sessions
FOR UPDATE USING (true);

-- Public: Anyone can track page views
CREATE POLICY "Anyone can track page views" ON page_views
FOR INSERT WITH CHECK (true);

-- =====================================================
-- SEED DATA - Categories
-- =====================================================

INSERT INTO categories (name, slug, description, icon) VALUES
('BIM & Công nghệ', 'bim-cong-nghe', 'Tin tức về BIM, Revit, ACC, Digital Twin...', 'cube'),
('Pháp luật xây dựng', 'phap-luat', 'Nghị định, Thông tư, Quy định mới nhất...', 'scale'),
('Case Study', 'case-study', 'Dự án thực tế và bài học kinh nghiệm...', 'briefcase'),
('Chuyển đổi số', 'chuyen-doi-so', 'Digital transformation trong ngành xây dựng...', 'zap'),
('Công cụ & Hướng dẫn', 'cong-cu', 'Tools, templates, tài liệu hữu ích...', 'wrench')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- SEED DATA - Content Sources
-- =====================================================

INSERT INTO content_sources (name, url, feed_url, category, is_active) VALUES
('Autodesk Blog', 'https://blogs.autodesk.com', 'https://blogs.autodesk.com/feed/', 'BIM & Công nghệ', true),
('Bentley News', 'https://www.bentley.com/news', NULL, 'BIM & Công nghệ', true),
('Bộ Xây dựng', 'https://moc.gov.vn', NULL, 'Pháp luật xây dựng', true),
('Trimble Resources', 'https://www.trimble.com/resources', NULL, 'BIM & Công nghệ', true),
('ArchDaily', 'https://www.archdaily.com', 'https://www.archdaily.com/feed', 'Chuyển đổi số', true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- FUNCTION: Increment view count
-- =====================================================

CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET view_count = view_count + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
