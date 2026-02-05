import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';
import type { Category } from '../types/database';

type CategoryWithCount = Category & { postCount: number };

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryService.getCategories();
                setCategories(data || []);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
}

export function useCategoriesWithCount() {
    const [categories, setCategories] = useState<CategoryWithCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await categoryService.getCategoriesWithCount();
                setCategories(data || []);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
}
