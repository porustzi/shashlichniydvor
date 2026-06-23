import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Category } from '@/lib/database.types';

interface CategoriesPreviewProps {
  categories: Category[];
}

const categoryImages: Record<string, string> = {
  shashliks: 'https://images.pexels.com/photos/2234526/pexels-photo-2234526.jpeg?auto=compress&cs=tinysrgb&w=600',
  steaks: 'https://images.pexels.com/photos/7675595/pexels-photo-7675595.jpeg?auto=compress&cs=tinysrgb&w=600',
  salads: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600',
  soups: 'https://images.pexels.com/photos/1893509/pexels-photo-1893509.jpeg?auto=compress&cs=tinysrgb&w=600',
  garnirs: 'https://images.pexels.com/photos/10982369/pexels-photo-10982369.jpeg?auto=compress&cs=tinysrgb&w=600',
  drinks: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
  deserts: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export function CategoriesPreview({ categories }: CategoriesPreviewProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Наше меню
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Оберіть категорію щоб побачити всі страви. Ми готуємо з натуральних продуктів
            за традиційними рецептами.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/menu?category=${category.slug}`}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-md transition-all"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage: `url('${categoryImages[category.slug] || 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600'}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-semibold text-white text-lg">{category.name}</h3>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
