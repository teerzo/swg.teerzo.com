import Head from 'next/head'
import Link from 'next/link'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function Home() {
  return (
    <div className="container">
      {/* <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <Header />


      <main>
        <h1 className="title">
          SWG Tools & Stuff
        </h1>

        <Link href="/">
          {/* <a> Home </a> */}
        </Link>

        <Link href="/expertise">
          {/* <a> Expertise Calculator </a> */}
        </Link>

        
        <Link href="/gcw">
          {/* <a> GCW Stuff </a> */}
        </Link>
      </main>

      <Footer />
    </div>
  )
}
