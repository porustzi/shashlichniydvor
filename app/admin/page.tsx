import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Utensils,
  ShoppingCart,
  Calendar,
  Grid3X3,
  BarChart3,
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Замовлення сьогодні', value: '12', change: '+3' },
    { title: 'Бронювання на сьогодні', value: '8', change: '+2' },
    { title: 'Страв', value: '16', change: '' },
    { title: 'Доход (грн)', value: '15,420', change: '+12%' },
  ];

  const quickLinks = [
    {
      title: 'Меню',
      description: 'Категорії та страви',
      icon: Utensils,
      href: '/admin/menu',
      color: 'bg-restaurant-500',
    },
    {
      title: 'Замовлення',
      description: 'Перегляд та управління',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-green-500',
    },
    {
      title: 'Бронювання',
      description: 'Список бронювань',
      icon: Calendar,
      href: '/admin/reservations',
      color: 'bg-blue-500',
    },
    {
      title: 'Столики',
      description: 'План закладу',
      icon: Grid3X3,
      href: '/admin/tables',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">
            Адмін панель
          </h1>
          <p className="text-muted-foreground">
            Керуйте закладом та перевіряйте статистику
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  {stat.change && (
                    <span className="text-sm text-green-600 pb-1">
                      {stat.change}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="font-semibold text-xl mb-4">Швидкий доступ</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center`}
                    >
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
