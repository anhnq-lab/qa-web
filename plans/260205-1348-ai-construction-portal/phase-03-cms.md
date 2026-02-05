# Phase 03: CMS & Blog System
Status: ⬜ Pending
Dependencies: Phase 01, Phase 02

## Objective
Xây dựng hệ thống blog/CMS với admin dashboard để quản lý bài viết, categories, và content.

## Requirements

### Functional
- [ ] Public blog listing với pagination
- [ ] Post detail page với SEO
- [ ] Category filtering
- [ ] Search functionality
- [ ] Admin dashboard (protected)
- [ ] CRUD posts với AI draft support
- [ ] Image upload to Supabase Storage

### Non-Functional
- [ ] Server-side rendering cho SEO
- [ ] Image optimization với Next.js Image
- [ ] Responsive design

## Implementation Steps

### Public Pages

1. [ ] **Blog listing page** (`/blog`)
   - Grid layout với post cards
   - Category tabs
   - Pagination (10 posts/page)
   - Featured post on top

2. [ ] **Post detail page** (`/blog/[slug]`)
   - Full content với markdown rendering
   - Related posts sidebar
   - Share buttons
   - View count tracking
   - Author info section

3. [ ] **Category page** (`/blog/category/[slug]`)
   - Posts filtered by category
   - Category description

4. [ ] **Search** (`/blog/search`)
   - Full-text search
   - Filter by category, date

### Admin Pages

5. [ ] **Admin layout** (`/admin`)
   - Protected với Supabase Auth
   - Sidebar navigation
   - Dashboard overview

6. [ ] **Posts management** (`/admin/posts`)
   - DataTable với posts
   - Status badge (draft/published)
   - Quick actions (edit, delete, publish)

7. [ ] **Post editor** (`/admin/posts/new`, `/admin/posts/[id]/edit`)
   - Rich text editor (TipTap or similar)
   - Category selector
   - Featured image upload
   - AI Draft button (call OpenAI)
   - Status toggle
   - SEO preview

8. [ ] **Categories management** (`/admin/categories`)
   - CRUD categories
   - Icon picker

### Services

9. [ ] **Post service**
   ```typescript
   // src/services/postService.ts
   - getPublishedPosts(page, limit)
   - getPostBySlug(slug)
   - getPostsByCategory(categorySlug)
   - searchPosts(query)
   - createPost(data)
   - updatePost(id, data)
   - deletePost(id)
   - incrementViewCount(id)
   ```

10. [ ] **AI Draft service**
    ```typescript
    // src/services/aiService.ts
    - generateDraft(topic, category)
    - improveContent(content)
    - generateExcerpt(content)
    ```

## Files to Create

| File | Purpose |
|------|---------|
| `src/app/(public)/blog/page.tsx` | Blog listing |
| `src/app/(public)/blog/[slug]/page.tsx` | Post detail |
| `src/app/(public)/blog/category/[slug]/page.tsx` | Category page |
| `src/app/(admin)/admin/layout.tsx` | Admin layout |
| `src/app/(admin)/admin/posts/page.tsx` | Posts list |
| `src/app/(admin)/admin/posts/[id]/edit/page.tsx` | Post editor |
| `src/components/blog/PostCard.tsx` | Post card component |
| `src/components/blog/PostContent.tsx` | Post content renderer |
| `src/components/admin/PostEditor.tsx` | Rich text editor |
| `src/services/postService.ts` | Post CRUD operations |
| `src/services/aiService.ts` | AI draft generation |

## Test Criteria
- [ ] Blog listing shows posts with pagination
- [ ] Post detail renders markdown correctly
- [ ] Category filter works
- [ ] Search returns relevant results
- [ ] Admin access requires authentication
- [ ] Post CRUD operations work
- [ ] Image upload to Supabase Storage works
- [ ] AI Draft generates content

---
Next Phase: [phase-04-chatbot.md](./phase-04-chatbot.md)
