-- Additional dishes to fill out each category (4-6 per category)
INSERT INTO dishes (category_id, name, slug, description, ingredients, price, weight_grams, is_popular, display_order, is_available) VALUES

-- Шашлики (additional)
((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик Люля-кебаб', 'lyulya-kebab', 'Соковитий люля-кебаб з баранини на вугіллі', ARRAY['баранина', 'цибуля', 'зелень', 'спеції'], 290.00, 250, false, 5),
((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик асорті', 'shashlyk-assorti', 'Асорті з трьох видів м''яса на одному шампурі', ARRAY['свинина', 'яловичина', 'курка', 'цибуля', 'спеції'], 350.00, 350, true, 6),
((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик з печерицями', 'shashlyk-mushrooms', 'Ароматні печериці з соусом', ARRAY['печериці', 'соус', 'спеції', 'цибуля'], 150.00, 200, false, 7),

-- Стейки (additional)
((SELECT id FROM categories WHERE slug = 'steaks'), 'Стейк Тібоун', 'steak-tbone', 'Великий стейк на кістці з мармурової яловичини', ARRAY['яловичина на кістці', 'спеції', 'олія'], 620.00, 500, true, 3),
((SELECT id FROM categories WHERE slug = 'steaks'), 'Стейк Стріплойн', 'steak-striploin', 'Пісний стейк ніжної текстури', ARRAY['яловичина', 'спеції', 'розмарин'], 480.00, 300, false, 4),

-- Салати (additional)
((SELECT id FROM categories WHERE slug = 'salads'), 'Салат з печеним буряком', 'salad-beetroot', 'Теплий салат з буряком та козячим сиром', ARRAY['буряк', 'козячий сир', 'руккола', 'горіхи'], 190.00, 220, false, 3),
((SELECT id FROM categories WHERE slug = 'salads'), 'Салат м''ясний', 'salad-meat', 'Ситний салат з яловичиною та овочами', ARRAY['яловичина', 'овочі', 'соус', 'зелень'], 220.00, 280, true, 4),

-- Перші страви (additional)
((SELECT id FROM categories WHERE slug = 'soups'), 'Курячий суп з локшиною', 'chicken-noodle-soup', 'Ніжний курячий суп з домашньою локшиною', ARRAY['курка', 'локшина', 'морква', 'цибуля'], 85.00, 350, false, 3),
((SELECT id FROM categories WHERE slug = 'soups'), 'Грибний крем-суп', 'mushroom-cream-soup', 'Ніжний крем-суп з лісових грибів', ARRAY['гриби', 'вершки', 'картопля', 'цибуля'], 120.00, 300, true, 4),
((SELECT id FROM categories WHERE slug = 'soups'), 'Юшка рибна', 'fish-soup', 'Навариста рибна юшка зі свіжої риби', ARRAY['риба', 'картопля', 'морква', 'лавровий лист'], 130.00, 350, false, 5),

-- Гарніри (additional)
((SELECT id FROM categories WHERE slug = 'garnirs'), 'Рис з овочами', 'rice-vegetables', 'Розсипчастий рис з овочами', ARRAY['рис', 'морква', 'горошок', 'кукурудза'], 70.00, 200, false, 3),
((SELECT id FROM categories WHERE slug = 'garnirs'), 'Гречка з маслом', 'buckwheat-butter', 'Розсипчаста гречка з вершковим маслом', ARRAY['гречка', 'вершкове масло'], 65.00, 200, false, 4),

-- Напої (additional)
((SELECT id FROM categories WHERE slug = 'drinks'), 'Компот ягідний', 'berry-compote', 'Домашній компот із сезонних ягід', ARRAY['ягоди', 'цукор', 'вода'], 40.00, 350, false, 3),
((SELECT id FROM categories WHERE slug = 'drinks'), 'Кава чорна', 'black-coffee', 'Міцна чорна кава зі свіжомелених зерен', ARRAY['кава', 'цукор за запитом'], 50.00, 200, true, 4),
((SELECT id FROM categories WHERE slug = 'drinks'), 'Морс журавлинний', 'cranberry-juice', 'Освіжаючий журавлинний морс', ARRAY['журавлина', 'цукор', 'вода'], 45.00, 350, false, 5),
((SELECT id FROM categories WHERE slug = 'drinks'), 'Сік яблучний', 'apple-juice', 'Свіжовичавлений яблучний сік', ARRAY['яблука'], 60.00, 300, false, 6),
((SELECT id FROM categories WHERE slug = 'drinks'), 'Чай з обліпихи', 'sea-buckthorn-tea', 'Вітамінний чай з обліпихи та імбиру', ARRAY['обліпиха', 'імбир', 'мед'], 55.00, 300, false, 7),

-- Десерти (additional)
((SELECT id FROM categories WHERE slug = 'deserts'), 'Чізкейк класичний', 'cheesecake', 'Ніжний чізкейк з вершковим сиром', ARRAY['вершковий сир', 'тісто', 'ягоди', 'ваніль'], 95.00, 150, true, 3),
((SELECT id FROM categories WHERE slug = 'deserts'), 'Панна котта', 'panna-cotta', 'Італійський десерт з полуничним соусом', ARRAY['вершки', 'ваніль', 'полуниця'], 90.00, 180, false, 4),
((SELECT id FROM categories WHERE slug = 'deserts'), 'Морозиво пломбір', 'ice-cream', 'Морозиво пломбір з топінгами', ARRAY['пломбір', 'шоколад', 'горіхи'], 65.00, 150, false, 5);
