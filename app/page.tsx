'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { HeroSection } from '@/components/home/hero-section';
import { PopularDishes } from '@/components/home/popular-dishes';
import { CategoriesPreview } from '@/components/home/categories-preview';
import { DeliveryInfo } from '@/components/home/delivery-info';
import { ReservationCTA } from '@/components/home/reservation-cta';
import { fallbackCategories, fallbackDishes } from '@/lib/fallback-data';
import type { Category, DishWithCategory } from '@/lib/database.types';

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dishes, setDishes] = useState<DishWithCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        const { data: dishesData, error: dishesError } = await supabase
          .from('dishes')
          .select('*, categories(*)')
          .eq('is_available', true)
          .eq('is_popular', true)
          .order('display_order', { ascending: true })
          .limit(8);

        if (categoriesError || !categoriesData || categoriesData.length === 0) {
          setCategories(fallbackCategories);
        } else {
          setCategories(categoriesData);
        }

        if (dishesError || !dishesData || dishesData.length === 0) {
          setDishes(fallbackDishes.filter((d) => d.is_popular).slice(0, 8));
        } else {
          setDishes(dishesData);
        }
      } catch {
        setCategories(fallbackCategories);
        setDishes(fallbackDishes.filter((d) => d.is_popular).slice(0, 8));
      } finally {
        setLoading(false);
      }
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
