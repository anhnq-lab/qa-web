# Phase 01: Setup & Infrastructure
Status: ⬜ Pending
Dependencies: None

## Objective
Thiết lập project Next.js 14, cấu hình Supabase, và chuẩn bị môi trường development.

## Requirements

### Functional
- [ ] Next.js 14 với App Router
- [ ] TailwindCSS + Shadcn/ui components
- [ ] Supabase client configuration
- [ ] Environment variables setup
- [ ] Basic layout structure

### Non-Functional
- [ ] TypeScript strict mode
- [ ] ESLint + Prettier configured
- [ ] Git repository initialized

## Implementation Steps

1. [ ] **Khởi tạo Next.js project**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
   ```

2. [ ] **Cài đặt dependencies**
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   npm install lucide-react class-variance-authority clsx tailwind-merge
   npx shadcn@latest init
   ```

3. [ ] **Cấu hình Shadcn/ui components**
   ```bash
   npx shadcn@latest add button card input form dialog sheet
   ```

4. [ ] **Setup Supabase client**
   - Tạo `src/lib/supabase/client.ts`
   - Tạo `src/lib/supabase/server.ts`
   - Tạo `src/lib/supabase/middleware.ts`

5. [ ] **Cấu hình environment variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   OPENAI_API_KEY=
   TELEGRAM_BOT_TOKEN=
   TELEGRAM_CHAT_ID=
   ```

6. [ ] **Tạo layout cơ bản**
   - Header với navigation
   - Footer với contact info
   - Responsive sidebar

7. [ ] **Tạo global styles**
   - Color scheme (professional dark/light)
   - Typography system
   - Spacing utilities

8. [ ] **Verify build thành công**
   ```bash
   npm run build
   npm run dev
   ```

## Files to Create

| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Browser Supabase client |
| `src/lib/supabase/server.ts` | Server Supabase client |
| `src/app/layout.tsx` | Root layout with providers |
| `src/components/layout/Header.tsx` | Site header |
| `src/components/layout/Footer.tsx` | Site footer |
| `.env.local` | Environment variables |

## Test Criteria
- [ ] `npm run build` passes without errors
- [ ] `npm run dev` starts successfully on localhost:3000
- [ ] Homepage renders with header/footer
- [ ] Supabase connection test passes

## Notes
- Sử dụng Supabase project có sẵn hoặc tạo mới
- Đảm bảo TypeScript strict mode
- Commit code sau mỗi step hoàn thành

---
Next Phase: [phase-02-database.md](./phase-02-database.md)
