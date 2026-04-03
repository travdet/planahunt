import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PlanAHunt — Public Land Hunting & Fishing',
  description: 'Find public land hunting and fishing opportunities across the Southeast. Season dates, quota hunts, regulations, and interactive maps.',
  keywords: ['hunting', 'fishing', 'public land', 'WMA', 'Georgia', 'seasons', 'regulations'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full font-sans antialiased" style={{ background: '#1a1f16', color: '#e8e4d4' }}>
        {children}
      </body>
    </html>
  );
}
