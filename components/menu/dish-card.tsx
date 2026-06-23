'use client';

import { Plus, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import type { DishWithCategory } from '@/lib/database.types';

interface DishCardProps {
  dish: DishWithCategory;
}

const dishImages: Record<string, string> = {
  'shashlyk-svynya': 'https://images.pexels.com/photos/2234526/pexels-photo-2234526.jpeg?auto=compress&cs=tinysrgb&w=600',
  'shashlyk-yalovychyna': 'https://images.pexels.com/photos/2429758/pexels-photo-2429758.jpeg?auto=compress&cs=tinysrgb&w=600',
  'shashlyk-kurka': 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600',
  'shashlyk-barannya': 'https://images.pexels.com/photos/5739297/pexels-photo-5739297.jpeg?auto=compress&cs=tinysrgb&w=600',
  'steak-ribeye': 'https://images.pexels.com/photos/7675595/pexels-photo-7675595.jpeg?auto=compress&cs=tinysrgb&w=600',
  'steak-filet-mignon': 'https://images.pexels.com/photos/8969230/pexels-photo-8969230.jpeg?auto=compress&cs=tinysrgb&w=600',
  'salad-caesar': 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
  'salad-greek': 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=600',
  'borsch': 'https://images.pexels.com/photos/1893509/pexels-photo-1893509.jpeg?auto=compress&cs=tinysrgb&w=600',
  'solyanka': 'https://images.pexels.com/photos/1600734/pexels-photo-1600734.jpeg?auto=compress&cs=tinysrgb&w=600',
  'potato-village': 'https://images.pexels.com/photos/1184072/pexels-photo-1184072.jpeg?auto=compress&cs=tinysrgb&w=600',
  'vegetables-grill': 'https://images.pexels.com/photos/10982369/pexels-photo-10982369.jpeg?auto=compress&cs=tinysrgb&w=600',
  'lemonade': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
  'tea-thyme': 'https://images.pexels.com/photos/1679909/pexels-photo-1679909.jpeg?auto=compress&cs=tinysrgb&w=600',
  'napoleon-cake': 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
  'honey-cake': 'https://images.pexels.com/photos/4620687/pexels-photo-4620687.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export function DishCard({ dish }: DishCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    addItem({
      id: dish.id,
      name: dish.name,
      price: Number(dish.price),
      imageUrl: dish.image_url || dishImages[dish.slug],
    });
    toast.success(`${dish.name} додано до кошика`);
  };

  const imageUrl = dish.image_url || dishImages[dish.slug] || 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600';

  return (
    <div className="group rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {dish.is_popular && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            <Flame className="w-3 h-3 mr-1" />
            Хіт
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{dish.name}</h3>
        {dish.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {dish.description}
          </p>
        )}
        {dish.ingredients && dish.ingredients.length > 0 && (
          <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
            {dish.ingredients.join(', ')}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-primary">
              {Number(dish.price).toFixed(0)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">грн</span>
            {dish.weight_grams && (
              <span className="text-xs text-muted-foreground ml-2">
                / {dish.weight_grams}г
              </span>
            )}
          </div>
          <Button size="sm" onClick={handleAddToCart}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
