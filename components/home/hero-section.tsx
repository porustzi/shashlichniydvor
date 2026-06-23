import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Flame, Clock, MapPin, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10 py-12 sm:py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-8 backdrop-blur-sm">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium">На живому вогні з 2015</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4 sm:mb-6">
            Шашличний{' '}
            <span className="text-gradient from-restaurant-400 to-warm-600">
              двір
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-10 max-w-xl leading-relaxed">
            Готуємо з душою на справжньому вогні. Оберіть доставку свіжих шашликів
            додому або забронюйте затишний столик у нашому ресторані.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <Button size="default" asChild className="text-sm sm:text-base shadow-lg shadow-primary/25 w-full sm:w-auto">
              <Link href="/menu">
                Замовити доставку
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button size="default" variant="outline" asChild className="text-sm sm:text-base border-2 w-full sm:w-auto">
              <Link href="/reservations">Забронювати стіл</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary/80 flex items-center justify-center backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground text-xs sm:text-sm">30-60 хв</span>
                <p className="text-xs text-muted-foreground hidden sm:block">середній час доставки</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary/80 flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground text-xs sm:text-sm">Безкоштовно</span>
                <p className="text-xs text-muted-foreground hidden sm:block">при замовленні від 500 грн</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary/80 flex items-center justify-center backdrop-blur-sm">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-foreground text-xs sm:text-sm">4.8 ★</span>
                <p className="text-xs text-muted-foreground hidden sm:block">середня оцінка</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-40 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
