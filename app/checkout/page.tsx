'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ShoppingBag, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    delivery_address: '',
    delivery_notes: '',
    notes: '',
    payment_method: 'cash',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (items.length === 0) {
      router.push('/menu');
    }
  }, [items, router]);

  const subtotal = getTotalPrice();
  const deliveryFee = orderType === 'delivery' && subtotal < 500 ? 50 : 0;
  const total = subtotal + deliveryFee;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customer_name.trim()) newErrors.customer_name = "Введіть ім'я";
    if (!formData.customer_phone.trim()) newErrors.customer_phone = 'Введіть телефон';
    if (orderType === 'delivery' && !formData.delivery_address.trim()) {
      newErrors.delivery_address = 'Введіть адресу доставки';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const orderNumber = `SD${Date.now().toString().slice(-8)}`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: order, error: orderError } = await (supabase as any)
        .from('orders')
        .insert({
          order_number: orderNumber,
          order_type: orderType,
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone,
          customer_email: formData.customer_email || null,
          delivery_address: orderType === 'delivery' ? formData.delivery_address : null,
          delivery_notes: formData.delivery_notes || null,
          subtotal,
          delivery_fee: deliveryFee,
          total,
          payment_method: formData.payment_method,
          notes: formData.notes || null,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        dish_id: item.id,
        dish_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        notes: item.notes,
      }));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: itemsError } = await (supabase as any)
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      router.push(`/checkout/success?order=${orderNumber}`);
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Помилка при створенні замовлення. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Оформлення замовлення</h1>
          <p className="text-muted-foreground">
            Заповніть дані для оформлення замовлення
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Тип замовлення</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={orderType}
                    onValueChange={(value) => setOrderType(value as 'delivery' | 'pickup')}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="delivery"
                        id="delivery"
                        className="sr-only"
                      />
                      <Label
                        htmlFor="delivery"
                        className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          orderType === 'delivery'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Send className="w-6 h-6 mb-2" />
                        <span className="font-semibold">Доставка</span>
                        <span className="text-sm text-muted-foreground">
                          {subtotal >= 500 ? 'Безкоштовно' : '50 грн'}
                        </span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="pickup"
                        id="pickup"
                        className="sr-only"
                      />
                      <Label
                        htmlFor="pickup"
                        className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          orderType === 'pickup'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <ShoppingBag className="w-6 h-6 mb-2" />
                        <span className="font-semibold">Самовивіз</span>
                        <span className="text-sm text-muted-foreground">
                          Безкоштовно
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Контактні дані</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer_name">
                      Ім'я <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="customer_name"
                      value={formData.customer_name}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_name: e.target.value })
                      }
                      placeholder="Ваше ім'я"
                    />
                    {errors.customer_name && (
                      <p className="text-sm text-destructive">{errors.customer_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_phone">
                      Телефон <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="customer_phone"
                      type="tel"
                      value={formData.customer_phone}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_phone: e.target.value })
                      }
                      placeholder="+380 XX XXX XX XX"
                    />
                    {errors.customer_phone && (
                      <p className="text-sm text-destructive">{errors.customer_phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_email">Email</Label>
                    <Input
                      id="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) =>
                        setFormData({ ...formData, customer_email: e.target.value })
                      }
                      placeholder="email@example.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {orderType === 'delivery' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Адреса доставки</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="delivery_address">
                        Адреса доставки <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="delivery_address"
                        value={formData.delivery_address}
                        onChange={(e) =>
                          setFormData({ ...formData, delivery_address: e.target.value })
                        }
                        placeholder="вул. Хрещатик, 1, кв. 10"
                      />
                      {errors.delivery_address && (
                        <p className="text-sm text-destructive">{errors.delivery_address}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="delivery_notes">Коментар до доставки</Label>
                      <Input
                        id="delivery_notes"
                        value={formData.delivery_notes}
                        onChange={(e) =>
                          setFormData({ ...formData, delivery_notes: e.target.value })
                        }
                        placeholder="Під'їзд, поверх, код домофону"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Спосіб оплати</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.payment_method}
                    onValueChange={(value) =>
                      setFormData({ ...formData, payment_method: value })
                    }
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="font-normal cursor-pointer">
                        Готівкою при отриманні
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="font-normal cursor-pointer">
                        Карткою при отриманні
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Коментар до замовлення</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Особливі побажання, алергії тощо"
                    rows={3}
                  />
                </CardContent>
              </Card>

              <div className="lg:hidden">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Підтвердити замовлення
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ваше замовлення</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {(item.price * item.quantity).toFixed(0)} грн
                      </span>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Підсумок</span>
                    <span>{subtotal.toFixed(0)} грн</span>
                  </div>

                  {deliveryFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Доставка</span>
                      <span>{deliveryFee} грн</span>
                    </div>
                  )}

                  {deliveryFee === 0 && orderType === 'delivery' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Доставка</span>
                      <span className="text-green-600">Безкоштовно</span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Разом</span>
                    <span>{total.toFixed(0)} грн</span>
                  </div>

                  {subtotal < 500 && orderType === 'delivery' && (
                    <p className="text-xs text-muted-foreground">
                      Додайте ще на {(500 - subtotal).toFixed(0)} грн для безкоштовної доставки
                    </p>
                  )}

                  <div className="hidden lg:block pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : null}
                      Підтвердити замовлення
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
