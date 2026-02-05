# Phase 08: SEO & Analytics
Status: ⬜ Pending
Dependencies: Phase 03

## Objective
Tối ưu SEO và thiết lập analytics để theo dõi traffic, behavior, và conversions.

## Requirements

### Functional
- [ ] Meta tags động cho mỗi page
- [ ] Open Graph / Twitter Cards
- [ ] JSON-LD structured data
- [ ] Sitemap.xml tự động
- [ ] Robots.txt
- [ ] Google Analytics 4
- [ ] Heatmaps (Hotjar/Clarity)

### Non-Functional
- [ ] Core Web Vitals optimization
- [ ] Image optimization
- [ ] Lazy loading

## Implementation Steps

### SEO Optimization

1. [ ] **Dynamic meta tags**
   ```typescript
   // src/app/(public)/blog/[slug]/page.tsx
   export async function generateMetadata({ params }) {
     const post = await getPostBySlug(params.slug);
     return {
       title: post.title,
       description: post.excerpt,
       openGraph: {
         title: post.title,
         description: post.excerpt,
         images: [post.featured_image],
         type: 'article',
       },
       twitter: {
         card: 'summary_large_image',
       },
     };
   }
   ```

2. [ ] **JSON-LD structured data**
   ```typescript
   // src/components/seo/ArticleSchema.tsx
   - Article schema cho blog posts
   - Organization schema cho homepage
   - BreadcrumbList schema
   - FAQPage schema (nếu có)
   ```

3. [ ] **Sitemap generation**
   ```typescript
   // src/app/sitemap.ts
   export default async function sitemap() {
     const posts = await getAllPublishedPosts();
     return [
       { url: 'https://domain.com', lastModified: new Date() },
       { url: 'https://domain.com/blog', lastModified: new Date() },
       ...posts.map(post => ({
         url: `https://domain.com/blog/${post.slug}`,
         lastModified: post.updated_at,
       })),
     ];
   }
   ```

4. [ ] **Robots.txt**
   ```typescript
   // src/app/robots.ts
   export default function robots() {
     return {
       rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
       sitemap: 'https://domain.com/sitemap.xml',
     };
   }
   ```

### Analytics

5. [ ] **Google Analytics 4**
   ```typescript
   // src/components/analytics/GoogleAnalytics.tsx
   - GA4 script in layout
   - Page view tracking
   - Event tracking utilities
   ```

6. [ ] **Custom events tracking**
   ```typescript
   // src/lib/analytics.ts
   - trackFormSubmit(formName)
   - trackChatOpen()
   - trackDownload(resourceName)
   - trackCTA(ctaName, location)
   ```

7. [ ] **Hotjar/Clarity setup**
   ```typescript
   // src/components/analytics/Hotjar.tsx
   - Heatmaps
   - Session recordings
   - Surveys (optional)
   ```

8. [ ] **View count tracking**
   ```typescript
   // src/app/(public)/blog/[slug]/page.tsx
   - Track view on page load
   - Debounce để tránh duplicate
   - Store in page_views table
   ```

### Performance

9. [ ] **Image optimization**
   ```typescript
   // next.config.js
   images: {
     domains: ['your-supabase-url.supabase.co'],
     formats: ['image/avif', 'image/webp'],
   }
   ```

10. [ ] **Core Web Vitals monitoring**
    - LCP < 2.5s
    - FID < 100ms
    - CLS < 0.1

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/sitemap.ts` | Dynamic sitemap |
| `src/app/robots.ts` | Robots.txt |
| `src/components/seo/ArticleSchema.tsx` | JSON-LD for articles |
| `src/components/seo/OrganizationSchema.tsx` | JSON-LD for org |
| `src/components/analytics/GoogleAnalytics.tsx` | GA4 component |
| `src/components/analytics/Hotjar.tsx` | Heatmap tracking |
| `src/lib/analytics.ts` | Analytics utilities |

## Environment Variables

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Test Criteria
- [ ] Meta tags render correctly (check with SEO tools)
- [ ] Open Graph preview works (Facebook debugger)
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt blocks /admin
- [ ] GA4 tracking events
- [ ] Hotjar recording sessions
- [ ] Lighthouse score > 90
- [ ] View counts incrementing

---

## 🎉 LAUNCH CHECKLIST

After completing all phases:

- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Database seeded with initial content
- [ ] n8n workflows activated
- [ ] Social accounts connected
- [ ] Telegram bot configured
- [ ] Test lead submission
- [ ] Test chatbot functionality
- [ ] Verify SEO tags
- [ ] Verify analytics tracking
- [ ] Create 5-10 initial blog posts
- [ ] Announce launch!
