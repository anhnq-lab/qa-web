# UI/UX Design Specification
## AI-Powered Construction Tech Portal

**Dùng cho:** Google Stitch, Figma AI, hoặc các công cụ thiết kế AI
**Style:** Modern, Professional, Tech-forward
**Target:** Doanh nghiệp xây dựng Việt Nam

---

## 🎨 DESIGN SYSTEM

### Color Palette
```
Primary:     #2563EB (Royal Blue) - Chuyên nghiệp, tin cậy
Secondary:   #0EA5E9 (Sky Blue) - Công nghệ, digital
Accent:      #F59E0B (Amber) - CTA, highlights
Dark:        #0F172A (Slate 900) - Text, headers
Light:       #F8FAFC (Slate 50) - Backgrounds
Success:     #10B981 (Emerald)
```

### Typography
```
Headings:    Inter or SF Pro Display (Bold)
Body:        Inter or SF Pro Text (Regular)
Mono:        JetBrains Mono (cho code/stats)
```

### Design Principles
- Clean, spacious layouts (nhiều whitespace)
- Cards với subtle shadows và rounded corners (8-12px)
- Gradient accents cho CTAs và highlights
- Dark mode support
- Mobile-first responsive

---

## 📱 PAGE DESIGNS

---

### 1. HOMEPAGE

**Prompt cho Google Stitch:**
```
Design a modern tech blog homepage for a construction digital transformation consultant. 

Hero Section:
- Left: Headline "Chuyển đổi số Ngành Xây dựng" with subtitle about BIM/AI consulting
- Right: 3D isometric illustration of smart building with digital elements
- Gradient background from dark blue to light blue
- CTA button "Tư vấn miễn phí" in amber/orange

Featured Posts Section:
- 3-column grid of article cards
- Each card: thumbnail image, category badge, title, excerpt, read time
- "Xem thêm" link

Stats Section:
- 4 counter boxes in a row: "500+ Dự án", "50+ Khách hàng", "10 năm kinh nghiệm", "24/7 Hỗ trợ"
- Icons above each number
- Subtle gradient background

Newsletter Section:
- Full-width section with pattern background
- Headline: "Nhận tin mới nhất về BIM & Pháp luật xây dựng"
- Email input field with subscribe button
- Trust badges below

Footer:
- 4-column layout: Logo/About, Quick Links, Categories, Contact
- Social icons
- Copyright
```

---

### 2. BLOG LISTING PAGE

**Prompt cho Google Stitch:**
```
Design a blog listing page for construction technology articles.

Header:
- Sticky navigation with logo, menu items, search icon, and "Liên hệ" CTA button

Filter Bar:
- Category tabs: "Tất cả", "BIM & Công nghệ", "Pháp luật", "Case Study", "Chuyển đổi số", "Công cụ"
- Active tab has blue underline

Featured Article:
- Large card spanning full width
- Left: large thumbnail
- Right: category badge, title (H1), excerpt, author info with avatar, publish date
- "Đọc tiếp" button

Article Grid:
- 3-column grid of article cards
- Each card: 
  - Thumbnail (16:9 ratio)
  - Category badge (colored chip)
  - Title (bold, 2 lines max)
  - Excerpt (2 lines, gray text)
  - Author avatar + name + date
- Hover effect: slight lift with shadow

Pagination:
- Page numbers with prev/next arrows
- Current page highlighted

Sidebar (optional):
- Search box
- Popular articles list
- Newsletter signup mini form
- Tag cloud
```

---

### 3. ARTICLE DETAIL PAGE

**Prompt cho Google Stitch:**
```
Design a blog article detail page optimized for reading.

Header:
- Category breadcrumb
- Title (large, bold H1)
- Meta info: author avatar + name, publish date, read time, view count
- Share buttons (Facebook, LinkedIn, Copy link)

Featured Image:
- Full-width hero image
- Caption below

Article Content:
- Max-width 720px, centered
- Clean typography with good line-height
- Section headings (H2, H3) with left border accent
- Code blocks with syntax highlighting
- Blockquotes with left blue border
- Images inline with captions
- Related internal links highlighted

Table of Contents:
- Sticky sidebar on desktop
- Collapsible ToC listing H2 headings
- Active section highlighted

Author Box:
- Card at end of article
- Avatar, name, bio, social links
- "Xem tất cả bài viết" link

Related Articles:
- 3-column grid of related posts
- Smaller cards

CTA Section:
- Full-width card with gradient background
- "Cần tư vấn chi tiết về BIM?"
- Contact form or CTA button

Comments/Reactions (optional):
- Like/save buttons
- Comment section
```

---

### 4. CONTACT / LEAD PAGE

