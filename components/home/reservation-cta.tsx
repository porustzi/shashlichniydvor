import Link from 'next/link';
import { Calendar, Users, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReservationCTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-restaurant-600 to-restaurant-800">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/2741702/pexels-photo-2741702.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
              }}
            />
          </div>

          <div className="relative z-10 py-12 lg:py-20 px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                  Забронюйте стіл
                </h2>
                <p className="text-white/80 text-lg mb-6">
                  Насолоджуйтесь атмосферою живого вогню та ароматом шашликів у нашому
                  затишному ресторані. Виберіть зручний столик на інтерактивній карті.
                </p>

                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Оберіть дату та час</div>
                      <div className="text-sm text-white/70">На інтерактивній карті</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Кількість гостей</div>
                      <div className="text-sm text-white/70"> До 8 осіб за столом</div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="bg-white text-restaurant-700 hover:bg-white/90"
                >
                  <Link href="/reservations">
                    Забронювати столик
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/10 backdrop-blur p-6 text-white">
                    <div className="text-4xl font-bold mb-1">10</div>
                    <div className="text-sm text-white/70">залізних столиків</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur p-6 text-white">
                    <div className="text-4xl font-bold mb-1">VIP</div>
                    <div className="text-sm text-white/70">приватна зона</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur p-6 text-white">
                    <div className="text-4xl font-bold mb-1">50+</div>
                    <div className="text-sm text-white/70">місць у закладі</div>
                  </div>
                  <div className="rounded-xl bg-white/10 backdrop-blur p-6 text-white">
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
