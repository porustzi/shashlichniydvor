'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ReservationClient } from './reservations-client';
import type { Table } from '@/lib/database.types';

export default function ReservationsPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTables() {
      const { data } = await supabase
        .from('tables')
        .select('*')
        .eq('is_active', true)
        .order('table_number', { ascending: true });

      setTables(data || []);
      setLoading(false);
    }

    fetchTables();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Завантаження...</div>
      </div>
    );
  }

  return <ReservationClient tables={tables} />;
}
