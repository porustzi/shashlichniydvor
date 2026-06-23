'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Flame,
} from 'lucide-react';
import { toast } from 'sonner';
import type { Category, DishWithCategory, Dish } from '@/lib/database.types';

interface MenuAdminClientProps {
  categories: Category[];
  initialDishes: DishWithCategory[];
}

export function MenuAdminClient({
  categories,
  initialDishes,
}: MenuAdminClientProps) {
  const [dishes, setDishes] = useState<DishWithCategory[]>(initialDishes);
  const [loading, setLoading] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [dishDialogOpen, setDishDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const [dishForm, setDishForm] = useState({
    name: '',
    description: '',
    price: '',
    weight_grams: '',
    category_id: '',
    ingredients: '',
    is_popular: false,
    is_available: true,
    display_order: '0',
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    slug: '',
    display_order: '0',
    is_active: true,
  });

  const resetDishForm = () => {
    setDishForm({
      name: '',
      description: '',
      price: '',
      weight_grams: '',
      category_id: '',
      ingredients: '',
      is_popular: false,
      is_available: true,
      display_order: '0',
    });
    setEditingDish(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      description: '',
      slug: '',
      display_order: '0',
      is_active: true,
    });
    setEditingCategory(null);
  };

  const handleEditDish = (dish: DishWithCategory) => {
    setEditingDish(dish);
    setDishForm({
      name: dish.name,
      description: dish.description || '',
      price: dish.price.toString(),
      weight_grams: dish.weight_grams?.toString() || '',
      category_id: dish.category_id || '',
      ingredients: dish.ingredients?.join(', ') || '',
      is_popular: dish.is_popular,
      is_available: dish.is_available,
      display_order: dish.display_order.toString(),
    });
    setDishDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description || '',
      slug: category.slug,
      display_order: category.display_order.toString(),
      is_active: category.is_active,
    });
    setCategoryDialogOpen(true);
  };

  const handleSaveDish = async () => {
    if (!dishForm.name || !dishForm.price) {
      toast.error('Заповніть обов\'язкові поля');
      return;
    }

    setLoading(true);
    try {
      const slug = dishForm.name
        .toLowerCase()
        .replace(/[^a-z0-9а-яіїєґ]+/gi, '-')
        .replace(/^-|-$/g, '');

      const dishData = {
        name: dishForm.name,
        slug: editingDish ? editingDish.slug : slug,
        description: dishForm.description || null,
        price: parseFloat(dishForm.price),
        weight_grams: dishForm.weight_grams ? parseInt(dishForm.weight_grams) : null,
        category_id: dishForm.category_id || null,
        ingredients: dishForm.ingredients
          ? dishForm.ingredients.split(',').map((i) => i.trim())
          : null,
        is_popular: dishForm.is_popular,
        is_available: dishForm.is_available,
        display_order: parseInt(dishForm.display_order) || 0,
      };

      if (editingDish) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('dishes')
          .update({
            name: dishData.name,
            description: dishData.description,
            price: dishData.price,
            weight_grams: dishData.weight_grams,
            category_id: dishData.category_id,
            ingredients: dishData.ingredients,
            is_popular: dishData.is_popular,
            is_available: dishData.is_available,
            display_order: dishData.display_order,
          })
          .eq('id', editingDish.id);
        if (error) throw error;
        toast.success('Страву оновлено');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any).from('dishes').insert({
          name: dishData.name,
          slug: dishData.slug,
          description: dishData.description,
          price: dishData.price,
          weight_grams: dishData.weight_grams,
          category_id: dishData.category_id,
          ingredients: dishData.ingredients,
          is_popular: dishData.is_popular,
          is_available: dishData.is_available,
          display_order: dishData.display_order,
        });
        if (error) throw error;
        toast.success('Страву створено');
      }

      const { data } = await supabase
        .from('dishes')
        .select('*, categories(*)')
        .order('display_order', { ascending: true });
      setDishes(data || []);
      setDishDialogOpen(false);
      resetDishForm();
    } catch (error) {
      console.error('Save dish error:', error);
      toast.error('Помилка при збереженні');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.name) {
      toast.error('Введіть назву категорії');
      return;
    }

    setLoading(true);
    try {
      const slug =
        categoryForm.slug ||
        categoryForm.name
          .toLowerCase()
          .replace(/[^a-z0-9а-яіїєґ]+/gi, '-')
          .replace(/^-|-$/g, '');

      const categoryData = {
        name: categoryForm.name,
        slug,
        description: categoryForm.description || null,
        display_order: parseInt(categoryForm.display_order) || 0,
        is_active: categoryForm.is_active,
      };

      if (editingCategory) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('categories')
          .update(categoryData)
          .eq('id', editingCategory.id);
        if (error) throw error;
        toast.success('Категорію оновлено');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any).from('categories').insert(categoryData);
        if (error) throw error;
        toast.success('Категорію створено');
      }

      setCategoryDialogOpen(false);
      resetCategoryForm();
      window.location.reload();
    } catch (error) {
      console.error('Save category error:', error);
      toast.error('Помилка при збереженні');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailable = async (dish: DishWithCategory) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('dishes')
      .update({ is_available: !dish.is_available })
      .eq('id', dish.id);
    if (error) {
      toast.error('Помилка при оновленні');
      return;
    }
    setDishes(
      dishes.map((d) =>
        d.id === dish.id ? { ...d, is_available: !d.is_available } : d
      )
    );
    toast.success(
      dish.is_available ? 'Страву приховано' : 'Страву показано'
    );
  };

  const handleDeleteDish = async (dish: DishWithCategory) => {
    if (!confirm(`Видалити "${dish.name}"?`)) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('dishes').delete().eq('id', dish.id);
    if (error) {
      toast.error('Помилка при видаленні');
      return;
    }
    setDishes(dishes.filter((d) => d.id !== dish.id));
    toast.success('Страву видалено');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-3xl font-bold">Управління меню</h1>
              <p className="text-muted-foreground">
                Категорії та страви
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dishes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dishes">Страви ({dishes.length})</TabsTrigger>
            <TabsTrigger value="categories">
              Категорії ({categories.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dishes">
            <div className="flex justify-end mb-4">
              <Dialog open={dishDialogOpen} onOpenChange={setDishDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetDishForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Додати страву
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingDish ? 'Редагувати страву' : 'Нова страва'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Назва *</Label>
                      <Input
                        value={dishForm.name}
                        onChange={(e) =>
                          setDishForm({ ...dishForm, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Опис</Label>
                      <Textarea
                        value={dishForm.description}
                        onChange={(e) =>
                          setDishForm({ ...dishForm, description: e.target.value })
                        }
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Ціна (грн) *</Label>
                        <Input
                          type="number"
                          value={dishForm.price}
                          onChange={(e) =>
                            setDishForm({ ...dishForm, price: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Вага (г)</Label>
                        <Input
                          type="number"
                          value={dishForm.weight_grams}
                          onChange={(e) =>
                            setDishForm({ ...dishForm, weight_grams: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Категорія</Label>
                      <Select
                        value={dishForm.category_id}
                        onValueChange={(v) =>
                          setDishForm({ ...dishForm, category_id: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Оберіть категорію" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Інгредієнти (через кому)</Label>
                      <Input
                        value={dishForm.ingredients}
                        onChange={(e) =>
                          setDishForm({ ...dishForm, ingredients: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-primary" />
                        Популярна
                      </Label>
                      <Switch
                        checked={dishForm.is_popular}
                        onCheckedChange={(v) =>
                          setDishForm({ ...dishForm, is_popular: v })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Доступна</Label>
                      <Switch
                        checked={dishForm.is_available}
                        onCheckedChange={(v) =>
                          setDishForm({ ...dishForm, is_available: v })
                        }
                      />
                    </div>
                    <Button onClick={handleSaveDish} disabled={loading}>
                      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                      Зберегти
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {dishes.map((dish) => (
                <Card
                  key={dish.id}
                  className={!dish.is_available ? 'opacity-50' : ''}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{dish.name}</span>
                          {dish.is_popular && (
                            <Badge variant="secondary">
                              <Flame className="w-3 h-3 mr-1" />
                              Хіт
                            </Badge>
                          )}
                          {!dish.is_available && (
                            <Badge variant="destructive">Приховано</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {dish.categories?.name || 'Без категорії'} • {dish.price} грн
                          {dish.weight_grams && ` • ${dish.weight_grams}г`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={dish.is_available}
                        onCheckedChange={() => handleToggleAvailable(dish)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditDish(dish)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteDish(dish)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="flex justify-end mb-4">
              <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetCategoryForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    Додати категорію
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory ? 'Редагувати категорію' : 'Нова категорія'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Назва *</Label>
                      <Input
                        value={categoryForm.name}
                        onChange={(e) =>
                          setCategoryForm({ ...categoryForm, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug</Label>
                      <Input
                        value={categoryForm.slug}
                        onChange={(e) =>
                          setCategoryForm({ ...categoryForm, slug: e.target.value })
                        }
                        placeholder="Автоматично з назви"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Опис</Label>
                      <Input
                        value={categoryForm.description}
                        onChange={(e) =>
                          setCategoryForm({
                            ...categoryForm,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Активна</Label>
                      <Switch
                        checked={categoryForm.is_active}
                        onCheckedChange={(v) =>
                          setCategoryForm({ ...categoryForm, is_active: v })
                        }
                      />
                    </div>
                    <Button onClick={handleSaveCategory} disabled={loading}>
                      {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                      Зберегти
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className={!category.is_active ? 'opacity-50' : ''}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <span className="font-medium">{category.name}</span>
                      <p className="text-sm text-muted-foreground">
                        slug: {category.slug}
                        {!category.is_active && ' • Приховано'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
