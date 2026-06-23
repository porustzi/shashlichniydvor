'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { ArrowLeft, Phone, Users, Calendar, Clock, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { toast } from 'sonner';
import type { ReservationWithTable } from '@/lib/database.types';

interface ReservationsAdminClientProps {
  initialReservations: ReservationWithTable[];
}

const statusConfig: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  pending: { label: 'Очікує', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  confirmed: { label: 'Підтверджено', color: 'text-green-700', bgColor: 'bg-green-100' },
  completed: { label: 'Завершено', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  cancelled: { label: 'Скасовано', color: 'text-red-700', bgColor: 'bg-red-100' },
};

export function ReservationsAdminClient({
  initialReservations,
}: ReservationsAdminClientProps) {
  const [reservations, setReservations] =
    useState<ReservationWithTable[]>(initialReservations);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationWithTable | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredReservations = reservations.filter((res) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') {
      return ['pending', 'confirmed'].includes(res.status);
    }
    return res.status === filter;
  });

  const handleStatusChange = async (reservationId: string, newStatus: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('reservations')
      .update({ status: newStatus })
      .eq('id', reservationId);
    if (error) {
      toast.error('Помилка при оновленні');
      return;
    }
    setReservations(
      reservations.map((r) =>
        r.id === reservationId ? { ...r, status: newStatus } : r
      )
    );
    if (selectedReservation?.id === reservationId) {
      setSelectedReservation({ ...selectedReservation, status: newStatus });
    }
    toast.success('Статус оновлено');
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
              <h1 className="font-display text-3xl font-bold">Бронювання</h1>
              <p className="text-muted-foreground">Управління бронюваннями</p>
            </div>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Фільтр" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всі</SelectItem>
              <SelectItem value="upcoming">Майбутні</SelectItem>
              <SelectItem value="pending">Очікують</SelectItem>
              <SelectItem value="confirmed">Підтверджені</SelectItem>
              <SelectItem value="completed">Завершені</SelectItem>
              <SelectItem value="cancelled">Скасовані</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredReservations.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Бронювань не знайдено</p>
                  </CardContent>
                </Card>
              ) : (
                filteredReservations.map((reservation) => {
                  const status =
                    statusConfig[reservation.status] || statusConfig.pending;
                  return (
                    <Card
                      key={reservation.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {reservation.tables && (
                                <Badge variant="secondary">
                                  Стіл #{reservation.tables.table_number}
                                </Badge>
                              )}
                              <Badge className={`${status.bgColor} ${status.color}`}>
                                {status.label}
                              </Badge>
                            </div>
                            <p className="font-medium">{reservation.customer_name}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {reservation.customer_phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {reservation.party_size} осіб
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(reservation.reservation_date), 'd MMMM', {
                                  locale: uk,
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {reservation.reservation_time}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedReservation(reservation)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Деталі
                          </Button>
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
              <CardContent className="pt-6">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/admin/reservations">На головну</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog
          open={!!selectedReservation}
          onOpenChange={() => setSelectedReservation(null)}
        >
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Бронювання</DialogTitle>
            </DialogHeader>
            {selectedReservation && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm text-muted-foreground">Статус</Label>
                  <Select
                    value={selectedReservation.status}
                    onValueChange={(v) =>
                      handleStatusChange(selectedReservation.id, v)
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
                  <p className="font-medium">{selectedReservation.customer_name}</p>
                  <p>{selectedReservation.customer_phone}</p>
                  {selectedReservation.customer_email && (
                    <p className="text-muted-foreground">
                      {selectedReservation.customer_email}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Дата</p>
                    <p className="font-medium">
                      {format(
                        new Date(selectedReservation.reservation_date),
                        'd MMMM yyyy',
                        { locale: uk }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Час</p>
                    <p className="font-medium">{selectedReservation.reservation_time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Гості</p>
                    <p className="font-medium">
                      {selectedReservation.party_size} осіб
                    </p>
                  </div>
                  {selectedReservation.tables && (
                    <div>
                      <p className="text-sm text-muted-foreground">Столик</p>
                      <p className="font-medium">
                        #{selectedReservation.tables.table_number} (
                        {selectedReservation.tables.seats} місць)
                      </p>
                    </div>
                  )}
                </div>

                {selectedReservation.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Коментар</p>
                    <p className="bg-secondary p-3 rounded-lg text-sm">
                      {selectedReservation.notes}
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
