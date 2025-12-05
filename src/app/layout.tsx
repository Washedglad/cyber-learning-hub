import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { ProgressProvider } from '@/context/ProgressContext';

export const metadata: Metadata = {
  title: 'CyberLearn - Security Fundamentals',
  description: 'An interactive learning hub for cybersecurity fundamentals',
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
          <div className="flex min-h-screen">
            <Sidebar />
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

