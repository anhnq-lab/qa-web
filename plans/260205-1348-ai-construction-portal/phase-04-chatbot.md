# Phase 04: AI Chatbot
Status: ⬜ Pending
Dependencies: Phase 02, Phase 03

## Objective
Tích hợp AI Chatbot để trả lời câu hỏi visitor 24/7 dựa trên knowledge base từ bài viết.

## Requirements

### Functional
- [ ] Floating chat widget trên mọi trang
- [ ] Chat với AI (GPT-4/Claude)
- [ ] Context từ bài viết (RAG)
- [ ] Lưu chat history
- [ ] Lead capture integration
- [ ] Typing indicators & animations

### Non-Functional
- [ ] Streaming responses
- [ ] Mobile-friendly widget
- [ ] Offline graceful degradation

## Implementation Steps

1. [ ] **Chat widget component**
   ```typescript
   // src/components/chat/ChatWidget.tsx
   - Floating button (bottom-right)
   - Expandable chat window
   - Message list
   - Input field
   - Send button
   ```

2. [ ] **Chat API route**
   ```typescript
   // src/app/api/chat/route.ts
   POST /api/chat
   - Receive message
   - Retrieve relevant context (RAG)
   - Call OpenAI/Claude
   - Stream response
   - Save to chat_sessions
   ```

3. [ ] **Knowledge base indexing**
   ```typescript
   // src/services/ragService.ts
   - indexPosts() - Build embeddings từ posts
   - searchContext(query) - Tìm relevant posts
   - Using Supabase Vector (pgvector)
   ```

4. [ ] **Chat service**
   ```typescript
   // src/services/chatService.ts
   - createSession(visitorId)
   - addMessage(sessionId, role, content)
   - getSession(sessionId)
   - convertToLead(sessionId, leadData)
   ```

5. [ ] **Lead capture trong chat**
   - Khi visitor hỏi về tư vấn
   - Bot hỏi thông tin (name, email, phone)
   - Tự động tạo lead record
   - Notify qua Telegram

6. [ ] **System prompt design**
   ```
   Bạn là trợ lý AI của [Tên anh], chuyên gia về chuyển đổi số trong ngành xây dựng.
   
   Nhiệm vụ:
   - Trả lời câu hỏi về BIM, pháp luật xây dựng, công nghệ
   - Hướng dẫn visitor đến bài viết phù hợp
   - Nếu câu hỏi phức tạp, gợi ý liên hệ tư vấn 1-1
   
   Phong cách:
   - Thân thiện, chuyên nghiệp
   - Dùng tiếng Việt
   - Ngắn gọn, dễ hiểu
   ```

7. [ ] **Streaming UI**
   - Hiển thị typing indicator
   - Stream text character by character
   - Smooth animations

8. [ ] **Visitor tracking**
   - Generate visitor ID (localStorage)
   - Track sessions across pages
   - Link to lead when converted

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/chat/ChatWidget.tsx` | Floating chat widget |
| `src/components/chat/ChatMessage.tsx` | Message bubble component |
| `src/components/chat/ChatInput.tsx` | Input with send button |
| `src/app/api/chat/route.ts` | Chat API endpoint |
| `src/services/chatService.ts` | Chat CRUD operations |
| `src/services/ragService.ts` | RAG/Vector search |
| `src/hooks/useChat.ts` | Chat state management |

## Database Updates

```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embeddings column to posts
ALTER TABLE posts ADD COLUMN embedding vector(1536);

-- Create index for vector search
CREATE INDEX ON posts USING ivfflat (embedding vector_cosine_ops);
```

## Test Criteria
- [ ] Chat widget appears on all pages
- [ ] Messages sent and received correctly
- [ ] AI responds with relevant context from posts
- [ ] Streaming works smoothly
- [ ] Chat history persists in session
- [ ] Lead capture flow works
- [ ] Telegram notification sent on lead

---
Next Phase: [phase-05-leads.md](./phase-05-leads.md)
