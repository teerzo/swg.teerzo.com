import Header from 'components/Header'
import Footer from 'components/Footer'
import Link from 'components/common/link';

export default function Expertise() {
  return (
    <div className="container">
      <Header />
      <main>
        <h3> Expertise </h3>


        <Link href="/expertise/commando">Commando </Link>

      </main>
      <Footer />
    </div>
  )
}
