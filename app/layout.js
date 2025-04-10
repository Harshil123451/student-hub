import './globals.css';
import { Inter, Comic_Neue } from 'next/font/google';
import { AuthProvider } from '../components/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

const ErrorBoundary = dynamic(() => import('./components/ErrorBoundary'), { ssr: false });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const comicNeue = Comic_Neue({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-comic-neue',
});

export const metadata = {
  title: 'Student Portal',
  description: 'A portal for students to manage their academic life',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${comicNeue.variable} font-sans`}>
        <ErrorBoundary>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
} 