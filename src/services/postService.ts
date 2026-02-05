import { supabase } from '../lib/supabase';
import type { Post, InsertTables, UpdateTables } from '../types/database';

export const postService = {
    // Get all published posts
    async getPublishedPosts(limit = 10, offset = 0) {
        const { data, error, count } = await supabase
            .from('posts')
            .select('*, categories(*)', { count: 'exact' })
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) throw error;
        return { posts: data, total: count };
    },

    // Get single post by slug
    async getPostBySlug(slug: string) {
        const { data, error } = await supabase
            .from('posts')
            .select('*, categories(*)')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (error) throw error;
        return data;
    },

    // Get posts by category
    async getPostsByCategory(categorySlug: string, limit = 10) {
        const { data, error } = await supabase
            .from('posts')
            .select('*, categories!inner(*)')
            .eq('categories.slug', categorySlug)
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    },

    // Get featured posts (high view count)
    async getFeaturedPosts(limit = 5) {
        const { data, error } = await supabase
            .from('posts')
            .select('*, categories(*)')
            .eq('status', 'published')
            .order('view_count', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    },

    // Search posts
    async searchPosts(query: string, limit = 10) {
        const { data, error } = await supabase
            .from('posts')
            .select('*, categories(*)')
            .eq('status', 'published')
            .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
            .order('published_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    },

    // Increment view count
    async incrementViewCount(postId: string) {
        const { error } = await supabase.rpc('increment_view_count', { post_id: postId });
        if (error) {
            // Fallback: manual increment
            const { data: post } = await supabase
                .from('posts')
                .select('view_count')
                .eq('id', postId)
                .single();

            if (post) {
                await supabase
                    .from('posts')
                    .update({ view_count: (post.view_count || 0) + 1 })
                    .eq('id', postId);
            }
        }
    },

    // Admin: Create post
    async createPost(post: InsertTables<'posts'>) {
        const { data, error } = await supabase
            .from('posts')
            .insert(post)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Admin: Update post
    async updatePost(id: string, updates: UpdateTables<'posts'>) {
        const { data, error } = await supabase
            .from('posts')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Admin: Delete post
    async deletePost(id: string) {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },
};

export default postService;
