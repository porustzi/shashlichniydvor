import { supabase } from '@/lib/supabase';
import { MenuClient } from './menu-client';

interface MenuPageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: categories } = await (supabase as any)
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dishesQuery = supabase
    .from('dishes')
    .select('*, categories(*)')
    .eq('is_available', true)
    .order('display_order', { ascending: true }) as any;

  if (searchParams.category && searchParams.category !== 'all') {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', searchParams.category)
      .single();
    if (category && (category as any).id) {
      dishesQuery = dishesQuery.eq('category_id', (category as any).id);
    }
  }

  if (searchParams.search) {
    dishesQuery = dishesQuery.ilike('name', `%${searchParams.search}%`);
  }

  const { data: dishes } = await dishesQuery;

  return (
    <MenuClient
      categories={categories || []}
      dishes={dishes || []}
      initialCategory={searchParams.category || 'all'}
      initialSearch={searchParams.search || ''}
    />
  );
}
