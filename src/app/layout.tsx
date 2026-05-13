import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WebToolsEasy | The Private Data Canvas for Developers',
  description: 'A 100% client-side, drag-and-drop data pipeline tool. Decode JWTs, format JSON, and transform data without sending secrets to a server.',
  keywords: 'JSON formatter, JWT decoder, Base64 encoder, offline tools, developer utilities, client-side data transformation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0A0B] text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
