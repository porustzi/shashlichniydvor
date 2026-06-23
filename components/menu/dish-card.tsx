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

const fallbackImage = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80';

export function DishCard({ dish }: DishCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: dish.id,
      name: dish.name,
      price: Number(dish.price),
      imageUrl: dish.image_url || dishImages[dish.slug] || fallbackImage,
    });
    toast.success(`${dish.name} додано до кошика`);
  };

  const imageUrl = dish.image_url || dishImages[dish.slug] || fallbackImage;

  return (
    <div className="flex flex-col sm:flex-row rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="relative w-full sm:w-44 lg:w-52 shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[160px] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {dish.is_popular && (
          <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary text-primary-foreground shadow-lg text-xs">
            <Flame className="w-3 h-3 mr-1" />
            Хіт
          </Badge>
        )}
      </div>

      <div className="flex-1 flex flex-col p-3 sm:p-4 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-base sm:text-lg leading-tight">{dish.name}</h3>
        </div>

        {dish.ingredients && dish.ingredients.length > 0 && (
          <p className="text-xs text-muted-foreground mb-1.5 line-clamp-1">
            {dish.ingredients.join(', ')}
          </p>
        )}

        {dish.description && (
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {dish.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2 border-t">
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-bold text-primary">
              {Number(dish.price).toFixed(0)}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">грн</span>
            {dish.weight_grams && (
              <span className="text-xs text-muted-foreground">
                / {dish.weight_grams}г
              </span>
            )}
          </div>
          <Button size="sm" onClick={handleAddToCart} className="shadow-sm shrink-0 h-8 sm:h-9 px-3">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">Додати</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
