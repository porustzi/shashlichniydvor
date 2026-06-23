'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { OrdersAdminClient } from './orders-client';
import type { Order } from '@/lib/database.types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      setOrders(data || []);
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

  return <OrdersAdminClient initialOrders={orders} />;
}
