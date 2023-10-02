'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/navbar/navbar';
import { useEffect } from "react";
import { useTheme, ThemeProvider } from '../theme-provider';
import ThemeButtons from '../components/themebuttons/themebuttons';

type Themes = "rebel" | "light" | "imperial" | "dark";

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
          <Navbar />
          <div className={"container"}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
