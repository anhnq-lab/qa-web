---
description: 📝 Tự động nghiên cứu, viết bài chuẩn SEO và đăng lên website AI Construction
---

# /write-blog - Auto Research & Publish Blog Post

## 🎯 MỤC ĐÍCH
Workflow này giúp Agent tự động:
1. Nhận chủ đề từ user
2. Research và thu thập thông tin
3. Viết bài chuẩn SEO với personal brand tone
4. Tự động đăng lên Supabase database
5. Confirm link bài viết cho user

---

## 📋 CÁC BƯỚC THỰC HIỆN

### BƯỚC 1: NHẬN YÊU CẦU TỪ USER
// turbo

Xác định thông tin từ user:
- **Chủ đề bài viết**: [User cung cấp hoặc gợi ý từ content calendar]
- **Loại bài**: Educational / Comparison / How-to / Legal / Case Study / Listicle / Trend
- **Từ khóa chính**: [Xác định keyword SEO chính]
- **Độ dài mong muốn**: Mặc định 2,500-3,000 từ

Nếu user chỉ nói "viết bài về X", Agent tự động xác định loại bài phù hợp nhất.

---

### BƯỚC 2: RESEARCH CHỦ ĐỀ
// turbo

**2.1. Đọc Content Calendar để xem có outline sẵn không:**
```
Đọc file: d:\QuocAnh\qa-web\docs\content-calendar-2026.md
```

**2.2. Research trên web (nếu cần thông tin mới):**
- Sử dụng tool `search_web` để tìm:
  - Thống kê mới nhất về chủ đề
  - Quy định pháp luật liên quan (ND111, TT24, v.v.)
  - Xu hướng và case study
  - Số liệu từ các nguồn uy tín

**2.3. Kiểm tra Knowledge Items liên quan:**
- Đọc các KI về CIC Platform, BIM, Vietnamese Regulations
- Lấy thông tin accurate từ đã research trước đó

**2.4. Tổng hợp research thành outline:**
```markdown
# [TIÊU ĐỀ BÀI VIẾT]

## Meta Information
- Keyword chính: [...]
- Keywords phụ: [...]
- Loại bài: [...]
- Độ dài target: [...]

## Outline
1. Hook/Introduction
2. [Section 1]
3. [Section 2]
...
N. Conclusion + CTA
```

---

### BƯỚC 3: VIẾT NỘI DUNG
// turbo

**3.1. Đọc AI Prompt Template phù hợp:**
```
Đọc file: d:\QuocAnh\qa-web\docs\ai-content-prompts.md
Chọn prompt template theo loại bài
```

**3.2. Viết bài với các yêu cầu:**

**Persona & Tone:**
- Viết với tư cách: **Quốc Anh** - Chuyên gia BIM và Chuyển đổi số
- Tone: Chuyên nghiệp nhưng gần gũi, có câu chuyện cá nhân
- Ngôn ngữ: Tiếng Việt, có thể dùng thuật ngữ tiếng Anh khi cần

**Cấu trúc bắt buộc:**
1. **Hook mở đầu**: Câu chuyện/thống kê gây chú ý (2-3 đoạn)
2. **Nội dung chính**: 
   - Chia thành các H2 sections rõ ràng
   - Mỗi section có H3 nếu cần
   - Có bảng, list, blockquotes
3. **Ví dụ thực tế VN**: Ít nhất 1-2 ví dụ
4. **FAQ**: 3-5 câu hỏi thường gặp
5. **Kết luận + CTA**: Tóm tắt và kêu gọi hành động

**SEO Requirements:**
- Title: 50-60 ký tự, chứa keyword
- Meta description: 150-160 ký tự
- URL slug: Ngắn gọn, có keyword
- H1 = Title (chỉ 1 H1)
- H2, H3 chứa keywords phụ
- Internal links gợi ý: 3-5 bài liên quan

**3.3. Output format:**
Lưu bài viết vào: `d:\QuocAnh\qa-web\docs\blog-posts\[XXX]-[slug].md`
Trong đó XXX là số thứ tự tiếp theo (002, 003, ...)

---

### BƯỚC 4: XÁC ĐỊNH CATEGORY
// turbo

Query Supabase để lấy danh sách categories:
```sql
SELECT id, name, slug FROM categories ORDER BY name;
```

Mapping chủ đề với category phù hợp:
| Chủ đề | Category |
|--------|----------|
| BIM, Revit, Phần mềm, Digital Twin | `bim-cong-nghe` |
| Nghị định, Thông tư, Luật | `phap-luat` |
| Chuyển đổi số, AI, Automation | `chuyen-doi-so` |
| Templates, Tools, Hướng dẫn | `cong-cu` |
| Dự án thực tế, ROI | `case-study` |

---

### BƯỚC 5: ĐĂNG LÊN SUPABASE
// turbo

