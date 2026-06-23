import { supabase } from '@/lib/supabase';
import { TablesAdminClient } from './tables-client';

export default async function AdminTablesPage() {
  const { data: tables } = await supabase
    .from('tables')
    .select('*')
    .order('table_number', { ascending: true });

  return <TablesAdminClient initialTables={tables || []} />;
}
