import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'PlanAHunt — Public Land Hunting & Fishing',
  description: 'Find public land hunting and fishing opportunities across the Southeast. Season dates, quota hunts, regulations, and interactive maps.',
  keywords: ['hunting', 'fishing', 'public land', 'WMA', 'Georgia', 'seasons', 'regulations'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