**5.1. Chuẩn bị dữ liệu:**
```javascript
{
  title: "[Tiêu đề bài viết]",
  slug: "[url-slug]",
  excerpt: "[Meta description 150-160 ký tự]",
  content: "[Nội dung markdown đầy đủ]",
  featured_image: null, // Có thể thêm sau
  category_id: "[UUID của category]",
  status: "published",
  ai_generated: true,
  view_count: 0,
  published_at: "NOW()"
}
```

**5.2. Execute SQL:**
```sql
INSERT INTO posts (title, slug, excerpt, content, category_id, status, ai_generated, published_at)
VALUES (
  '[title]',
  '[slug]',
  '[excerpt]',
  E'[content với escape characters]',
  '[category_id]',
  'published',
  true,
  NOW()
)
RETURNING id, title, slug;
```

**📌 LƯU Ý QUAN TRỌNG:**
- Escape các ký tự đặc biệt trong content: `'` → `''`
- Sử dụng `E'...'` syntax để hỗ trợ newlines
- Kiểm tra slug không trùng với bài đã có

---

### BƯỚC 6: XÁC NHẬN THÀNH CÔNG
// turbo

**6.1. Query để verify:**
```sql
SELECT id, title, slug, status, published_at, 
       (SELECT name FROM categories WHERE id = posts.category_id) as category
FROM posts 
WHERE slug = '[slug]';
```

**6.2. Thông báo cho user:**
```
✅ BÀI VIẾT ĐÃ ĐĂNG THÀNH CÔNG!

📝 Tiêu đề: [title]
🔗 URL: /blog/[slug]
📁 Category: [category]
📅 Ngày đăng: [published_at]
📊 Độ dài: [word count] từ

🌐 Xem bài viết tại:
http://localhost:5173/blog/[slug]

📄 File gốc lưu tại:
d:\QuocAnh\qa-web\docs\blog-posts\[XXX]-[slug].md
```

---

## 🔄 QUICK COMMANDS

User có thể sử dụng các lệnh nhanh:

| Lệnh | Mô tả |
|------|-------|
| `/write-blog [chủ đề]` | Viết và đăng bài mới |
| `/write-blog next` | Viết bài tiếp theo từ content calendar |
| `/write-blog draft [chủ đề]` | Chỉ viết, không đăng (lưu draft) |
| `/write-blog list` | Xem danh sách bài đã đăng |

---

## 📊 CATEGORIES REFERENCE

| Category ID | Tên | Slug |
|-------------|-----|------|
| 970381cd-740f-4fd5-aff0-46ae1d5cf7ba | BIM & Công nghệ | bim-cong-nghe |
| a35b3e86-47ae-4981-811f-c0d6644aa2f5 | Pháp luật xây dựng | phap-luat |
| fe41cb29-e4f7-472c-9953-f4c42365eb15 | Chuyển đổi số | chuyen-doi-so |
| b3d7ac13-463a-4572-8f52-69f7c0e34b26 | Công cụ & Hướng dẫn | cong-cu |
| 3aded972-5e3a-4394-8230-4c275333af72 | Case Study | case-study |

---

## 🛠️ SUPABASE PROJECT INFO

- **Project ID**: `bprtxdipsrhthmgumahs`
- **Project Name**: qa-ai-construction
- **Region**: ap-south-1

---

## 📝 CONTENT GUIDELINES

### Độ dài theo loại bài:
| Loại | Từ | Thời gian đọc |
|------|-----|---------------|
| Educational | 2,500-3,000 | 10-12 phút |
| Comparison | 2,000-2,500 | 8-10 phút |
| How-to Guide | 2,500-3,500 | 12-15 phút |
| Legal/Regulation | 2,000-2,500 | 8-10 phút |
| Case Study | 1,500-2,000 | 6-8 phút |
| Listicle | 2,000-3,000 | 8-12 phút |
| Trend | 2,000-2,500 | 8-10 phút |

### Elements bắt buộc:
- ✅ Hook cá nhân (câu chuyện/ví dụ thực tế)
- ✅ Ít nhất 1 bảng so sánh
- ✅ Số liệu cụ thể (có nguồn)
- ✅ Đề cập quy định VN nếu liên quan
- ✅ FAQ section
- ✅ CTA cuối bài
- ✅ Gợi ý internal links

---

## 🚀 VÍ DỤ SỬ DỤNG

**User**: `/write-blog Nghị định 111 về BIM bắt buộc`

**Agent sẽ tự động:**
1. ✅ Research về ND111, TT24
2. ✅ Viết bài ~2,500 từ với outline chuẩn
3. ✅ Lưu file vào docs/blog-posts/002-nghi-dinh-111.md
4. ✅ Insert vào Supabase với category "Pháp luật xây dựng"
5. ✅ Thông báo link cho user

---

*Workflow version: 1.0*
*Created: 05/02/2026*
