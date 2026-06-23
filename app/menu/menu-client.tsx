'use client';

import { useState, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ChevronDown, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DishCard } from '@/components/menu/dish-card';
import type { Category, DishWithCategory } from '@/lib/database.types';

interface MenuClientProps {
  categories: Category[];
  dishes: DishWithCategory[];
  initialCategory: string;
  initialSearch: string;
}

export function MenuClient({
  categories,
  dishes: initialDishes,
  initialCategory,
  initialSearch,
}: MenuClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('default');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(
    initialCategory === 'all' ? categories.map(c => c.slug) : [initialCategory]
  ));

  const filteredDishes = useMemo(() => {
    let result = [...initialDishes];

    if (selectedCategory !== 'all') {
      result = result.filter(d => d.categories?.slug === selectedCategory);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.ingredients?.some(i => i.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return Number(a.price) - Number(b.price);
        case 'price-desc': return Number(b.price) - Number(a.price);
        case 'name': return a.name.localeCompare(b.name, 'uk');
        default: return a.display_order - b.display_order;
      }
    });

    return result;
  }, [initialDishes, selectedCategory, search, sortBy]);

  const groupedDishes = useMemo(() => {
    const groups: Record<string, { category: Category; dishes: DishWithCategory[] }> = {};

    filteredDishes.forEach(dish => {
      const catSlug = dish.categories?.slug || 'other';
      if (!groups[catSlug]) {
        groups[catSlug] = {
          category: dish.categories || { id: '', name: 'Інше', slug: 'other', description: null, image_url: null, display_order: 99, is_active: true, created_at: '', updated_at: '' },
          dishes: [],
        };
      }
      groups[catSlug].dishes.push(dish);
    });

    return Object.values(groups).sort((a, b) => a.category.display_order - b.category.display_order);
  }, [filteredDishes]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearch('');
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Меню</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Оберіть страви та додайте їх до кошика для замовлення
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
          <form onSubmit={(e) => { e.preventDefault(); }} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Пошук страв..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-10 sm:h-auto"
            />
          </form>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[160px] h-10 sm:h-auto">
              <SelectValue placeholder="Сортування" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">За замовчуванням</SelectItem>
              <SelectItem value="price-asc">Від дешевих</SelectItem>
              <SelectItem value="price-desc">Від дорогих</SelectItem>
              <SelectItem value="name">За назвою</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <Badge
            variant={selectedCategory === 'all' ? 'default' : 'secondary'}
            className="cursor-pointer whitespace-nowrap text-xs sm:text-sm"
            onClick={() => handleCategoryChange('all')}
          >
            Всі категорії
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedCategory === cat.slug ? 'default' : 'secondary'}
              className="cursor-pointer whitespace-nowrap text-xs sm:text-sm"
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>

        {groupedDishes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Страви не знайдені. Спробуйте змінити фільтри.</p>
          </div>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {groupedDishes.map(({ category, dishes }) => (
              <section key={category.slug} id={`cat-${category.slug}`}>
                <button
                  onClick={() => toggleCategory(category.slug)}
                  className="flex items-center justify-between w-full mb-4 sm:mb-6 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-primary rounded-full" />
                    <div className="text-left">
                      <h2 className="font-display text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">
                    {dishes.length} {dishes.length === 1 ? 'страва' : dishes.length < 5 ? 'страви' : 'страв'}
                  </Badge>
                </button>

                {expandedCategories.has(category.slug) && (
                  <div className="space-y-3 sm:space-y-4">
                    {dishes.map((dish) => (
                      <DishCard key={dish.id} dish={dish} />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
