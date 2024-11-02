// app/layout.jsx
'use client';

import { Karla } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import Pagewrapper from '@/components/pagewrapper';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const karla = Karla({
  variable: '--font-karla',
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); 
  const [toggleCollapse, setToggleCollapse] = useState(false);

  // Assuming the login page is at the root path
  const isLoginPage = pathname === '/';

  return (
    <html lang="en" className={karla.variable}>
      <body>
        {isLoginPage ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {children}
          </div>
        ) : (
          <div className="flex min-h-screen">
            <Sidebar toggleCollapse={toggleCollapse} />
            <Header toggleCollapse={toggleCollapse} setToggleCollapse={setToggleCollapse} />
            <Pagewrapper toggleCollapse={toggleCollapse}>
              {children}
            </Pagewrapper>
          </div>
        )}
      </body>
    </html>
  );
}
