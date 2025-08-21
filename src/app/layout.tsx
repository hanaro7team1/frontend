import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '시도 SIDO',
  icons: { icon: '/icons/sido_logo.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
