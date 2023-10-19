// 'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from "react";
import { useTheme, ThemeProvider, Themes } from '../theme-provider';
import ThemeButtons from '../components/themebuttons/themebuttons';
import Header from '../components/header/header';
import { Toaster } from 'react-hot-toast';


// type Themes = "rebel" | "light" | "imperial" | "dark";

const inter = Inter({ subsets: ['latin'] })
// export const metadata = {
//   title: 'swg.teerzo.com',
//   description: 'Tools and Calculators for SWG Legends',
// }

export default function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <div className={"container"}>
            <Toaster/>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
