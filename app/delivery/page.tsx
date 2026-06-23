import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, MapPin, Clock, CreditCard, Phone, AlertCircle, ShieldCheck } from 'lucide-react';

const deliveryZones = [
  { name: 'Центр', time: '30-40 хв', free: 300 },
  { name: 'Оболонь', time: '40-50 хв', free: 400 },
  { name: 'Поділ', time: '35-45 хв', free: 350 },
  { name: 'Печерськ', time: '40-50 хв', free: 400 },
  { name: 'Святошинський', time: '50-60 хв', free: 500 },
  { name: 'Шевченківський', time: '35-45 хв', free: 350 },
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
    description: 'Безпечна оплата карткою онлайн через платіжну систему',
  },
];

export default function DeliveryPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Badge className="mb-4 px-3 py-1.5 text-sm" variant="secondary">
            <Truck className="w-3 h-3 mr-1 inline-block" />
            Доставка
          </Badge>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Доставка шашликів додому
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Гаряча доставка наших страв прямісінько до вашого столу. Ми ретельно
            пакуємо кожне замовлення у термосумки.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80"
              alt="Доставка їжі"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 bg-card/95 backdrop-blur rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-2xl">30-60 хв</p>
                  <p className="text-sm text-muted-foreground">середній час доставки</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Безкоштовна доставка</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  При замовленні від 500 грн доставка безкоштовна. Для замовлень
                  меншої суми — доставка від 50 грн залежно від району.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Зона доставки</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Доставляємо по всьому Києву та передмістю. Орієнтовний час
                  доставки залежить від вашого району та часу доби.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Графік доставки</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Пн-Чт: 11:00-22:30 | Пт-Сб: 11:00-00:30 | Нд: 12:00-21:30
                  <br />
                  Останнє замовлення за 30 хвилин до закриття.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">
            Райони доставки
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliveryZones.map((zone) => (
              <Card key={zone.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-base">{zone.name}</h3>
                    <Badge variant="secondary" className="text-xs">{zone.time}</Badge>
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
          <h2 className="font-display text-3xl font-bold mb-8 text-center">
            Способи оплати
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.title} className="hover:shadow-md transition-shadow text-center">
                <CardHeader className="flex flex-col items-center gap-3 space-y-0 pb-2 pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl p-8 lg:p-12 text-center border shadow-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">
            Самовивіз
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
            Заберіть замовлення самостійно у нашому ресторані за адресою:
            вул. Шашлична, 15, Київ. Час приготування — 20-30 хвилин.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/menu">Замовити на самовивіз</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contacts">Як дістатись</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
