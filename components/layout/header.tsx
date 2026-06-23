'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/', label: 'Головна' },
  { href: '/menu', label: 'Меню' },
  { href: '/delivery', label: 'Доставка' },
  { href: '/reservations', label: 'Бронювання' },
  { href: '/contacts', label: 'Контакти' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const isAdmin = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-restaurant-500 to-restaurant-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <span className="font-display text-base sm:text-xl font-semibold tracking-tight truncate">
              Шашличний двір
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn('nav-link text-xs xl:text-sm', pathname === link.href && 'active')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            {!isAdmin && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={toggleCart}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            )}

            <Link href="/admin" className="hidden sm:block">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm h-8 sm:h-9">
                Адмін
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium py-3 px-2 rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="mt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Адмін панель
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
