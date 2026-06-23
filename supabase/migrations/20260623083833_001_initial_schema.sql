-- Categories for menu items
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Menu dishes
CREATE TABLE dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  ingredients TEXT[],
  price DECIMAL(10,2) NOT NULL,
  weight_grams INTEGER,
  image_url TEXT,
  is_popular BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Restaurant tables for floor plan
CREATE TABLE tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_number INTEGER NOT NULL UNIQUE,
  seats INTEGER NOT NULL DEFAULT 4,
  table_type TEXT NOT NULL DEFAULT 'square', -- square, round, bar, vip
  position_x DECIMAL(10,2) NOT NULL DEFAULT 0,
  position_y DECIMAL(10,2) NOT NULL DEFAULT 0,
  width DECIMAL(10,2) DEFAULT 80,
  height DECIMAL(10,2) DEFAULT 80,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reservations
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID REFERENCES tables(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  party_size INTEGER NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  duration_hours INTEGER DEFAULT 2,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  order_type TEXT NOT NULL, -- delivery, pickup
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_address TEXT,
  delivery_notes TEXT,
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, preparing, ready, delivered, cancelled
  payment_method TEXT DEFAULT 'cash',
  notes TEXT,
  estimated_time TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  dish_id UUID REFERENCES dishes(id) ON DELETE SET NULL,
  dish_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin users (simple auth)
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read policies for menu and tables
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_dishes" ON dishes FOR SELECT USING (is_available = true);
CREATE POLICY "public_read_tables" ON tables FOR SELECT USING (is_active = true);

-- Public insert for orders and reservations
CREATE POLICY "public_insert_reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_order_items" ON order_items FOR INSERT WITH CHECK (true);

-- Admin policies (using service role for admin operations, or we can add authenticated policies)
CREATE POLICY "admin_all_categories" ON categories FOR ALL USING (true);
CREATE POLICY "admin_all_dishes" ON dishes FOR ALL USING (true);
CREATE POLICY "admin_all_tables" ON tables FOR ALL USING (true);
CREATE POLICY "admin_all_reservations" ON reservations FOR ALL USING (true);
CREATE POLICY "admin_all_orders" ON orders FOR ALL USING (true);
CREATE POLICY "admin_all_order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "admin_all_admin_users" ON admin_users FOR ALL USING (true);

-- Insert default tables for floor plan
INSERT INTO tables (table_number, seats, table_type, position_x, position_y, width, height) VALUES
  (1, 2, 'square', 50, 50, 70, 70),
  (2, 4, 'square', 150, 50, 80, 80),
  (3, 4, 'square', 270, 50, 80, 80),
  (4, 6, 'round', 150, 180, 100, 100),
  (5, 4, 'square', 270, 180, 80, 80),
  (6, 8, 'vip', 400, 100, 120, 100),
  (7, 2, 'bar', 50, 180, 70, 50),
  (8, 2, 'bar', 130, 180, 70, 50),
  (9, 4, 'square', 50, 280, 80, 80),
  (10, 6, 'round', 180, 300, 100, 100);

-- Insert default categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Шашлики', 'shashliks', 'Найсмачніші шашлики на живому вогні', 1),
  ('Стейки', 'steaks', 'Соковиті стейки преміум класу', 2),
  ('Салати', 'salads', 'Свіжі салати з натуральних інгредієнтів', 3),
  ('Перші страви', 'soups', 'Наваристі супи за домашніми рецептами', 4),
  ('Гарніри', 'garnirs', 'Апетитні гарніри до будь-якої страви', 5),
  ('Напої', 'drinks', 'Освіжаючі та гарячі напої', 6),
  ('Десерти', 'deserts', 'Солодкі десерти на будь-який смак', 7);

-- Insert sample dishes
INSERT INTO dishes (category_id, name, slug, description, ingredients, price, weight_grams, is_popular, display_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик зі свинини', 'shashlyk-svynya', 'Класичний шашлик з шийної частини', ARRAY['свинина', 'цибуля', 'спеції', 'сало'], 280.00, 300, true, 1),
  ((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик з яловичини', 'shashlyk-yalovychyna', 'Ніжний шашлик з мраморової яловичини', ARRAY['яловичина', 'цибуля', 'спеції'], 320.00, 300, true, 2),
  ((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик з курки', 'shashlyk-kurka', 'Соковитий шашлик з курячого стегна', ARRAY['курка', 'цибуля', 'спеції', 'лимон'], 220.00, 300, false, 3),
  ((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик з баранини', 'shashlyk-barannya', 'Ароматний шашлик з молодої баранини', ARRAY['баранина', 'цибуля', 'спеції', 'кінза'], 380.00, 350, true, 4),
  ((SELECT id FROM categories WHERE slug = 'steaks'), 'Стейк Рібай', 'steak-ribeye', 'Преміум стейк з мармурової яловичини', ARRAY['яловичина', 'олія', 'спеції', 'часник'], 450.00, 350, true, 1),
  ((SELECT id FROM categories WHERE slug = 'steaks'), 'Стейк Філе-міньйон', 'steak-filet-mignon', 'Найтендніший стейк', ARRAY['яловичина', 'вершкове масло', 'спеції'], 520.00, 300, false, 2),
  ((SELECT id FROM categories WHERE slug = 'salads'), 'Салат Цезар', 'salad-caesar', 'Класичний салат з куркою', ARRAY['курка', 'салат айсберг', 'пармезан', 'сухарики', 'соус цезар'], 180.00, 250, true, 1),
  ((SELECT id FROM categories WHERE slug = 'salads'), 'Грецький салат', 'salad-greek', 'Свіжий салат з овочів', ARRAY['помідори', 'огірки', 'перець', 'цибуля', 'фетакса', 'олії'], 160.00, 250, false, 2),
  ((SELECT id FROM categories WHERE slug = 'soups'), 'Борщ український', 'borsch', 'Традиційний український борщ', ARRAY['буряк', 'капуста', 'картопля', 'морква', 'цибуля', 'м''ясо'], 95.00, 350, true, 1),
  ((SELECT id FROM categories WHERE slug = 'soups'), 'Солянка м''ясна', 'solyanka', 'Навариста м''ясна солянка', ARRAY['яловичина', 'ковбаса', 'огірки', 'олівки', 'лимон'], 110.00, 350, false, 2),
  ((SELECT id FROM categories WHERE slug = 'garnirs'), 'Картопля по-селянськи', 'potato-village', 'Смажена картопля з салом', ARRAY['картопля', 'сало', 'цибуля', 'часник'], 85.00, 200, true, 1),
  ((SELECT id FROM categories WHERE slug = 'garnirs'), 'Овочі гриль', 'vegetables-grill', 'Смажені овочі на грилі', ARRAY['перець', 'кабачок', 'баклажан', 'помідори'], 90.00, 200, false, 2),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Лимонад домашній', 'lemonade', 'Освіжаючий лимонад', ARRAY['лимон', 'мята', 'цукор', 'вода'], 55.00, 400, true, 1),
  ((SELECT id FROM categories WHERE slug = 'drinks'), 'Чай з чебрецем', 'tea-thyme', 'Ароматний чай з гірського чебрецю', ARRAY['чебрець', 'чай', 'мед'], 45.00, 300, false, 2),
  ((SELECT id FROM categories WHERE slug = 'deserts'), 'Торт Наполеон', 'napoleon-cake', 'Класичний торт з заварним кремом', ARRAY['тісто', 'крем', 'ваніль'], 85.00, 150, true, 1),
  ((SELECT id FROM categories WHERE slug = 'deserts'), 'Медовик', 'honey-cake', 'Ніжний медовий торт', ARRAY['мед', 'тісто', 'сметанний крем'], 75.00, 150, false, 2);
