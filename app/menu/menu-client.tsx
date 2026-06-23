'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterPopular, setFilterPopular] = useState(false);

  const dishes = initialDishes.filter((dish) => {
    if (filterAvailable && !dish.is_available) return false;
    if (filterPopular && !dish.is_popular) return false;
    return true;
  });

  const sortedDishes = [...dishes].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return Number(a.price) - Number(b.price);
      case 'price-desc':
        return Number(b.price) - Number(a.price);
      case 'name':
        return a.name.localeCompare(b.name, 'uk');
      default:
        return a.display_order - b.display_order;
    }
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (search) params.set('search', search);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (search) params.set('search', search);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Меню</h1>
          <p className="text-muted-foreground">
            Оберіть страви та додайте їх до кошика для замовлення
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Пошук страв..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </form>

          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Категорія" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всі категорії</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Сортування" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">За замовчуванням</SelectItem>
              <SelectItem value="price-asc">Від дешевих</SelectItem>
              <SelectItem value="price-desc">Від дорогих</SelectItem>
              <SelectItem value="name">За назвою</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Фільтри
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Фільтри</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-3">
                  <Label className="text-base">Статус</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="available"
                      checked={filterAvailable}
                      onCheckedChange={(checked) => setFilterAvailable(!!checked)}
                    />
                    <Label htmlFor="available" className="font-normal">
                      Тільки доступні
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="popular"
                      checked={filterPopular}
                      onCheckedChange={(checked) => setFilterPopular(!!checked)}
                    />
                    <Label htmlFor="popular" className="font-normal">
                      Тільки популярні
                    </Label>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Категорії</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.id}
                        variant={selectedCategory === category.slug ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => handleCategoryChange(category.slug)}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge
            variant={selectedCategory === 'all' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => handleCategoryChange('all')}
          >
            Всі
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.slug ? 'default' : 'secondary'}
              className="cursor-pointer"
              onClick={() => handleCategoryChange(category.slug)}
            >
              {category.name}
            </Badge>
          ))}
        </div>

        {sortedDishes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Страви не знайдені. Спробуйте змінити фільтри.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
