import Link from 'next/link';
import { Truck, MapPin, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const deliveryFeatures = [
  {
    icon: Truck,
    title: 'Безкоштовна доставка',
    description: 'Безкоштовно при замовленні від 500 грн. Доставляємо щодня.',
  },
  {
    icon: MapPin,
    title: 'Зона доставки',
    description: 'Обслуговуємо Київ та передмістя. Доставка 30-60 хвилин.',
  },
  {
    icon: Clock,
    title: 'Графік роботи',
    description: 'Пн-Чт: 11:00-23:00, Пт-Сб: 11:00-01:00, Нд: 12:00-22:00.',
  },
  {
    icon: CreditCard,
    title: 'Зручна оплата',
    description: 'Готівкою або карткою при отриманні. Безпечні онлайн-платежі.',
  },
];

export function DeliveryInfo() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Доставка</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              Доставка з душею
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Ми ретельно пакуємо кожне замовлення, щоб шашлики дійшли до вас
              гарячими та соковитими. Кур'єри привозять замовлення в термосумках
              протягом години.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {deliveryFeatures.map((feature, idx) => (
                <div
                  key={feature.title}
                  className="flex gap-4 p-4 rounded-xl bg-card border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/menu">Замовити зараз</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/delivery">Детальніше про доставку</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
                alt="Доставка їжі"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-xl p-5 border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">30 хв</div>
                  <div className="text-sm text-muted-foreground">середній час доставки</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
