import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

const favicon = 'https://raw.githubusercontent.com/Kandie19/kandie19.github.io/main/Kelvin%20Kandie%20Favicon.png';

export const metadata: Metadata = {
  title: 'Kelvin Kandie | Executive Command Center',
  description: 'Systems Architect, AI & Cybersecurity Engineer Portfolio and Command Center.',
  keywords: ['Kelvin Kandie', 'AEGIS', 'Systems Architect', 'Cybersecurity', 'AI Engineer'],
  icons: {
    icon: [{ url: favicon, type: 'image/png' }],
    shortcut: [{ url: favicon, type: 'image/png' }],
    apple: [{ url: favicon, type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-200">{children}</body>
    </html>
  );
}
