# Phase 07: Social & Newsletter
Status: ⬜ Pending
Dependencies: Phase 03, Phase 06

## Objective
Tự động đăng bài lên Facebook/LinkedIn và gửi newsletter weekly.

## Requirements

### Functional
- [ ] Auto-post to Facebook Page khi publish
- [ ] Auto-post to LinkedIn khi publish
- [ ] Weekly newsletter với top bài
- [ ] Unsubscribe handling
- [ ] Email templates

### Non-Functional
- [ ] Rate limiting cho social APIs
- [ ] Template-based emails
- [ ] Track email opens/clicks

## Implementation Steps

### Social Auto-Post

1. [ ] **n8n Workflow: Social Post**
   ```
   Trigger: Webhook (post published)
       ↓
   Supabase: Get post details
       ↓
   Parallel:
       → Facebook: Post to Page
       → LinkedIn: Post to Profile
       ↓
   Supabase: Update post (social_posted = true)
   ```

2. [ ] **Facebook Page API setup**
   - Create Facebook App
   - Get Page Access Token
   - Permissions: pages_manage_posts

3. [ ] **LinkedIn API setup**
   - Create LinkedIn App
   - OAuth flow for posting
   - Permissions: w_member_social

### Newsletter

4. [ ] **n8n Workflow: Weekly Newsletter**
   ```
   Trigger: Cron (Monday 9:00 AM)
       ↓
   Supabase: Get top posts (last 7 days)
       ↓
   Supabase: Get active subscribers
       ↓
   Render: Email template
       ↓
   Resend: Send batch emails
       ↓
   Telegram: Report "Newsletter sent to X subscribers"
   ```

5. [ ] **Email templates**
   ```html
   <!-- Weekly digest template -->
   - Header với logo
   - Top 3-5 bài viết với thumbnails
   - CTA: "Đọc thêm"
   - Footer với unsubscribe link
   ```

6. [ ] **Unsubscribe handling**
   ```typescript
   // src/app/unsubscribe/[token]/page.tsx
   - Decode token (email hash)
   - Update subscriber status
   - Show confirmation
   ```

7. [ ] **Admin newsletter dashboard**
   ```typescript
   // src/app/admin/newsletter/page.tsx
   - Subscriber stats
   - Send test email
   - Manual send
   - View history
   ```

8. [ ] **Social post preview in editor**
   ```typescript
   // Update PostEditor.tsx
   - Preview Facebook/LinkedIn format
   - Character count
   - Image preview
   ```

## Files to Create

| File | Purpose |
|------|---------|
| `n8n/workflows/social-post.json` | Auto-post workflow |
| `n8n/workflows/weekly-newsletter.json` | Newsletter workflow |
| `src/emails/newsletter-weekly.tsx` | Email template |
| `src/app/unsubscribe/[token]/page.tsx` | Unsubscribe page |
| `src/app/admin/newsletter/page.tsx` | Newsletter admin |
| `src/services/socialService.ts` | Social API helpers |

## Environment Variables

```env
# Facebook
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_PAGE_ACCESS_TOKEN=your_token

# LinkedIn
LINKEDIN_ACCESS_TOKEN=your_token

# Email
RESEND_API_KEY=your_key
EMAIL_FROM=your@domain.com
```

## Test Criteria
- [ ] Published post appears on Facebook
- [ ] Published post appears on LinkedIn
- [ ] Newsletter sent to test subscriber
- [ ] Unsubscribe link works
- [ ] Email template renders correctly
- [ ] Admin can see subscriber stats
- [ ] Telegram reports newsletter sent

---
Next Phase: [phase-08-seo.md](./phase-08-seo.md)
