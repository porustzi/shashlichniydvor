'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, Phone, Clock } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get('order');

  useEffect(() => {
    if (!orderNumber) {
      router.push('/');
    }
  }, [orderNumber, router]);

  if (!orderNumber) return null;

  return (
    <div className="min-h-screen py-16 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-lg">
        <Card className="text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="font-display text-3xl font-bold mb-2">
              Замовлення прийнято!
            </h1>
            <p className="text-muted-foreground mb-6">
              Дякуємо за замовлення. Ми вже почали його опрацьовувати.
            </p>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Номер замовлення
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">{orderNumber}</p>
              </CardContent>
            </Card>

            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Час доставки</h3>
                  <p className="text-sm text-muted-foreground">
                    Орієнтовно 30-60 хвилин
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Контакти</h3>
                  <p className="text-sm text-muted-foreground">
                    Якщо виникнуть питання: +38 (044) 123-45-67
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" asChild className="flex-1">
                <Link href="/menu">
                  <Home className="w-4 h-4 mr-2" />
                  Повернутись до меню
                </Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/">На головну</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
