# 💡 BRIEF: Personal Construction Tech Portal

**Ngày tạo:** 2026-02-05
**Brainstorm cùng:** User (Sales Rep @ CIC)
**Loại dự án:** Website cá nhân - Personal Branding

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT

**Góc nhìn cá nhân (Sales Rep):**
- Cần xây dựng **uy tín cá nhân** trong lĩnh vực chuyển đổi số xây dựng
- Khách hàng tiềm năng khó tìm được người **am hiểu** để tư vấn
- Cần kênh để **thu hút leads** một cách tự nhiên (không cold call)
- Muốn trở thành **thought leader** trong ngành

**Góc nhìn thị trường:**
- Thông tin pháp luật xây dựng **phân tán** trên nhiều nguồn
- Thiếu **case study thực tế** và **công cụ hữu ích** cho doanh nghiệp
- DN xây dựng **khó tiếp cận** kiến thức về BIM, AI, IoT

## 2. GIẢI PHÁP ĐỀ XUẤT

**AI-Powered Construction Tech Portal** - Website cá nhân chạy bằng AI:
- **AI Content Curation** - Tự động thu thập tin từ các nguồn uy tín
- **AI Tóm tắt** - Chuyển văn bản pháp luật thành dễ hiểu
- **AI Chatbot** - Tư vấn 24/7, trả lời câu hỏi visitor
- **Personal brand** - Xây dựng hình ảnh chuyên gia công nghệ
- **Soft sell** - Tự nhiên dẫn đến dịch vụ CIC

---

## 2.1. 🤖 CHIẾN LƯỢC AI-FIRST

### AI Agents (Chạy liên tục):

| Agent | Nhiệm vụ | Nguồn dữ liệu |
|-------|----------|---------------|
| **Content Curator** | Thu thập, phân loại tin tức mới | Autodesk, Bentley, Trimble, moc.gov.vn, luatvietnam... |
| **Summarizer** | Tóm tắt văn bản pháp luật dễ hiểu | Nghị định, Thông tư mới |
| **Chatbot Advisor** | Trả lời câu hỏi visitor 24/7 | Knowledge base từ bài viết |
| **Lead Scorer** | Đánh giá và xếp hạng leads | Hành vi người dùng |

### Automation Workflows (n8n/Make):

| Workflow | Trigger | Action |
|----------|---------|--------|
| **Content Crawl** | Hàng ngày 6AM | Crawl RSS/API từ các hãng → AI xử lý → Draft bài |
| **Legal Monitor** | Khi có văn bản mới | Crawl moc.gov.vn → AI tóm tắt → Notify anh |
| **Lead Alert** | Khi có form submit | Telegram/Zalo thông báo → Auto email welcome |
| **Social Post** | Khi publish bài mới | Auto đăng Facebook/LinkedIn |
| **Newsletter** | Hàng tuần | Tổng hợp top bài → Gửi email subscribers |

### Content Sources (Crawl tự động):

| Hãng | Website | Nội dung |
|------|---------|----------|
| **Autodesk** | blogs.autodesk.com, adsknews.autodesk.com | Revit, BIM 360, ACC updates |
| **Bentley** | bentley.com/news | iTwin, ProjectWise updates |
| **Trimble** | trimble.com/resources | Tekla, SketchUp, Viewpoint |
| **Oracle Aconex** | oracle.com/construction | Primavera, Aconex |
| **Procore** | procore.com/resources | Construction management |
| **Bộ Xây dựng** | moc.gov.vn | Văn bản pháp luật mới |
| **LuatVietnam** | luatvietnam.vn | Nghị định, Thông tư |

## 3. ĐỐI TƯỢNG SỬ DỤNG

| Nhóm | Mô tả | Nhu cầu chính |
|------|-------|---------------|
| **Primary** | DN xây dựng SME đang tìm hiểu BIM/chuyển đổi số | Kiến thức, tư vấn định hướng |
| **Secondary** | Kỹ sư, PM muốn cập nhật công nghệ | Kiến thức chuyên môn, công cụ |
| **Tertiary** | Chủ đầu tư quan tâm PropTech | Case study, so sánh giải pháp |

