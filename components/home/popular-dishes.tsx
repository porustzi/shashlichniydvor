import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { DishCard } from '@/components/menu/dish-card';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';
import type { DishWithCategory } from '@/lib/database.types';

interface PopularDishesProps {
  dishes: DishWithCategory[];
}

export async function PopularDishes({ dishes }: PopularDishesProps) {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Хіти продажів</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold">
              Популярні страви
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/menu">Дивитись все меню</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
}
