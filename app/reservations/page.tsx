import { supabase } from '@/lib/supabase';
import { ReservationClient } from './reservations-client';

export default async function ReservationsPage() {
  const { data: tables } = await supabase
    .from('tables')
    .select('*')
    .eq('is_active', true)
    .order('table_number', { ascending: true });

  return <ReservationClient tables={tables || []} />;
}
