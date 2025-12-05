import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import { ProgressProvider } from '@/context/ProgressContext';

export const metadata: Metadata = {
  title: 'CyberLearn - Security Fundamentals',
  description: 'An interactive learning hub for cybersecurity fundamentals. Master networking, cryptography, and security concepts through hands-on challenges.',
  keywords: ['cybersecurity', 'learning', 'security', 'networking', 'hacking', 'CTF', 'education'],
  authors: [{ name: 'CyberLearn' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  themeColor: '#0A0A0F',
  openGraph: {
    title: 'CyberLearn - Security Fundamentals',
    description: 'Master cybersecurity through interactive modules and hands-on challenges.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProgressProvider>
          {/* Mobile Navigation */}
          <MobileNav />
          
          <div className="flex min-h-screen">
            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden md:block">
              <Sidebar />
            </div>
            
            <main className="flex-1 min-w-0 overflow-auto">
              <div className="grid-pattern min-h-full">
                {children}
              </div>
            </main>
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
