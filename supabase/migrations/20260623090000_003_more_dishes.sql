-- Additional dishes (15+) to flesh out each category to ~8-10 items
INSERT INTO dishes (category_id, name, slug, description, ingredients, price, weight_grams, is_popular, display_order, is_available) VALUES

-- Шашлики (+3 → 10)
((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик з індички', 'shashlyk-turkey', 'Ніжний шашлик з філе індички в йогуртовому маринаді', ARRAY['індичка', 'йогурт', 'цибуля', 'спеції'], 250.00, 300, false, 8),
((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик по-карськи', 'shashlyk-karsky', 'Великий шашлик з баранини з овочами', ARRAY['баранина', 'помідори', 'перець', 'цибуля'], 420.00, 400, true, 9),
((SELECT id FROM categories WHERE slug = 'shashliks'), 'Шашлик з телятини', 'shashlyk-veal', 'М'який шашлик з молочної телятини', ARRAY['телятина', 'цибуля', 'спеції'], 340.00, 300, false, 10),

-- Стейки (+4 → 8)
((SELECT id FROM categories WHERE slug = 'steaks'), 'Стейк Портерхаус', 'steak-porterhouse', 'Великий стейк з двох частин: філе та стриплойн', ARRAY['яловичина на кістці', 'спеції', 'олія'], 750.00, 600, true, 5),
((SELECT id FROM categories WHERE slug = 'steaks'), 'Стейк Нью-Йорк', 'steak-new-york', 'Стейк з мармурової яловичини, витриманий сухим способом', ARRAY['яловичина', 'спеції', 'часник'], 490.00, 320, false, 6),
((SELECT id FROM categories WHERE slug = 'steaks'), 'Стейк з лосося', 'steak-salmon', 'Стейк зі свіжого лосося на грилі', ARRAY['лосось', 'лимон', 'спеції', 'кріп'], 380.00, 250, true, 7),
((SELECT id FROM categories WHERE slug = 'steaks'), 'Свиняча корейка на кістці', 'pork-rack', 'Соковита свиняча корейка на грилі', ARRAY['свинина на кістці', 'спеції', 'розмарин'], 350.00, 350, false, 8),

-- Салати (+4 → 8)
((SELECT id FROM categories WHERE slug = 'salads'), 'Салат з тунцем', 'salad-tuna', 'Салат з тунцем, яйцем та свіжими овочами', ARRAY['тунець', 'яйця', 'помідори', 'салат', 'оливки'], 210.00, 250, false, 5),
((SELECT id FROM categories WHERE slug = 'salads'), 'Салат з печерицями', 'salad-mushroom', 'Теплий салат з печерицями та шпинатом', ARRAY['печериці', 'шпинат', 'пармезан', 'соус'], 185.00, 240, false, 6),
((SELECT id FROM categories WHERE slug = 'salads'), 'Салат Олів'є', 'salad-olivier', 'Класичний салат Олів'є з куркою', ARRAY['курка', 'картопля', 'яйця', 'огірки', 'горошок'], 150.00, 250, true, 7),
((SELECT id FROM categories WHERE slug = 'salads'), 'Вінегрет', 'salad-vinaigrette', 'Традиційний вінегрет з овочів', ARRAY['буряк', 'картопля', 'квашена капуста', 'цибуля'], 120.00, 220, false, 8),

-- Перші страви (+3 → 8)
((SELECT id FROM categories WHERE slug = 'soups'), 'Суп сирний з куркою', 'cheese-chicken-soup', 'Ніжний сирний суп з куркою', ARRAY['курка', 'плавлений сир', 'картопля', 'морква'], 100.00, 350, false, 6),
((SELECT id FROM categories WHERE slug = 'soups'), 'Суп гороховий', 'pea-soup', 'Наваристий гороховий суп з м'ясом', ARRAY['горох', 'свинина', 'картопля', 'цибуля'], 90.00, 350, false, 7),
((SELECT id FROM categories WHERE slug = 'soups'), 'Окрошка', 'okroshka', 'Холодний суп на кефірі', ARRAY['кефір', 'редиска', 'огірки', 'яйця', 'зелень'], 85.00, 350, true, 8),

-- Гарніри (+4 → 8)
((SELECT id FROM categories WHERE slug = 'garnirs'), 'Картопля фрі', 'french-fries', 'Хрустка картопля фрі з соусом', ARRAY['картопля', 'олія', 'сіль'], 75.00, 180, true, 5),
((SELECT id FROM categories WHERE slug = 'garnirs'), 'Картопляне пюре', 'mashed-potatoes', 'Ніжне картопляне пюре з вершковим маслом', ARRAY['картопля', 'вершкове масло', 'молоко'], 65.00, 200, false, 6),
((SELECT id FROM categories WHERE slug = 'garnirs'), 'Паста з соусом', 'pasta-sauce', 'Макарони з домашнім томатним соусом', ARRAY['паста', 'томати', 'базилік', 'пармезан'], 95.00, 250, false, 7),
((SELECT id FROM categories WHERE slug = 'garnirs'), 'Квасоля тушкована', 'stewed-beans', 'Квасоля з овочами в томатному соусі', ARRAY['квасоля', 'морква', 'томати', 'цибуля'], 80.00, 200, false, 8),

-- Напої (+2 → 8)
((SELECT id FROM categories WHERE slug = 'drinks'), 'Квас домашній', 'homemade-kvas', 'Освіжаючий домашній квас', ARRAY['хліб', 'цукор', 'дріжджі'], 35.00, 400, false, 8),
((SELECT id FROM categories WHERE slug = 'drinks'), 'Узвар', 'uzvar', 'Традиційний український узвар із сухофруктів', ARRAY['сухофрукти', 'мед', 'вода'], 40.00, 350, false, 9),

-- Десерти (+3 → 8)
((SELECT id FROM categories WHERE slug = 'deserts'), 'Тірамісу', 'tiramisu', 'Італійський десерт маскарпоне', ARRAY['маскарпоне', 'кава', 'бісквіті', 'какао'], 110.00, 150, true, 6),
((SELECT id FROM categories WHERE slug = 'deserts'), 'Штрудель яблучний', 'apple-strudel', 'Тонке тісто з яблуками та корицею', ARRAY['яблука', 'тісто', 'кориця', 'цукор'], 80.00, 180, false, 7),
((SELECT id FROM categories WHERE slug = 'deserts'), 'Сирники', 'syrnyky', 'Класичні сирники зі сметаною', ARRAY['сир', 'яйця', 'борошно', 'сметана'], 70.00, 200, false, 8);
