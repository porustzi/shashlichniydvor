import Link from 'next/link';
import { Flame, Phone, Mail, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-restaurant-500 to-restaurant-700 flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="font-display text-xl font-semibold">
                Шашличний двір
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Найсмачніші шашлики на живому вогні. Доставка та бронювання столиків.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Навігація</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                Меню
              </Link>
              <Link href="/delivery" className="text-muted-foreground hover:text-primary transition-colors">
                Доставка
              </Link>
              <Link href="/reservations" className="text-muted-foreground hover:text-primary transition-colors">
                Бронювання
              </Link>
              <Link href="/contacts" className="text-muted-foreground hover:text-primary transition-colors">
                Контакти
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакти</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>вул. Шашлична, 15, Київ</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+380441234567" className="hover:text-primary transition-colors">
                  +38 (044) 123-45-67
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@shashlichny.com" className="hover:text-primary transition-colors">
                  info@shashlichny.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Графік роботи</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p>Пн-Чт: 11:00 - 23:00</p>
                  <p>Пт-Сб: 11:00 - 01:00</p>
                  <p>Нд: 12:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 Шашличний двір. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
