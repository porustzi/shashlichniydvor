import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Category } from '@/lib/database.types';

interface CategoriesPreviewProps {
  categories: Category[];
}

const categoryImages: Record<string, string> = {
  shashliks: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  steaks: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',
  salads: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
  soups: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
  garnirs: 'https://images.unsplash.com/photo-1592415497089-6c3cf76b3d2e?w=600&q=80',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
  deserts: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
  default: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
};

export function CategoriesPreview({ categories }: CategoriesPreviewProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">Меню</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
            Наше меню
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Оберіть категорію щоб побачити всі страви. Готуємо з натуральних
            продуктів за традиційними рецептами.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/menu?category=${category.slug}`}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${categoryImages[category.slug] || categoryImages.default}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-semibold text-white text-lg">{category.name}</h3>
                <p className="text-white/60 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Переглянути страви
                </p>
              </div>
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
