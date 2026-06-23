import { supabase } from '@/lib/supabase';
import { HeroSection } from '@/components/home/hero-section';
import { PopularDishes } from '@/components/home/popular-dishes';
import { CategoriesPreview } from '@/components/home/categories-preview';
import { DeliveryInfo } from '@/components/home/delivery-info';
import { ReservationCTA } from '@/components/home/reservation-cta';

export default async function HomePage() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  const { data: dishes } = await supabase
    .from('dishes')
    .select('*, categories(*)')
    .eq('is_available', true)
    .eq('is_popular', true)
    .order('display_order', { ascending: true })
    .limit(8);

  return (
    <div>
      <HeroSection />
      <PopularDishes dishes={dishes || []} />
      <CategoriesPreview categories={categories || []} />
      <DeliveryInfo />
      <ReservationCTA />
    </div>
  );
}
