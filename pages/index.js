import Head from 'next/head'
import Link from 'next/link'
import Header from 'components/header'
import Footer from 'components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Header />
      <main>
        <h1 className="title"> SWG Tools & Stuff </h1>

      </main>
      <Footer />
    </div>
  )
}
