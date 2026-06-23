import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Flame, Clock, MapPin, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">На живому вогні з 2015</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Шашличний{' '}
            <span className="text-gradient from-restaurant-400 to-warm-600">
              двір
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
            Готуємо з душою на справжньому вогні. Оберіть доставку свіжих шашликів
            додому або забронюйте затишний столик у нашому ресторані.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" asChild className="text-base shadow-lg shadow-primary/25">
              <Link href="/menu">
                Замовити доставку
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base border-2">
              <Link href="/reservations">Забронювати стіл</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center backdrop-blur-sm">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground">30-60 хв</span>
                <p className="text-xs">середній час доставки</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground">Безкоштовно</span>
                <p className="text-xs">при замовленні від 500 грн</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center backdrop-blur-sm">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground">4.8 ★</span>
                <p className="text-xs">середня оцінка</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
