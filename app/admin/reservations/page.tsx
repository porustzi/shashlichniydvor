'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ReservationsAdminClient } from './reservations-client';
import type { ReservationWithTable } from '@/lib/database.types';

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<ReservationWithTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('reservations')
        .select('*, tables(*)')
        .order('created_at', { ascending: false })
        .limit(100);

      setReservations(data || []);
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

  return <ReservationsAdminClient initialReservations={reservations} />;
}
