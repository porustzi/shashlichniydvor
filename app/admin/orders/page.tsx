import { supabase } from '@/lib/supabase';
import { OrdersAdminClient } from './orders-client';

export default async function AdminOrdersPage() {
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  return <OrdersAdminClient initialOrders={orders || []} />;
}
