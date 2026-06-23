import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function ContactsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
            Контакти
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Зв'яжіться з нами для замовлення або бронювання столика
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Адреса</h3>
                    <p className="text-muted-foreground mb-3">
                      вул. Шашлична, 15<br />
                      Київ, Україна, 01001
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href="https://maps.google.com/?q=Київ"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Відкрити на карті
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                    <div className="space-y-2">
                      <a
                        href="tel:+380441234567"
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        +38 (044) 123-45-67 — Основний
                      </a>
                      <a
                        href="tel:+380681234567"
                        className="block text-muted-foreground hover:text-primary transition-colors"
                      >
                        +38 (068) 123-45-67 — Доставка
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:info@shashlichny.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@shashlichny.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-2">
                      Відповідаємо протягом 24 годин
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Графік роботи</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Понеділок — Четвер: 11:00 — 23:00</p>
                      <p>П'ятниця — Субота: 11:00 — 01:00</p>
                      <p>Неділя: 12:00 — 22:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Facebook className="w-5 h-5" />
                  Facebook
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <div className="w-full h-full min-h-[400px] bg-secondary/50 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Карта</p>
                  <p className="text-sm text-muted-foreground">вул. Шашлична, 15</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" size="lg" asChild className="h-auto py-6">
            <Link href="/menu" className="flex-col gap-2">
              <span className="text-base">Замовити доставку</span>
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="h-auto py-6">
            <Link href="/reservations" className="flex-col gap-2">
              <span className="text-base">Забронювати стіл</span>
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="h-auto py-6">
            <a href="tel:+380441234567" className="flex-col gap-2">
              <span className="text-base">Зателефонувати</span>
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="h-auto py-6">
            <a href="mailto:info@shashlichny.com" className="flex-col gap-2">
              <span className="text-base">Написати email</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
