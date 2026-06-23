import Link from 'next/link';
import { DishCard } from '@/components/menu/dish-card';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight } from 'lucide-react';
import type { DishWithCategory } from '@/lib/database.types';

interface PopularDishesProps {
  dishes: DishWithCategory[];
}

export function PopularDishes({ dishes }: PopularDishesProps) {
  if (dishes.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Хіти продажів</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold">
              Популярні страви
            </h2>
          </div>
          <Button variant="outline" asChild className="group">
            <Link href="/menu">
              Дивитись все меню
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
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
