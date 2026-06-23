'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Eye,
  Phone,
  MapPin,
  Clock,
  ShoppingBag,
  Loader2,
} from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { toast } from 'sonner';
import type { Order, OrderItem } from '@/lib/database.types';

interface OrdersAdminClientProps {
  initialOrders: Order[];
}

const statusConfig: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  pending: { label: 'Новий', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  confirmed: { label: 'Підтверджено', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  preparing: { label: 'Готується', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  ready: { label: 'Готовий', color: 'text-green-700', bgColor: 'bg-green-100' },
  delivered: { label: 'Доставлено', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  cancelled: { label: 'Скасовано', color: 'text-red-700', bgColor: 'bg-red-100' },
};

export function OrdersAdminClient({ initialOrders }: OrdersAdminClientProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    if (filter === 'active')
      return ['pending', 'confirmed', 'preparing'].includes(order.status);
    return order.status === filter;
  });

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    const { data } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);
    setOrderItems(data || []);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
    if (error) {
      toast.error('Помилка при оновленні');
      setLoading(false);
      return;
    }
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    toast.success('Статус оновлено');
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="font-display text-3xl font-bold">Замовлення</h1>
              <p className="text-muted-foreground">Управління замовленнями</p>
            </div>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Фільтр" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всі</SelectItem>
              <SelectItem value="active">Активні</SelectItem>
              <SelectItem value="pending">Нові</SelectItem>
              <SelectItem value="confirmed">Підтверджені</SelectItem>
              <SelectItem value="preparing">Готуються</SelectItem>
              <SelectItem value="ready">Готові</SelectItem>
              <SelectItem value="delivered">Доставлені</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Замовлень не знайдено</p>
                  </CardContent>
                </Card>
              ) : (
                filteredOrders.map((order) => {
                  const status = statusConfig[order.status] || statusConfig.pending;
                  return (
                    <Card key={order.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono font-bold">
                                {order.order_number}
                              </span>
                              <Badge className={`${status.bgColor} ${status.color}`}>
                                {status.label}
                              </Badge>
                            </div>
                            <p className="font-medium">{order.customer_name}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {order.customer_phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {format(new Date(order.created_at), 'HH:mm', {
                                  locale: uk,
                                })}
                              </span>
                            </div>
                            {order.delivery_address && (
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {order.delivery_address}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              {order.total.toFixed(0)}
                            </p>
                            <p className="text-sm text-muted-foreground">грн</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => handleViewOrder(order)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Деталі
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Швидка дія</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/admin">На головну</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Замовлення {selectedOrder?.order_number}</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm text-muted-foreground">Статус</Label>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(v) =>
                      handleStatusChange(selectedOrder.id, v)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          {val.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Клієнт</p>
                  <p className="font-medium">{selectedOrder.customer_name}</p>
                  <p>{selectedOrder.customer_phone}</p>
                  {selectedOrder.customer_email && (
                    <p className="text-muted-foreground">
                      {selectedOrder.customer_email}
                    </p>
                  )}
                </div>

                {selectedOrder.delivery_address && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Доставка</p>
                    <p>{selectedOrder.delivery_address}</p>
                    {selectedOrder.delivery_notes && (
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.delivery_notes}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Страви</p>
                  <ScrollArea className="max-h-48">
                    <div className="space-y-2">
                      {orderItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {item.dish_name} x{item.quantity}
                          </span>
                          <span>{item.total_price.toFixed(0)} грн</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Підсумок</span>
                    <span>{selectedOrder.subtotal.toFixed(0)} грн</span>
                  </div>
                  {selectedOrder.delivery_fee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Доставка</span>
                      <span>{selectedOrder.delivery_fee} грн</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Разом</span>
                    <span className="text-primary">
                      {selectedOrder.total.toFixed(0)} грн
                    </span>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Коментар</p>
                    <p className="bg-secondary p-3 rounded-lg text-sm">
                      {selectedOrder.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

import { Label } from '@/components/ui/label';
