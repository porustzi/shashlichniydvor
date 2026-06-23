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
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-restaurant-500 to-restaurant-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Flame className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-xl font-semibold tracking-tight">
                Шашличний двір
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn('nav-link', pathname === link.href && 'active')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
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
              <Button variant="outline" size="sm">
                Адмін
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium py-2 transition-colors',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
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
