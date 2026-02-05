export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    icon: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    icon?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    icon?: string | null
                    created_at?: string
                }
            }
            posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string | null
                    content: string | null
                    featured_image: string | null
                    category_id: string | null
                    status: 'draft' | 'published' | 'archived'
                    source_url: string | null
                    source_name: string | null
                    ai_generated: boolean
                    view_count: number
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    excerpt?: string | null
                    content?: string | null
                    featured_image?: string | null
                    category_id?: string | null
                    status?: 'draft' | 'published' | 'archived'
                    source_url?: string | null
                    source_name?: string | null
                    ai_generated?: boolean
                    view_count?: number
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    excerpt?: string | null
                    content?: string | null
                    featured_image?: string | null
                    category_id?: string | null
                    status?: 'draft' | 'published' | 'archived'
                    source_url?: string | null
                    source_name?: string | null
                    ai_generated?: boolean
                    view_count?: number
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            leads: {
                Row: {
                    id: string
                    name: string
                    email: string
                    phone: string | null
                    company: string | null
                    message: string | null
                    source: string | null
                    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
                    score: number
                    metadata: Json
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    email: string
                    phone?: string | null
                    company?: string | null
                    message?: string | null
                    source?: string | null
                    status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
                    score?: number
                    metadata?: Json
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    email?: string
                    phone?: string | null
                    company?: string | null
                    message?: string | null
                    source?: string | null
                    status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
                    score?: number
                    metadata?: Json
                    created_at?: string
                    updated_at?: string
                }
            }
            subscribers: {
                Row: {
                    id: string
                    email: string
                    name: string | null
                    status: 'active' | 'unsubscribed' | 'bounced'
                    subscribed_at: string
                    unsubscribed_at: string | null
                }
                Insert: {
                    id?: string
                    email: string
                    name?: string | null
                    status?: 'active' | 'unsubscribed' | 'bounced'
                    subscribed_at?: string
                    unsubscribed_at?: string | null
                }
                Update: {
                    id?: string
                    email?: string
                    name?: string | null
                    status?: 'active' | 'unsubscribed' | 'bounced'
                    subscribed_at?: string
                    unsubscribed_at?: string | null
                }
            }
            content_sources: {
                Row: {
                    id: string
                    name: string
                    url: string
                    feed_url: string | null
                    category: string | null
                    is_active: boolean
                    last_crawled_at: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    url: string
                    feed_url?: string | null
                    category?: string | null
                    is_active?: boolean
                    last_crawled_at?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    url?: string
                    feed_url?: string | null
                    category?: string | null
                    is_active?: boolean
                    last_crawled_at?: string | null
                    created_at?: string
                }
            }
            chat_sessions: {
                Row: {
                    id: string
                    visitor_id: string | null
                    messages: Json
                    lead_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    visitor_id?: string | null
                    messages?: Json
                    lead_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    visitor_id?: string | null
                    messages?: Json
                    lead_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            page_views: {
                Row: {
                    id: string
                    path: string
                    post_id: string | null
                    visitor_id: string | null
                    referrer: string | null
                    user_agent: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    path: string
                    post_id?: string | null
                    visitor_id?: string | null
                    referrer?: string | null
                    user_agent?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    path?: string
                    post_id?: string | null
                    visitor_id?: string | null
                    referrer?: string | null
                    user_agent?: string | null
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Convenient type aliases
export type Category = Tables<'categories'>
export type Post = Tables<'posts'>
export type Lead = Tables<'leads'>
export type Subscriber = Tables<'subscribers'>
export type ContentSource = Tables<'content_sources'>
export type ChatSession = Tables<'chat_sessions'>
export type PageView = Tables<'page_views'>
