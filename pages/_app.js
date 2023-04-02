

import { Roboto } from 'next/font/google'
import './main.scss'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  )
}