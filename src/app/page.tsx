import Image from 'next/image'
import { usePathname } from 'next/navigation'


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">

      <div className="prose">
        <h1> H1 Heading </h1>
        <h2> H2 Heading </h2>
        <h3> H3 Heading </h3>
        <h4> H4 Heading </h4>
        <h5> H5 Heading </h5>
      </div>
      <br />
      <p> Paragragh </p>

    </main>
  )
}
