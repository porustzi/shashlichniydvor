'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { HeroSection } from '@/components/home/hero-section';
import { PopularDishes } from '@/components/home/popular-dishes';
import { CategoriesPreview } from '@/components/home/categories-preview';
import { DeliveryInfo } from '@/components/home/delivery-info';
import { ReservationCTA } from '@/components/home/reservation-cta';
import type { Category, DishWithCategory } from '@/lib/database.types';

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<DishWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      const { data: dishesData } = await supabase
        .from('dishes')
        .select('*, categories(*)')
        .eq('is_available', true)
        .eq('is_popular', true)
        .order('display_order', { ascending: true })
        .limit(8);

      setCategories(categoriesData || []);
      setDishes(dishesData || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      <HeroSection />
      <PopularDishes dishes={loading ? [] : dishes} />
      <CategoriesPreview categories={loading ? [] : categories} />
      <DeliveryInfo />
      <ReservationCTA />
    </div>
  );
}
