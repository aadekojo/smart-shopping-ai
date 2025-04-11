import './styles/globals.css';
import { Inter } from 'next/font/google';
import { CartProvider } from '../app/context/CartContext';
import Navbar from '../app/components/Navbar';
import { CurrencyProvider } from './context/CurrencyContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Smart Shopping Assistant',
  description: 'Find and buy items fast with Deliverado',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CurrencyProvider>
          <CartProvider>
            <Navbar />
            {children}</CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
