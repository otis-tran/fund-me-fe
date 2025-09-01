import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FundMe DApp - Decentralized Crowdfunding',
  description:
    'Fund projects with cryptocurrency using our decentralized platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
