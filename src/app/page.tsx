'use server'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Toaster } from "react-hot-toast";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  // const { data: { user } } = await supabase.auth.getUser();
  // const [searchQuery, setSearchQuery] = useState('');

  const routes = [
    {
      name: 'Database',
      href: '/database',
      description: 'Explore SWG database information',
      active: true
    },
    {
      name: 'Tools',
      href: '/tools',
      description: 'Access SWG tools and calculators',
      active: true
    },
    {
      name: 'Events',
      href: '/events',
      description: 'Upcoming events',
      active: false
    },
    {
      name: 'Collections',
      href: '/collections',
      description: 'Browse and track collections',
      active: false
    },
    {
      name: 'Characters',
      href: '/characters',
      description: 'View and manage your characters',
      active: false
    },
    {
      name: 'Ships',
      href: '/ships',
      description: 'Manage and view your ships',
      active: false
    },
    {
      name: 'Maps',
      href: '/maps',
      description: 'Explore SWG maps',
      active: false
    },

  ]

  return (
    // <main className="flex flex-col w-full p-6">
    <main className="container mx-auto px-4 py-8 max-w-6xl">

      <h1 className="text-3xl font-bold mb-6">SWG Dashboard</h1>

      {/* <div className="mb-6">
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ships Section */}

        {routes.map((route) => (
          <Card key={route.name} {...route} />

          // <Link href={route.href} className="block">
          //   <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          //     <h2 className="text-xl font-semibold mb-2">{route.name}</h2>
          //     <p className="text-muted-foreground">{route.description}</p>

          //     <p className="text-muted-foreground text-red-500">{route.active ? '' : 'Coming Soon...'} &nbsp;</p>
          //   </div>
          // </Link>
        ))}
      </div>
    </main>
  )
}

function Card({ name, href, description, active }: { name: string, href: string, description: string, active: boolean }) {
  return (
    <Link href={active ? href : '#'} className="block relative">
      <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-muted-foreground">{description}</p>
        {active ? '' :
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-white/50 flex items-center justify-center">
            <span className="text-red-500 text-2xl font-bold"> Coming soon... </span>
          </div>
        }
      </div>

    </Link>
  )
}