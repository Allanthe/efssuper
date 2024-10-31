'use client';

import { Karla } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import Pagewrapper from '@/components/pagewrapper';
import { useState } from 'react';

const karla = Karla({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-karla',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  
  return (
    <html lang="en">
      <body className={karla.className}>
        <div className="flex min-h-screen">
          <Sidebar toggleCollapse={toggleCollapse} /> {/* Only pass toggleCollapse */}
          <Header toggleCollapse={toggleCollapse} setToggleCollapse={setToggleCollapse} />
          <Pagewrapper toggleCollapse={toggleCollapse}>
            {children}
          </Pagewrapper>
        </div>
      </body>
    </html>
  );
}
