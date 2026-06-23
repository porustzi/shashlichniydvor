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
import { CalendarIcon, Users, Clock, CheckCircle, Loader2, Square, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { Table } from '@/lib/database.types';

interface ReservationClientProps {
  tables: Table[];
}

const defaultTables: Table[] = [
  { id: '1', table_number: 1, seats: 2, table_type: 'square', position_x: 10, position_y: 10, width: 80, height: 80, is_active: true, created_at: '', updated_at: '' },
  { id: '2', table_number: 2, seats: 4, table_type: 'square', position_x: 110, position_y: 10, width: 90, height: 90, is_active: true, created_at: '', updated_at: '' },
  { id: '3', table_number: 3, seats: 4, table_type: 'square', position_x: 220, position_y: 10, width: 90, height: 90, is_active: true, created_at: '', updated_at: '' },
  { id: '4', table_number: 4, seats: 6, table_type: 'round', position_x: 100, position_y: 130, width: 110, height: 110, is_active: true, created_at: '', updated_at: '' },
  { id: '5', table_number: 5, seats: 4, table_type: 'square', position_x: 240, position_y: 130, width: 90, height: 90, is_active: true, created_at: '', updated_at: '' },
  { id: '6', table_number: 6, seats: 8, table_type: 'vip', position_x: 360, position_y: 30, width: 130, height: 110, is_active: true, created_at: '', updated_at: '' },
  { id: '7', table_number: 7, seats: 2, table_type: 'bar', position_x: 10, position_y: 140, width: 80, height: 60, is_active: true, created_at: '', updated_at: '' },
  { id: '8', table_number: 8, seats: 2, table_type: 'bar', position_x: 10, position_y: 220, width: 80, height: 60, is_active: true, created_at: '', updated_at: '' },
  { id: '9', table_number: 9, seats: 4, table_type: 'square', position_x: 360, position_y: 170, width: 90, height: 90, is_active: true, created_at: '', updated_at: '' },
  { id: '10', table_number: 10, seats: 6, table_type: 'round', position_x: 130, position_y: 270, width: 110, height: 110, is_active: true, created_at: '', updated_at: '' },
];

export function ReservationClient({ tables: initialTables }: ReservationClientProps) {
  const [tables, setTables] = useState<Table[]>(
    initialTables.length > 0 ? initialTables : defaultTables
  );
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

    let bgColor = 'bg-green-500 hover:bg-green-600';
    if (isReserved) {
      bgColor = 'bg-red-400 cursor-not-allowed';
    } else if (isSelected) {
      bgColor = 'bg-primary ring-4 ring-primary/30';
    } else if (!canFitParty) {
      bgColor = 'bg-gray-300 cursor-not-allowed';
    }

    let shape = 'rounded-xl';
    if (table.table_type === 'round') {
      shape = 'rounded-full';
    } else if (table.table_type === 'bar') {
      shape = 'rounded-lg';
    } else if (table.table_type === 'vip') {
      shape = 'rounded-xl border-2 border-yellow-400';
    }

    return {
      left: `${table.position_x}px`,
      top: `${table.position_y}px`,
      width: `${table.width}px`,
      height: `${table.height}px`,
      className: cn(
        'absolute flex items-center justify-center text-white font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg',
        shape,
        bgColor,
        isSelected && 'scale-110 z-10',
        table.table_type === 'vip' && !isReserved && 'bg-purple-600 hover:bg-purple-700'
      ),
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
      <div className="min-h-screen py-16 flex items-center justify-center px-4">
        <Card className="text-center max-w-md w-full">
          <CardContent className="pt-8 pb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">Бронювання створено!</h1>
            <p className="text-muted-foreground mb-6">Ми зателефонуємо вам для підтвердження бронювання.</p>
            <div className="space-y-2 text-left mb-6 p-4 rounded-lg bg-secondary/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Столик</span>
                <span className="font-medium">№{selectedTable?.table_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Дата</span>
                <span className="font-medium">{format(date, 'd MMMM yyyy', { locale: uk })}</span>
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
    <div className="min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Бронювання столиків</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Оберіть зручний столик на інтерактивній карті закладу
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                  <span>План закладу</span>
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Клікніть на вільний столик щоб обрати
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <Square className="w-3.5 h-3.5 text-green-500 fill-green-500" />
                    <span>Вільний</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Square className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                    <span>Зайнятий</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Square className="w-3.5 h-3.5 fill-primary" />
                    <span>Обраний</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Circle className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
                    <span>VIP</span>
                  </div>
                </div>

                <div className="relative bg-secondary/30 rounded-xl border p-3 sm:p-4 overflow-x-auto">
                  <div className="relative w-[500px] h-[400px] mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-8 bg-muted/50 rounded-b-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Вхід</span>
                    </div>

                    {tables.filter(t => t.is_active).map((table) => {
                      const style = getTableStyle(table);
                      const isReserved = isTableReserved(table.id);
                      return (
                        <div
                          key={table.id}
                          style={{ left: style.left, top: style.top, width: style.width, height: style.height }}
                          className={style.className}
                          onClick={() => handleTableClick(table)}
                        >
                          <div className="text-center leading-tight">
                            <div className="text-xs sm:text-sm font-bold">№{table.table_number}</div>
                            <div className="text-[10px] opacity-80">{table.seats} міс.</div>
                            {table.table_type === 'vip' && (
                              <div className="text-[8px] uppercase tracking-wider mt-0.5">VIP</div>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-muted/50 rounded-t-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Барна стійка</span>
                    </div>
                  </div>
                </div>

                {selectedTable && (
                  <div className="mt-4 p-3 sm:p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm">
                      Обрано столик <strong>№{selectedTable.table_number}</strong> ({selectedTable.seats} місць)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg">Оберіть параметри</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Дата</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal h-10 sm:h-auto"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                          <span className="truncate text-sm">
                            {date ? format(date, 'd MMMM yyyy', { locale: uk }) : 'Оберіть дату'}
                          </span>
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

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm">Час</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="h-10 sm:h-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="partySize" className="text-sm">Кількість гостей</Label>
                    <Select value={partySize} onValueChange={setPartySize}>
                      <SelectTrigger className="h-10 sm:h-auto">
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

                  <div className="space-y-2">
                    <Label htmlFor="customer_name" className="text-sm">Ім'я <span className="text-destructive">*</span></Label>
                    <Input
                      id="customer_name"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      placeholder="Ваше ім'я"
                      className="h-10 sm:h-auto"
                    />
                    {errors.customer_name && <p className="text-sm text-destructive">{errors.customer_name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_phone" className="text-sm">Телефон <span className="text-destructive">*</span></Label>
                    <Input
                      id="customer_phone"
                      type="tel"
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      placeholder="+380 XX XXX XX XX"
                      className="h-10 sm:h-auto"
                    />
                    {errors.customer_phone && <p className="text-sm text-destructive">{errors.customer_phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_email" className="text-sm">Email</Label>
                    <Input
                      id="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      placeholder="email@example.com"
                      className="h-10 sm:h-auto"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-sm">Коментар</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Особливі побажання"
                      rows={2}
                    />
                  </div>

                  {errors.table && <p className="text-sm text-destructive">{errors.table}</p>}

                  <Button type="submit" className="w-full h-11 sm:h-auto text-sm" disabled={!selectedTable || submitting}>
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
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
