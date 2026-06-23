'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { Table } from '@/lib/database.types';

interface TablesAdminClientProps {
  initialTables: Table[];
}

export function TablesAdminClient({ initialTables }: TablesAdminClientProps) {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [loading, setLoading] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [form, setForm] = useState({
    table_number: '',
    seats: '4',
    table_type: 'square',
    position_x: '50',
    position_y: '50',
    width: '80',
    height: '80',
    is_active: true,
  });

  const resetForm = () => {
    setForm({
      table_number: '',
      seats: '4',
      table_type: 'square',
      position_x: '50',
      position_y: '50',
      width: '80',
      height: '80',
      is_active: true,
    });
    setEditingTable(null);
  };

  const handleEdit = (table: Table) => {
    setEditingTable(table);
    setForm({
      table_number: table.table_number.toString(),
      seats: table.seats.toString(),
      table_type: table.table_type,
      position_x: table.position_x.toString(),
      position_y: table.position_y.toString(),
      width: table.width.toString(),
      height: table.height.toString(),
      is_active: table.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.table_number) {
      toast.error('Введіть номер столика');
      return;
    }

    setLoading(true);
    try {
      const tableData = {
        table_number: parseInt(form.table_number),
        seats: parseInt(form.seats),
        table_type: form.table_type,
        position_x: parseFloat(form.position_x),
        position_y: parseFloat(form.position_y),
        width: parseFloat(form.width),
        height: parseFloat(form.height),
        is_active: form.is_active,
      };

      if (editingTable) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any)
          .from('tables')
          .update(tableData)
          .eq('id', editingTable.id);
        if (error) throw error;
        toast.success('Столик оновлено');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (supabase as any).from('tables').insert(tableData);
        if (error) throw error;
        toast.success('Столик створено');
      }

      const { data } = await supabase
        .from('tables')
        .select('*')
        .order('table_number', { ascending: true });
      setTables(data || []);
      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Save table error:', error);
      toast.error('Помилка при збереженні');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (table: Table) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('tables')
      .update({ is_active: !table.is_active })
      .eq('id', table.id);
    if (error) {
      toast.error('Помилка при оновленні');
      return;
    }
    setTables(
      tables.map((t) =>
        t.id === table.id ? { ...t, is_active: !t.is_active } : t
      )
    );
    toast.success(table.is_active ? 'Столик приховано' : 'Столик показано');
  };

  const handleDelete = async (table: Table) => {
    if (!confirm(`Видалити столик #${table.table_number}?`)) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('tables').delete().eq('id', table.id);
    if (error) {
      toast.error('Помилка при видаленні');
      return;
    }
    setTables(tables.filter((t) => t.id !== table.id));
    toast.success('Столик видалено');
  };

  const getTableStyle = (table: Table) => {
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
      className: cn(
        'absolute flex items-center justify-center text-white font-semibold text-sm transition-all',
        shape,
        table.is_active ? 'bg-green-500' : 'bg-gray-300',
        editingTable?.id === table.id && 'ring-4 ring-primary'
      ),
    };
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
              <h1 className="font-display text-3xl font-bold">Управління столиками</h1>
              <p className="text-muted-foreground">План закладу</p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Додати столик
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTable ? 'Редагувати столик' : 'Новий столик'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Номер столика *</Label>
                    <Input
                      type="number"
                      value={form.table_number}
                      onChange={(e) =>
                        setForm({ ...form, table_number: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Місць</Label>
                    <Input
                      type="number"
                      value={form.seats}
                      onChange={(e) => setForm({ ...form, seats: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Тип</Label>
                  <Select
                    value={form.table_type}
                    onValueChange={(v) => setForm({ ...form, table_type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="square">Квадратний</SelectItem>
                      <SelectItem value="round">Круглий</SelectItem>
                      <SelectItem value="bar">Барний</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Позиція X</Label>
                    <Input
                      type="number"
                      value={form.position_x}
                      onChange={(e) =>
                        setForm({ ...form, position_x: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Позиція Y</Label>
                    <Input
                      type="number"
                      value={form.position_y}
                      onChange={(e) =>
                        setForm({ ...form, position_y: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ширина</Label>
                    <Input
                      type="number"
                      value={form.width}
                      onChange={(e) => setForm({ ...form, width: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Висота</Label>
                    <Input
                      type="number"
                      value={form.height}
                      onChange={(e) => setForm({ ...form, height: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Активний</Label>
                  <Switch
                    checked={form.is_active}
                    onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                  />
                </div>
                <Button onClick={handleSave} disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  Зберегти
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>План закладу</CardTitle>
              </CardHeader>
              <CardContent>
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
                          style={{
                            left: style.left,
                            top: style.top,
                            width: style.width,
                            height: style.height,
                          }}
                          className={style.className}
                        >
                          <div className="text-center">
                            <div>{table.table_number}</div>
                            <div className="text-[10px] opacity-80">
                              {table.seats} міс.
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Список столиків</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tables.map((table) => (
                  <div
                    key={table.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      !table.is_active ? 'opacity-50' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Стіл #{table.table_number}</span>
                        <Badge variant="secondary">
                          {table.table_type === 'square'
                            ? 'Квадратний'
                            : table.table_type === 'round'
                            ? 'Круглий'
                            : table.table_type === 'bar'
                            ? 'Барний'
                            : 'VIP'}
                        </Badge>
                        {!table.is_active && (
                          <Badge variant="destructive">Приховано</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {table.seats} місць • {table.width}x{table.height}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={table.is_active}
                        onCheckedChange={() => handleToggleActive(table)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(table)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(table)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
