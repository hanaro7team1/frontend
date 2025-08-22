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
    <html lang='ko'>
      <body className='flex h-screen items-center justify-center overflow-hidden antialiased'>
        <div className='h-full w-full overflow-y-auto bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] sm:max-w-sm [&::-webkit-scrollbar]:hidden'>
          {children}
        </div>
      </body>
    </html>
  );
}
