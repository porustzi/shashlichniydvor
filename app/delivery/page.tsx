import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, CreditCard, Phone, AlertCircle } from 'lucide-react';

const deliveryZones = [
  { name: 'Центр', time: '30-40 хв', free: 300 },
  { name: 'Оболонь', time: '40-50 хв', free: 400 },
  { name: 'Поділ', time: '35-45 хв', free: 350 },
  { name: 'Печерськ', time: '40-50 хв', free: 400 },
  { name: 'Святошинськ', time: '50-60 хв', free: 500 },
  { name: 'Шевченківськ', time: '35-45 хв', free: 350 },
];

const paymentMethods = [
  {
    title: 'Готівка',
    description: "Оплата готівкою кур'єру при отриманні",
  },
  {
    title: 'Карткою',
    description: "Безконтактна оплата карткою кур'єру",
  },
  {
    title: 'Онлайн',
    description: 'Безпечна оплата карткою онлайн',
  },
];

export default function DeliveryPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Badge className="mb-4">Доставка</Badge>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Доставка шашликів додому
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Гаряча доставка наших страв прямісюдо до вашого столу. Мы ретельно
            пакуємо кожне замовлення у термосумки.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/4393433/pexels-photo-4393433.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Доставка шашликів"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-2xl">30-60 хв</p>
                  <p className="text-sm text-muted-foreground">середній час доставки</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Безкоштовна доставка</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  При замовленні від 500 грн доставка безкоштовна. Для замовлень
                  меншої суми — доставка від 50 грн залежно від району.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Зона доставки</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Доставляємо по всьому Києву та передмістю. Орієнтовний час
                  доставки залежить від вашого району та часу доби.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Графік доставки</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Пн-Чт: 11:00-22:30 | Пт-Сб: 11:00-00:30 | Нд: 12:00-21:30
                  <br />
                  Останнє замовлення за 30 хвилин до закриття.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold mb-6 text-center">
            Райони доставки
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliveryZones.map((zone) => (
              <Card key={zone.name}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{zone.name}</h3>
                    <Badge variant="secondary">{zone.time}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Безкоштовно від {zone.free} грн
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold mb-6 text-center">
            Способи оплати
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.title}>
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-secondary/50 rounded-2xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">
            Самовивіз
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Заберіть замовлення самостійно у нашому ресторані за адресою:
            вул. Шашлична, 15, Київ. Час приготування — 20-30 хвилин.
          </p>
          <Button size="lg" asChild>
            <Link href="/menu">Замовити на самовивіз</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
