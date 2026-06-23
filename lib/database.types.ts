export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      dishes: {
        Row: {
          id: string;
          category_id: string | null;
          name: string;
          slug: string;
          description: string | null;
          ingredients: string[] | null;
          price: number;
          weight_grams: number | null;
          image_url: string | null;
          is_popular: boolean;
          is_available: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category_id?: string | null;
          name: string;
          slug: string;
          description?: string | null;
          ingredients?: string[] | null;
          price: number;
          weight_grams?: number | null;
          image_url?: string | null;
          is_popular?: boolean;
          is_available?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string | null;
          name?: string;
          slug?: string;
          description?: string | null;
          ingredients?: string[] | null;
          price?: number;
          weight_grams?: number | null;
          image_url?: string | null;
          is_popular?: boolean;
          is_available?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      tables: {
        Row: {
          id: string;
          table_number: number;
          seats: number;
          table_type: string;
          position_x: number;
          position_y: number;
          width: number;
          height: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          table_number: number;
          seats?: number;
          table_type?: string;
          position_x?: number;
          position_y?: number;
          width?: number;
          height?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          table_number?: number;
          seats?: number;
          table_type?: string;
          position_x?: number;
          position_y?: number;
          width?: number;
          height?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reservations: {
        Row: {
          id: string;
          table_id: string | null;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          party_size: number;
          reservation_date: string;
          reservation_time: string;
          duration_hours: number;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          table_id?: string | null;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          party_size: number;
          reservation_date: string;
          reservation_time: string;
          duration_hours?: number;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          table_id?: string | null;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string | null;
          party_size?: number;
          reservation_date?: string;
          reservation_time?: string;
          duration_hours?: number;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          order_type: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string | null;
          delivery_address: string | null;
          delivery_notes: string | null;
          subtotal: number;
          delivery_fee: number;
          total: number;
          status: string;
          payment_method: string;
          notes: string | null;
          estimated_time: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          order_type: string;
          customer_name: string;
          customer_phone: string;
          customer_email?: string | null;
          delivery_address?: string | null;
          delivery_notes?: string | null;
          subtotal: number;
          delivery_fee?: number;
          total: number;
          status?: string;
          payment_method?: string;
          notes?: string | null;
          estimated_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          order_type?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string | null;
          delivery_address?: string | null;
          delivery_notes?: string | null;
          subtotal?: number;
          delivery_fee?: number;
          total?: number;
          status?: string;
          payment_method?: string;
          notes?: string | null;
          estimated_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          dish_id: string | null;
          dish_name: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          dish_id?: string | null;
          dish_name: string;
          quantity: number;
          unit_price: number;
          total_price: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          dish_id?: string | null;
          dish_name?: string;
          quantity?: number;
          unit_price?: number;
          total_price?: number;
          notes?: string | null;
          created_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          name: string;
          role: string;
          is_active: boolean;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          name: string;
          role?: string;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          name?: string;
          role?: string;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Category = Tables<'categories'>;
export type Dish = Tables<'dishes'>;
export type Table = Tables<'tables'>;
export type Reservation = Tables<'reservations'>;
export type Order = Tables<'orders'>;
export type OrderItem = Tables<'order_items'>;
export type AdminUser = Tables<'admin_users'>;

export type DishWithCategory = Dish & { categories: Category | null };
export type OrderWithItems = Order & { order_items: OrderItem[] };
export type ReservationWithTable = Reservation & { tables: Table | null };
