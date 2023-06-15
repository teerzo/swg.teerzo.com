import './globals.css'
import { Inter } from 'next/font/google'
import Nav from './dashboard/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'swg.teerzo.com',
  description: 'Tools and Calculators for SWG Legends',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={"main"}>
          <Nav />
          <div className={"container"}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
