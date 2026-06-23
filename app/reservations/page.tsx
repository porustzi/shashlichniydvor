'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ReservationClient } from './reservations-client';
import { fallbackTables } from '@/lib/fallback-data';
import type { Table } from '@/lib/database.types';

export default function ReservationsPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTables() {
      try {
        const { data, error } = await supabase
          .from('tables')
          .select('*')
          .eq('is_active', true)
          .order('table_number', { ascending: true });

        if (error || !data || data.length === 0) {
          setTables(fallbackTables);
        } else {
          setTables(data);
        }
      } catch {
        setTables(fallbackTables);
      } finally {
        setLoading(false);
      }
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
