'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TablesAdminClient } from './tables-client';
import type { Table } from '@/lib/database.types';

export default function AdminTablesPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('tables')
        .select('*')
        .order('table_number', { ascending: true });

      setTables(data || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Завантаження...</div>
      </div>
    );
  }

  return <TablesAdminClient initialTables={tables} />;
}
