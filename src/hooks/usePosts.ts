import { useState, useEffect } from 'react';
import { postService } from '../services/postService';
import type { Post, Category } from '../types/database';

type PostWithCategory = Post & { categories: Category | null };

interface UsePostsOptions {
    limit?: number;
    categorySlug?: string;
}

export function usePosts(options: UsePostsOptions = {}) {
    const { limit = 10, categorySlug } = options;
    const [posts, setPosts] = useState<PostWithCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                let data;

                if (categorySlug) {
                    data = await postService.getPostsByCategory(categorySlug, limit);
                } else {
                    const result = await postService.getPublishedPosts(limit);
                    data = result.posts;
                }

                setPosts(data || []);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [limit, categorySlug]);

    return { posts, loading, error };
}

export function usePost(slug: string) {
    const [post, setPost] = useState<PostWithCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                setLoading(true);
                const data = await postService.getPostBySlug(slug);
                setPost(data);

                // Track view
                if (data?.id) {
                    postService.incrementViewCount(data.id);
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch post'));
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    return { post, loading, error };
}

export function useFeaturedPosts(limit = 5) {
    const [posts, setPosts] = useState<PostWithCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await postService.getFeaturedPosts(limit);
                setPosts(data || []);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch featured posts'));
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [limit]);

    return { posts, loading, error };
}

export function useSearchPosts(query: string) {
    const [posts, setPosts] = useState<PostWithCategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!query || query.length < 2) {
            setPosts([]);
            return;
        }

        const searchPosts = async () => {
            try {
                setLoading(true);
                const data = await postService.searchPosts(query);
                setPosts(data || []);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to search posts'));
            } finally {
                setLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(searchPosts, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    return { posts, loading, error };
}
