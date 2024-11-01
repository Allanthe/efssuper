// app/layout.tsx
'use client';

import { Karla } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import Pagewrapper from '@/components/pagewrapper';
import { useState } from 'react';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter

const karla = Karla({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-karla',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current pathname
  const [toggleCollapse, setToggleCollapse] = useState(false);
  
  // Check if the current route is the login page
  const isLoginPage = pathname === '/';

  return (
    <html lang="en">
      <body className={karla.className}>
        {isLoginPage ? (
          // Render only the children (login page) for the login route
          <div className="flex min-h-screen items-center justify-center bg-gray-100">
            {children}
          </div>
        ) : (
          // Render the full layout for other routes
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
