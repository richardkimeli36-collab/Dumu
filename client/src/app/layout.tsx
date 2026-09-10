import type { Metadata } from 'next';
import { QueryClientProvider } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Dumu - Roofing Materials & Building Supplies',
  description: 'Buy premium roofing materials, corrugated sheets, and building supplies in Kenya',
  viewport: 'width=device-width, initial-scale=1',
  keywords: 'roofing, mabati, building supplies, Kenya',
};

function RootLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: QueryClientProvider should be wrapped in a client component
  // This is a simplified version. In production, use a separate client-side provider
  return (
    <html lang="en">
      <body>
        <RootLayoutContent>{children}</RootLayoutContent>
      </body>
    </html>
  );
}