## 4. NGHIÊN CỨU THỊ TRƯỜNG

### 🏆 Đối thủ trong nước:

| Website | Điểm mạnh | Điểm yếu |
|---------|-----------|----------|
| **moc.gov.vn** | Nguồn chính thức từ Bộ Xây dựng | Giao diện cũ, không thân thiện, chậm cập nhật |
| **luatvietnam.vn** | Database lớn, tìm kiếm tốt | Không chuyên về xây dựng, mất phí |
| **thuvienphapluat.vn** | Phổ biến, nhiều văn bản | Quảng cáo nhiều, không có content chuyển đổi số |
| **xaydung.net** | Tin tức xây dựng | Không chuyên sâu công nghệ |

### 🌍 Xu hướng ConTech toàn cầu 2024-2025:

| Công nghệ | Trend | Tiềm năng ở VN |
|-----------|-------|----------------|
| **BIM** | Bắt buộc ở nhiều nước, tăng trưởng 3.6%/năm | 🔥 Cao - ND111 yêu cầu BIM |
| **AI/ML** | Tự động hóa thiết kế, dự báo chi phí | 🔥 Cao |
| **Digital Twin** | 40% tòa nhà lớn sẽ dùng đến 2027 | ⭐ Trung bình |
| **IoT/Smart Building** | Quản lý năng lượng, an toàn | ⭐ Trung bình |
| **3D Printing, Modular** | Giảm chi phí, thời gian | 🌱 Mới |
| **Drone & Robotics** | Khảo sát, thi công | ⭐ Trung bình |

### 💡 Cơ hội cho CIC Portal:

1. **Khoảng trống lớn:** Không có portal nào tập trung vào chuyển đổi số xây dựng ở VN
2. **Nhu cầu thực tế:** ND111, ND175 thúc đẩy BIM, database quốc gia
3. **Lead gen hiệu quả:** Content marketing + SEO là cách tốt nhất để thu hút doanh nghiệp xây dựng

### ⚠️ Rủi ro:

1. Cần nội dung chất lượng cao, liên tục
2. SEO cạnh tranh với các site lớn
3. Cần thời gian để xây dựng uy tín

## 5. MÔ HÌNH KINH DOANH (Personal Brand Funnel)

```
┌─────────────────────────────────────────────────────────────┐
│              PERSONAL CONSTRUCTION TECH PORTAL               │
│                  (Website cá nhân của Anh)                   │
├─────────────────────────────────────────────────────────────┤
│  ATTRACT (Content miễn phí)    │  CONVERT (Leads cá nhân)   │
│  ✓ Bài viết kiến thức BIM/CĐS  │  → Đăng ký nhận newsletter │
│  ✓ Tin pháp luật xây dựng      │  → Download tài liệu free  │
│  ✓ Case study từ kinh nghiệm   │  → Form tư vấn 1-1         │
│  ✓ Công cụ tính toán           │  → Zalo/Phone trực tiếp    │
├─────────────────────────────────────────────────────────────┤
│          CLOSE (Anh tư vấn → CIC cung cấp dịch vụ)          │
│     Tư vấn BIM │ Phần mềm quản lý │ Đào tạo chuyển đổi số   │
└─────────────────────────────────────────────────────────────┘
```

**Lợi ích cho anh:**
- Khách hàng tự tìm đến (inbound) thay vì cold call
- Xây dựng uy tín trước khi bán hàng
- Database khách hàng tiềm năng cá nhân
- Độc lập với marketing của công ty

## 6. TÍNH NĂNG ĐỀ XUẤT

### 🚀 MVP (Phase 1 - Website + AI Core):

| # | Tính năng | Mô tả | Độ khó |
|---|-----------|-------|--------|
| 1 | **Trang chủ** | Hero, tin nổi bật, giới thiệu bản thân | 🟢 Dễ |
| 2 | **Blog/Tin tức** | Bài viết theo danh mục, tìm kiếm | 🟢 Dễ |
| 3 | **AI Chatbot** | Trả lời câu hỏi visitor 24/7 | 🟡 TB |
| 4 | **Lead Capture** | Form, popup, CTA → Telegram notify | 🟢 Dễ |
| 5 | **SEO Optimized** | Meta, sitemap, schema.org | 🟢 Dễ |
| 6 | **CMS Admin** | Quản lý bài viết + AI drafts | 🟡 TB |

