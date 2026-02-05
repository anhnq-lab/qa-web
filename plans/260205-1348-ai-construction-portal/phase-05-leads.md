# Phase 05: Lead Capture & Notifications
Status: ⬜ Pending
Dependencies: Phase 02

## Objective
Triển khai hệ thống thu thập leads và thông báo real-time qua Telegram.

## Requirements

### Functional
- [ ] Contact form trên trang chính
- [ ] Newsletter signup form
- [ ] Download tài liệu (lead magnet)
- [ ] Exit-intent popup
- [ ] Telegram notification khi có lead mới
- [ ] Email welcome tự động

### Non-Functional
- [ ] Form validation
- [ ] Spam protection (honeypot)
- [ ] Rate limiting

## Implementation Steps

1. [ ] **Contact form component**
   ```typescript
   // src/components/forms/ContactForm.tsx
   Fields:
   - Name (required)
   - Email (required)
   - Phone (optional)
   - Company (optional)
   - Message (required)
   - Source (hidden - page URL)
   ```

2. [ ] **Newsletter form**
   ```typescript
   // src/components/forms/NewsletterForm.tsx
   - Email field
   - Subscribe button
   - Success/error states
   ```

3. [ ] **Download gated content**
   ```typescript
   // src/components/forms/DownloadForm.tsx
   - Email required to download
   - Track which resource
   - Auto-add to subscribers
   ```

4. [ ] **Exit-intent popup**
   ```typescript
   // src/components/modals/ExitPopup.tsx
   - Detect mouse leaving viewport
   - Show only once per session
   - Newsletter signup CTA
   ```

5. [ ] **Lead API route**
   ```typescript
   // src/app/api/leads/route.ts
   POST /api/leads
   - Validate input
   - Check spam (honeypot)
   - Save to leads table
   - Send Telegram notification
   - Send welcome email
   ```

6. [ ] **Telegram notification service**
   ```typescript
   // src/services/telegramService.ts
   - sendMessage(text)
   - formatLeadMessage(lead)
   
   Format:
   🔔 *New Lead!*
   👤 Name: {name}
   📧 Email: {email}
   📱 Phone: {phone}
   🏢 Company: {company}
   📝 Message: {message}
   🔗 Source: {source}
   ```

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/forms/ContactForm.tsx` | Main contact form |
| `src/components/forms/NewsletterForm.tsx` | Email signup |
| `src/components/forms/DownloadForm.tsx` | Gated content |
| `src/components/modals/ExitPopup.tsx` | Exit intent popup |
| `src/app/api/leads/route.ts` | Lead submission API |
| `src/app/api/subscribe/route.ts` | Newsletter API |
| `src/services/telegramService.ts` | Telegram bot |
| `src/services/emailService.ts` | Email sending |

## Environment Variables

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
RESEND_API_KEY=your_resend_key
```

## Test Criteria
- [ ] Contact form validates and submits
- [ ] Newsletter signup works
- [ ] Download form gates content
- [ ] Exit popup shows correctly
- [ ] Telegram receives notification
- [ ] Welcome email sent
- [ ] Honeypot blocks spam submissions

---
Next Phase: [phase-06-automation.md](./phase-06-automation.md)
