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
  'shashlyk-svynya': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  'shashlyk-yalovychyna': 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',
  'shashlyk-kurka': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80',
  'shashlyk-barannya': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
  'steak-ribeye': 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=600&q=80',
  'steak-filet-mignon': 'https://images.unsplash.com/photo-1603048297172-925c627c9cfb?w=600&q=80',
  'salad-caesar': 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80',
  'salad-greek': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
  'borsch': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
  'solyanka': 'https://images.unsplash.com/photo-1604762524885-3b3f7e0c6d8a?w=600&q=80',
  'potato-village': 'https://images.unsplash.com/photo-1592415497089-6c3cf76b3d2e?w=600&q=80',
  'vegetables-grill': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
  'lemonade': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
  'tea-thyme': 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
  'napoleon-cake': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
  'honey-cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
};

const fallbackImage =
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80';

export function DishCard({ dish }: DishCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    addItem({
      id: dish.id,
      name: dish.name,
      price: Number(dish.price),
      imageUrl: dish.image_url || dishImages[dish.slug] || fallbackImage,
    });
    toast.success(`${dish.name} додано до кошика`);
  };

  const imageUrl =
    dish.image_url || dishImages[dish.slug] || fallbackImage;

  return (
    <div className="group rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {dish.is_popular && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground shadow-lg">
            <Flame className="w-3 h-3 mr-1" />
            Хіт
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{dish.name}</h3>
        {dish.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
            {dish.description}
          </p>
        )}
        {dish.ingredients && dish.ingredients.length > 0 && (
          <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
            {dish.ingredients.join(', ')}
          </p>
        )}
        <div className="flex items-center justify-between pt-2 border-t">
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
          <Button size="sm" onClick={handleAddToCart} className="shadow-sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
