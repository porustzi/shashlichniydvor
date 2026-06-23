import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Flame, Clock, MapPin } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/2234526/pexels-photo-2234526.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Flame className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">На живому вогні</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Найсмачніші шашлики у{' '}
            <span className="text-gradient from-restaurant-500 to-warm-600">
              Києві
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            Готуємо з душою на справжньому вогні. Доставка свіжих шашликів додому або
            бронювання затишного столика у нашому ресторані.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" asChild className="text-base">
              <Link href="/menu">
                Замовити доставку
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link href="/reservations">Забронювати стіл</Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <span>Доставка 30-60 хв</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span>Безкоштовно від 500 грн</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
