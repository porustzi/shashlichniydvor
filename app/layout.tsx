import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CartSidebar } from '@/components/cart/cart-sidebar';
import { Toaster } from '@/components/ui/sonner';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Шашличний двір - Доставка шашликів та бронювання столиків',
  description:
    'Смачні шашлики на живому вогні. Замовляйте доставку або бронюйте столик у затишному ресторані.',
  openGraph: {
    title: 'Шашличний двір',
    description: 'Смачні шашлики на живому вогні',
    type: 'website',
    locale: 'uk_UA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="uk"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartSidebar />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
