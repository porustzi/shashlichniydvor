'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MenuAdminClient } from './menu-client';
import type { Category, DishWithCategory } from '@/lib/database.types';

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<DishWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      const { data: dishesData } = await supabase
        .from('dishes')
        .select('*, categories(*)')
        .order('display_order', { ascending: true });

      setCategories(categoriesData || []);
      setDishes(dishesData || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Завантаження...</div>
      </div>
    );
  }

  return <MenuAdminClient categories={categories} initialDishes={dishes} />;
}
