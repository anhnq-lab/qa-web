# Phase 06: Content Automation (n8n)
Status: ⬜ Pending
Dependencies: Phase 02, Phase 03

## Objective
Thiết lập n8n workflows để tự động crawl content từ các nguồn (Autodesk, Bentley, Trimble, Bộ XD...), xử lý bằng AI, và tạo draft bài viết.

## Requirements

### Functional
- [ ] Daily content crawl từ các nguồn
- [ ] AI summarize/translate content
- [ ] Auto-create draft posts
- [ ] Legal document monitor
- [ ] Telegram alerts cho content mới

### Non-Functional
- [ ] Graceful error handling
- [ ] Retry logic
- [ ] Logging

## n8n Workflows

### Workflow 1: Daily Content Crawler

```
Trigger: Cron (6:00 AM daily)
    ↓
For Each Source in content_sources
    ↓
HTTP Request: Fetch RSS/Page
    ↓
IF new articles found
    ↓
AI: Summarize + Translate to Vietnamese
    ↓
Supabase: Create draft post
    ↓
Telegram: Notify "X new articles drafted"
```

**Nodes:**
1. **Cron** - Daily at 6 AM
2. **Supabase** - Get active content_sources
3. **Loop** - For each source
4. **HTTP Request** - Fetch RSS/HTML
5. **Code** - Parse articles
6. **Supabase** - Check if URL exists
7. **Filter** - Only new articles
8. **OpenAI** - Summarize & translate
9. **Supabase** - Insert draft post
10. **Telegram** - Send summary

### Workflow 2: Legal Document Monitor

```
Trigger: Cron (Every 2 hours)
    ↓
HTTP Request: Check moc.gov.vn
    ↓
Parse: Extract new documents
    ↓
IF new document found
    ↓
AI: Create summary
    ↓
Supabase: Create draft post (category: Pháp luật)
    ↓
Telegram: Alert "📜 Văn bản mới: [title]"
```

### Workflow 3: Content Approval Webhook

```
Trigger: Webhook (from Admin UI)
    ↓
Supabase: Update post status = published
    ↓
Supabase: Set published_at = now
    ↓
Trigger: Social Post workflow
```

## Implementation Steps

1. [ ] **Deploy n8n**
   - Self-host on Railway/Render
   - Configure environment
   - Setup Supabase credentials

2. [ ] **Create content sources**
   ```sql
   INSERT INTO content_sources (name, url, feed_url, category) VALUES
   ('Autodesk AEC Blog', 'https://blogs.autodesk.com/aec', 'https://blogs.autodesk.com/aec/feed/', 'BIM & Công nghệ'),
   ('Bentley Infrastructure', 'https://www.bentley.com/news', NULL, 'BIM & Công nghệ'),
   ('Trimble Buildings', 'https://buildings.trimble.com/resources', NULL, 'BIM & Công nghệ'),
   ('Procore Blog', 'https://www.procore.com/resources/blog', 'https://www.procore.com/resources/blog/rss', 'Chuyển đổi số'),
   ('Bộ Xây dựng', 'https://moc.gov.vn/vn/Pages/vanbanphapquy.aspx', NULL, 'Pháp luật xây dựng');
   ```

3. [ ] **Build Workflow 1: Content Crawler**
   - Import n8n template
   - Configure nodes
   - Test with single source
   - Enable for all sources

4. [ ] **Build Workflow 2: Legal Monitor**
   - Parse moc.gov.vn structure
   - Extract document metadata
   - AI summary generation

5. [ ] **Build Workflow 3: Approval Webhook**
   - Create webhook endpoint
   - Connect to admin UI

6. [ ] **Webhook endpoints in Next.js**
   ```typescript
   // src/app/api/webhooks/n8n/route.ts
   - Receive n8n callbacks
   - Trigger actions
   ```

7. [ ] **Admin notification settings**
   ```typescript
   // src/app/admin/settings/page.tsx
   - Toggle workflows on/off
   - Set crawl frequency
   - Manage sources
   ```

## Files to Create

| File | Purpose |
|------|---------|
| `n8n/workflows/content-crawler.json` | Daily crawler workflow |
| `n8n/workflows/legal-monitor.json` | Legal docs workflow |
| `n8n/workflows/approval-webhook.json` | Post approval |
| `src/app/api/webhooks/n8n/route.ts` | Webhook receiver |
| `src/app/admin/settings/page.tsx` | Settings UI |

## Environment Variables (n8n)

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Test Criteria
- [ ] n8n deployed and accessible
- [ ] Content crawler runs successfully
- [ ] New articles create draft posts
- [ ] Legal monitor detects new documents
- [ ] AI summaries are quality
- [ ] Telegram notifications work
- [ ] No duplicate articles created

---
Next Phase: [phase-07-social.md](./phase-07-social.md)
