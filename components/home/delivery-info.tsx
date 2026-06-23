import Link from 'next/link';
import { Truck, MapPin, Clock, CreditCard } from 'lucide-react';
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
    title: 'Оплата',
    description: 'Готівкою або карткою при отриманні. Безпечні онлайн-платежі.',
  },
];

export function DeliveryInfo() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">
              Доставка з душею
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Ми ретельно пакуємо кожне замовлення, щоб шашлики дійшли до вас гарячими
              та соковитими. Кур'єри привозять замовлення в термосумках протягом
              години.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {deliveryFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/menu">Замовити зараз</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/delivery">Детальніше про доставку</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4393433/pexels-photo-4393433.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Доставка"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-4 border">
              <div className="text-3xl font-bold text-primary">30 хв</div>
              <div className="text-sm text-muted-foreground">середній час доставки</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
