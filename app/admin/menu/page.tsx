import { supabase } from '@/lib/supabase';
import { MenuAdminClient } from './menu-client';

export default async function AdminMenuPage() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true });

  const { data: dishes } = await supabase
    .from('dishes')
    .select('*, categories(*)')
    .order('display_order', { ascending: true });

  return (
    <MenuAdminClient
      categories={categories || []}
      initialDishes={dishes || []}
    />
  );
}
