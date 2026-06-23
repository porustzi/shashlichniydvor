'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays } from 'date-fns';
import { uk } from 'date-fns/locale';
import { CalendarIcon, Users, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { Table } from '@/lib/database.types';

interface ReservationClientProps {
  tables: Table[];
}

export function ReservationClient({ tables: initialTables }: ReservationClientProps) {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [date, setDate] = useState<Date>(addDays(new Date(), 1));
  const [time, setTime] = useState('19:00');
  const [partySize, setPartySize] = useState('2');
  const [reservations, setReservations] = useState<{ table_id: string; status: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (date && time) {
      fetchReservations();
    }
  }, [date, time]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const { data } = await supabase
        .from('reservations')
        .select('table_id, status')
        .eq('reservation_date', dateStr)
        .in('status', ['pending', 'confirmed'])
        .gte('reservation_time', time)
        .lte('reservation_time', time);
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const isTableReserved = (tableId: string) => {
    return reservations.some((r) => r.table_id === tableId);
  };

  const getTableStyle = (table: Table) => {
    const isReserved = isTableReserved(table.id);
    const isSelected = selectedTable?.id === table.id;
    const canFitParty = table.seats >= parseInt(partySize);

    const baseStyle = 'absolute transition-all duration-200 cursor-pointer flex items-center justify-center text-white font-semibold text-sm';

    let bgColor = 'bg-green-500 hover:bg-green-600';
    if (isReserved) {
      bgColor = 'bg-red-400 cursor-not-allowed';
    } else if (isSelected) {
      bgColor = 'bg-primary ring-4 ring-primary/30';
    } else if (!canFitParty) {
      bgColor = 'bg-gray-300 cursor-not-allowed';
    }

    let shape = 'rounded-lg';
    if (table.table_type === 'round') {
      shape = 'rounded-full';
    } else if (table.table_type === 'bar') {
      shape = 'rounded-md';
    }

    return {
      left: `${table.position_x}px`,
      top: `${table.position_y}px`,
      width: `${table.width}px`,
      height: `${table.height}px`,
      className: cn(baseStyle, shape, bgColor),
    };
  };

  const handleTableClick = (table: Table) => {
    if (isTableReserved(table.id)) {
      toast.error('Цей столик вже заброньовано на цей час');
      return;
    }
    if (table.seats < parseInt(partySize)) {
      toast.error(`Цей столик розрахований на ${table.seats} гостей`);
      return;
    }
    setSelectedTable(table);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedTable) newErrors.table = 'Оберіть столик';
    if (!formData.customer_name.trim()) newErrors.customer_name = "Введіть ім'я";
    if (!formData.customer_phone.trim()) newErrors.customer_phone = 'Введіть телефон';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any).from('reservations').insert({
        table_id: selectedTable!.id,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || null,
        party_size: parseInt(partySize),
        reservation_date: format(date, 'yyyy-MM-dd'),
        reservation_time: time,
        notes: formData.notes || null,
        status: 'pending',
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success('Бронювання успішно створено!');
    } catch (error) {
      console.error('Reservation error:', error);
      toast.error('Помилка при створенні бронювання');
    } finally {
      setSubmitting(false);
    }
  };

  const timeSlots = [];
  for (let hour = 11; hour <= 22; hour++) {
    if (hour === 22) {
      timeSlots.push('22:00');
    } else {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <Card className="text-center max-w-md">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">
              Бронювання створено!
            </h1>
            <p className="text-muted-foreground mb-6">
              Ми зателефонуємо вам для підтвердження бронювання.
            </p>
            <div className="space-y-2 text-left mb-6 p-4 rounded-lg bg-secondary/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Столик</span>
                <span className="font-medium">№{selectedTable?.table_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Дата</span>
                <span className="font-medium">{format(date, 'd MMMM', { locale: uk })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Час</span>
                <span className="font-medium">{time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Гості</span>
                <span className="font-medium">{partySize} осіб</span>
              </div>
            </div>
            <Button onClick={() => {
              setSubmitted(false);
              setSelectedTable(null);
              setFormData({ customer_name: '', customer_phone: '', customer_email: '', notes: '' });
            }}>
              Нове бронювання
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold mb-2">Бронювання столиків</h1>
          <p className="text-muted-foreground">
            Оберіть зручний столик на інтерактивній карті закладу
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>План закладу</span>
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                </CardTitle>
                <CardDescription>
                  Клікніть на вільний столик щоб обрати
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500" />
                    <span>Вільний</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-red-400" />
                    <span>Заброньовано</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary" />
                    <span>Обраний</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-300" />
                    <span>Мало місць</span>
                  </div>
                </div>

                <div className="relative bg-secondary/30 rounded-lg border p-4 overflow-auto">
                  <div className="relative w-[500px] h-[400px]">
                    {}
                    <div className="absolute top-0 left-0 w-full h-8 bg-muted/30 rounded flex items-center px-3">
                      <span className="text-xs text-muted-foreground">Вхід</span>
                    </div>

                    {}
                    {tables.map((table) => {
                      const style = getTableStyle(table);
                      return (
                        <div
                          key={table.id}
                          style={{ left: style.left, top: style.top, width: style.width, height: style.height }}
                          className={style.className}
                          onClick={() => handleTableClick(table)}
                        >
                          <div className="text-center">
                            <div>{table.table_number}</div>
                            <div className="text-[10px] opacity-80">{table.seats} міс.</div>
                          </div>
                        </div>
                      );
                    })}

                    {}
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-muted/30 rounded flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Барна стійка</span>
                    </div>
                  </div>
                </div>

                {selectedTable && (
                  <Alert className="mt-4 bg-primary/10 border-primary/20">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <AlertDescription>
                      Обрано столик №{selectedTable.table_number} ({selectedTable.seats} місць)
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Оберіть параметри</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {}
                  <div className="space-y-2">
                    <Label>Дата</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, 'd MMMM yyyy', { locale: uk }) : 'Оберіть дату'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => d && setDate(d)}
                          disabled={(d) => d < new Date() || d > addDays(new Date(), 30)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {}
                  <div className="space-y-2">
                    <Label htmlFor="time">Час</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {}
                  <div className="space-y-2">
                    <Label htmlFor="partySize">Кількість гостей</Label>
                    <Select value={partySize} onValueChange={setPartySize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <SelectItem key={n} value={n.toString()}>
                            {n} {n === 1 ? 'особа' : n < 5 ? 'особи' : 'осіб'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {}
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

                  <div className="space-y-2">
                    <Label htmlFor="notes">Коментар</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Особливі побажання"
                      rows={2}
                    />
                  </div>

                  {errors.table && (
                    <p className="text-sm text-destructive">{errors.table}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!selectedTable || submitting}
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    Забронювати
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Alert, AlertDescription } from '@/components/ui/alert';
