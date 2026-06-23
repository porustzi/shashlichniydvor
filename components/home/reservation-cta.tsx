import Link from 'next/link';
import { Calendar, Users, ChevronRight, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReservationCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-restaurant-600 via-restaurant-700 to-restaurant-900 shadow-2xl">
          <div className="absolute inset-0 opacity-15">
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80')`,
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-restaurant-900/60 via-restaurant-800/40 to-transparent" />

          <div className="relative z-10 py-16 lg:py-24 px-8 lg:px-16">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-3 text-white">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Затишна атмосфера</span>
                </div>
                <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4 leading-tight">
                  Забронюйте стіл у{' '}
                  <span className="text-warm-300">Шашличному дворі</span>
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl leading-relaxed">
                  Насолоджуйтесь атмосферою живого вогню та ароматом шашликів у
                  затишному ресторані. Виберіть зручний столик на інтерактивній
                  карті.
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Оберіть дату та час</div>
                      <div className="text-sm text-white/60">На інтерактивній карті</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 backdrop-blur rounded-xl p-4 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Кількість гостей</div>
                      <div className="text-sm text-white/60">До 8 осіб за столом</div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  asChild
                  className="bg-white text-restaurant-700 hover:bg-white/90 shadow-xl shadow-black/20 text-base"
                >
                  <Link href="/reservations">
                    Забронювати столик
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="hidden lg:block lg:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 text-white border border-white/10 hover:bg-white/15 transition-colors">
                    <UtensilsCrossed className="w-8 h-8 mb-3 text-warm-300" />
                    <div className="text-4xl font-bold mb-1">10</div>
                    <div className="text-sm text-white/70">затишних столиків</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 text-white border border-white/10 hover:bg-white/15 transition-colors">
                    <Sparkles className="w-8 h-8 mb-3 text-warm-300" />
                    <div className="text-4xl font-bold mb-1">VIP</div>
                    <div className="text-sm text-white/70">приватна зона</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 text-white border border-white/10 hover:bg-white/15 transition-colors">
                    <Users className="w-8 h-8 mb-3 text-warm-300" />
                    <div className="text-4xl font-bold mb-1">50+</div>
                    <div className="text-sm text-white/70">місць у закладі</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-6 text-white border border-white/10 hover:bg-white/15 transition-colors">
                    <Calendar className="w-8 h-8 mb-3 text-warm-300" />
                    <div className="text-4xl font-bold mb-1">24/7</div>
                    <div className="text-sm text-white/70">онлайн бронювання</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