### 🤖 Phase 2 (AI Automation):

| # | Tính năng | Mô tả | Độ khó |
|---|-----------|-------|--------|
| 7 | **Content Crawler** | Tự động crawl từ Autodesk, Bentley... | 🟡 TB |
| 8 | **AI Summarizer** | Tóm tắt văn bản pháp luật | 🟡 TB |
| 9 | **Auto Newsletter** | Gửi email weekly digest | 🟡 TB |
| 10 | **Social Auto-post** | Đăng Facebook/LinkedIn tự động | 🟡 TB |
| 11 | **Legal Monitor** | Alert khi có văn bản mới | 🟡 TB |

### 🎁 Phase 3 (Advanced):

| # | Tính năng | Mô tả | Độ khó |
|---|-----------|-------|--------|
| 12 | **Lead Scoring AI** | Đánh giá chất lượng leads | 🔴 Khó |
| 13 | **Personalization** | Gợi ý bài viết theo hành vi | 🔴 Khó |
| 14 | **Thư viện văn bản** | Download PDF với AI summary | 🟡 TB |
| 15 | **Công cụ tính toán** | Ước tính chi phí BIM, ROI | � TB |
| 16 | **So sánh phần mềm** | Directory + AI comparison | 🟡 TB |

## 7. ĐIỂM KHÁC BIỆT (Personal Brand USP)

| So với đối thủ | Portal của Anh |
|----------------|----------------|
| Website công ty vô hồn | **Góc nhìn cá nhân, chân thực** |
| Pháp luật chung chung | **Chuyên sâu xây dựng + chuyển đổi số** |
| Chỉ văn bản khô khan | **Phân tích, giải thích dễ hiểu từ người trong nghề** |
| Không có case study | **Case study từ kinh nghiệm thực tế** |
| Không có tư vấn | **Tư vấn 1-1 trực tiếp với anh** |

## 8. TECH STACK ĐỀ XUẤT (AI-First)

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│  Next.js 14 (App Router) + TailwindCSS + Shadcn/ui          │
├─────────────────────────────────────────────────────────────┤
│                        BACKEND                              │
│  Supabase (Auth, PostgreSQL, Storage, Edge Functions)       │
├─────────────────────────────────────────────────────────────┤
│                     AI & AUTOMATION                         │
│  n8n (Self-hosted) / Make.com                               │
│  OpenAI GPT-4 / Claude API (Summarize, Chatbot)             │
│  Firecrawl / Browserless (Web Scraping)                     │
├─────────────────────────────────────────────────────────────┤
│                       INTEGRATIONS                          │
│  Telegram Bot API (Lead alerts)                             │
│  Resend / Loops (Email automation)                          │
│  Meta API (Facebook auto-post)                              │
│  LinkedIn API (Social posting)                              │
├─────────────────────────────────────────────────────────────┤
│                        HOSTING                              │
│  Vercel (Frontend) + Supabase (Backend)                     │
│  n8n on Railway / Render (Automation)                       │
└─────────────────────────────────────────────────────────────┘
```

## 9. ƯỚC TÍNH SƠ BỘ

| Phase | Scope | Thời gian | Ghi chú |
|-------|-------|-----------|---------|
| **MVP** | 7 tính năng cơ bản | 2-3 tuần | Đủ để launch |
| **Phase 2** | +5 tính năng nâng cao | 2-3 tuần | Tăng engagement |
| **Phase 3** | AI + Community | 4-6 tuần | Scale up |

## 10. BƯỚC TIẾP THEO

> 📋 Khi anh sẵn sàng, gõ `/plan` để tạo thiết kế chi tiết với:
> - Sơ đồ database
> - Wireframe UI
> - Task list chi tiết
> - Timeline cụ thể

---

**Ghi chú:**
- Brief này là kết quả brainstorm ban đầu
- Có thể điều chỉnh dựa trên feedback của anh
- Lưu tại: `docs/BRIEF.md`
