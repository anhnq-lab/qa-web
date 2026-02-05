import { supabase } from '../lib/supabase';

export const categoryService = {
    // Get all categories
    async getCategories() {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');

        if (error) throw error;
        return data;
    },

    // Get category by slug
    async getCategoryBySlug(slug: string) {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;
        return data;
    },

    // Get categories with post count
    async getCategoriesWithCount() {
        const { data: categories, error: catError } = await supabase
            .from('categories')
            .select('*');

        if (catError) throw catError;

        const { data: posts, error: postError } = await supabase
            .from('posts')
            .select('category_id')
            .eq('status', 'published');

        if (postError) throw postError;

        return categories.map(cat => ({
            ...cat,
            postCount: posts.filter(p => p.category_id === cat.id).length,
        }));
    },
};

export default categoryService;
