# Phase 02: Database Schema
Status: ⬜ Pending
Dependencies: Phase 01

## Objective
Thiết kế và tạo database schema trên Supabase cho blog, leads, và content management.

## Requirements

### Functional
- [ ] Posts/Articles table với categories
- [ ] Leads table cho contact forms
- [ ] Newsletter subscribers table
- [ ] Content sources table (crawled content)
- [ ] Chat history table (cho chatbot)

### Non-Functional
- [ ] RLS (Row Level Security) enabled
- [ ] Proper indexes cho performance
- [ ] Updated_at triggers

## Database Schema

```sql
-- Categories for blog posts
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts / Articles
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  source_url TEXT, -- For crawled content
  source_name TEXT, -- Autodesk, Bentley, etc.
  ai_generated BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads from contact forms
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT, -- Which page/form
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  score INTEGER DEFAULT 0, -- Lead scoring
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Crawled content sources
CREATE TABLE content_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- Autodesk, Bentley, etc.
  url TEXT NOT NULL,
  feed_url TEXT, -- RSS feed if available
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  last_crawled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat conversations for AI chatbot
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT, -- Anonymous visitor tracking
  messages JSONB DEFAULT '[]',
  lead_id UUID REFERENCES leads(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page views / Analytics
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  post_id UUID REFERENCES posts(id),
  visitor_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_published ON posts(published_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_page_views_created ON page_views(created_at DESC);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

## Implementation Steps

1. [ ] **Tạo migration file**
   - Chạy SQL script trên Supabase Dashboard
   - Hoặc dùng Supabase CLI

2. [ ] **Enable RLS**
   ```sql
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
   -- Create policies...
   ```

3. [ ] **Seed data cho categories**
   ```sql
   INSERT INTO categories (name, slug, description, icon) VALUES
   ('BIM & Công nghệ', 'bim-cong-nghe', 'Tin tức về BIM, Revit, ACC...', 'cube'),
   ('Pháp luật xây dựng', 'phap-luat', 'Nghị định, Thông tư, Quy định...', 'scale'),
   ('Case Study', 'case-study', 'Dự án thực tế và bài học...', 'briefcase'),
   ('Chuyển đổi số', 'chuyen-doi-so', 'Digital transformation trong xây dựng...', 'zap'),
   ('Công cụ & Hướng dẫn', 'cong-cu', 'Tools, templates, hướng dẫn...', 'tool');
   ```

4. [ ] **Seed content sources**
   ```sql
   INSERT INTO content_sources (name, url, feed_url, category) VALUES
   ('Autodesk Blog', 'https://blogs.autodesk.com', 'https://blogs.autodesk.com/feed/', 'BIM & Công nghệ'),
   ('Bentley News', 'https://www.bentley.com/news', NULL, 'BIM & Công nghệ'),
   ('Bộ Xây dựng', 'https://moc.gov.vn', NULL, 'Pháp luật xây dựng');
   ```

5. [ ] **Generate TypeScript types**
   ```bash
   npx supabase gen types typescript --project-id <project-id> > src/types/database.ts
   ```

6. [ ] **Test queries**
   - Verify CRUD operations work
   - Test RLS policies

## Files to Create

| File | Purpose |
|------|---------|
| `src/types/database.ts` | Auto-generated Supabase types |
| `supabase/migrations/001_initial_schema.sql` | Migration file |

## Test Criteria
- [ ] All tables created successfully
- [ ] Indexes created
- [ ] Triggers working (updated_at)
- [ ] TypeScript types generated
- [ ] Sample queries work in Supabase Dashboard

---
Next Phase: [phase-03-cms.md](./phase-03-cms.md)
