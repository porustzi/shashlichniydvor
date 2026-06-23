import { supabase } from '@/lib/supabase';
import { ReservationsAdminClient } from './reservations-client';

export default async function AdminReservationsPage() {
  const { data: reservations } = await supabase
    .from('reservations')
    .select('*, tables(*)')
    .order('created_at', { ascending: false })
    .limit(100);

  return <ReservationsAdminClient initialReservations={reservations || []} />;
}
