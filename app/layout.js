import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../components/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Student Hub',
  description: 'Your one-stop platform for student resources',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
} 