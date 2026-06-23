'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { MenuClient } from './menu-client';
import type { Category, DishWithCategory } from '@/lib/database.types';

export default function MenuPage() {
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<DishWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const categorySlug = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    async function fetchData() {
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      let dishesQuery = supabase
        .from('dishes')
        .select('*, categories(*)')
        .eq('is_available', true)
        .order('display_order', { ascending: true });

      if (categorySlug && categorySlug !== 'all') {
        const { data: category } = await (supabase as any)
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();
        if (category) {
          dishesQuery = dishesQuery.eq('category_id', (category as any).id);
        }
      }

      if (searchQuery) {
        dishesQuery = dishesQuery.ilike('name', `%${searchQuery}%`);
      }

      const { data: dishesData } = await dishesQuery;

      setCategories(categoriesData || []);
      setDishes(dishesData || []);
      setLoading(false);
    }

    fetchData();
  }, [categorySlug, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Завантаження...</div>
      </div>
    );
  }

  return (
    <MenuClient
      categories={categories}
      dishes={dishes}
      initialCategory={categorySlug}
      initialSearch={searchQuery}
    />
  );
}
