'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const total = getTotalPrice();

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={closeCart}
      />
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 transition-transform',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-semibold text-lg">Кошик</h2>
              <span className="text-sm text-muted-foreground">
                ({items.length})
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-4">Ваш кошик порожній</p>
              <Button onClick={closeCart} asChild>
                <Link href="/menu">Переглянути меню</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-lg border bg-card"
                  >
                    {item.imageUrl && (
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.price.toFixed(0)} грн
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {(item.price * item.quantity).toFixed(0)} грн
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive mt-1 h-auto p-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Підсумок</span>
                    <span>{total.toFixed(0)} грн</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Разом</span>
                    <span>{total.toFixed(0)} грн</span>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Button size="lg" asChild onClick={closeCart}>
                    <Link href="/checkout">Оформити замовлення</Link>
                  </Button>
                  <Button variant="ghost" onClick={clearCart}>
                    Очистити кошик
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