**Prompt cho Google Stitch:**
```
Design a contact page focused on lead generation for consulting services.

Hero:
- Split layout
- Left: Form
- Right: Image of professional consultant or modern office

Contact Form:
- Title: "Đăng ký tư vấn miễn phí"
- Fields: Họ tên*, Email*, Số điện thoại, Công ty, Nội dung cần tư vấn (textarea)
- Submit button: "Gửi yêu cầu" (amber, full-width)
- Privacy note below

Trust Elements:
- Icons with text: "Phản hồi trong 24h", "Tư vấn miễn phí", "Bảo mật thông tin"

Alternative Contact:
- Cards for: Hotline, Email, Zalo, LinkedIn
- Each with icon and click-to-action

FAQ Section:
- Accordion style
- Common questions about services
```

---

### 5. CHATBOT WIDGET

**Prompt cho Google Stitch:**
```
Design a floating chat widget for AI assistant.

Closed State:
- Circular button (56px) at bottom-right
- Chat icon or avatar
- Pulse animation to draw attention
- Tooltip: "Chat với AI Assistant"

Open State:
- Chat window (360px wide, 500px tall)
- Header: Avatar + "AI Assistant" + minimize button
- Message area:
  - AI messages: left-aligned, light gray background
  - User messages: right-aligned, blue background
  - Typing indicator (3 animated dots)
  - Message timestamps
- Quick replies: horizontal scrollable chips
- Input area: text field + send button + attachment option

Lead Capture Mode:
- When bot asks for contact info
- Inline form fields within chat
- Submit button
```

---

### 6. ADMIN DASHBOARD

**Prompt cho Google Stitch:**
```
Design an admin dashboard for content management.

Sidebar:
- Logo at top
- Menu items with icons: Dashboard, Posts, Categories, Leads, Subscribers, Settings
- Collapse toggle
- User avatar at bottom

Dashboard Overview:
- Stats cards row: Total Posts, Total Views, New Leads, Subscribers
- Chart: Views over time (line chart)
- Recent leads table
- Recent drafts from AI crawler

Posts Management:
- Data table with columns: Title, Category, Status, Views, Date, Actions
- Status badges: Published (green), Draft (yellow), Archived (gray)
- Actions: Edit, View, Delete
- Filters: Status, Category, Date range
- Search box
- "New Post" button

Post Editor:
- Split view: Editor + Preview
- Toolbar: formatting, headings, images, links
- Category selector dropdown
- Featured image uploader
- Status toggle: Draft/Published
- "Generate with AI" button
- SEO preview section
```

---

### 7. MOBILE RESPONSIVE

**Prompt cho Google Stitch:**
```
Design mobile responsive versions of the key pages.

Mobile Header:
- Hamburger menu
- Logo centered
- Search icon

Mobile Blog Card:
- Full-width card
- Stacked layout: image on top, content below

Mobile Chat Widget:
- Full-screen when open
- Sticky input at bottom

Mobile Navigation:
- Slide-out drawer from left
- Full-height menu with all items
- Close button
```

---

## 🎨 COMPONENT LIBRARY

### Buttons
```
Primary: Blue filled, white text, rounded-lg
Secondary: Blue outline, blue text
CTA: Amber/orange gradient, white text, shadow
Ghost: Transparent, gray text
```

### Cards
```
Border: none or 1px light gray
Shadow: sm (default), md (hover)
Radius: 12px
Padding: 16-24px
```

### Inputs
```
Border: 1px gray, 2px blue on focus
Radius: 8px
Height: 44px
Label: above, small, gray
Error: red border, red text below
```

### Badges/Tags
```
Small, rounded-full, colored background
Category colors:
- BIM: Blue
- Pháp luật: Purple
- Case Study: Green
- Chuyển đổi số: Orange
- Công cụ: Teal
```

---

## 📐 LAYOUT SPECS

```
Container max-width: 1280px
Gutter: 24px (desktop), 16px (mobile)
Section padding: 80px (desktop), 48px (mobile)
Card gap: 24px
Border radius: 8px (small), 12px (medium), 16px (large)
```

---

## 🖼️ IMAGE GUIDELINES

```
Hero images: 1920x800px, overlays allowed
Blog thumbnails: 800x450px (16:9)
Author avatars: 64x64px, circular
Icons: Lucide or Heroicons, 24px default
Illustrations: Isometric 3D style preferred (construction/tech themed)
```

---

## 💡 INTERACTION NOTES

- Hover on cards: slight lift (translateY -4px) + shadow increase
- Button click: scale down slightly (0.98)
- Page transitions: fade in
- Scroll animations: fade up for sections
- Chat typing: 3 dots bouncing animation
- Form success: checkmark animation + green message

---

## 📱 BREAKPOINTS

```
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
```
