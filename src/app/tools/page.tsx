'use client';

import { useState } from 'react';
import { FaCalculator, FaClock, FaUserFriends, FaChartLine, FaTools, FaCog, FaDatabase, FaCalendarAlt, FaShip, FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';

interface ToolCard {
  name: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  active: boolean;
}

export default function ToolsPage() {

  const tools: ToolCard[] = [
    {
      name: 'Expertise Calculator',
      description: 'Plan and optimize your character\'s expertise points',
      icon: <FaCalculator className="text-2xl" />,
      href: '/tools/expertise',
      active: true,
    },
    {
      name: 'GCW Timers',
      description: 'Track and manage various in-game timers',
      icon: <FaClock className="text-2xl" />,
      href: '/tools/timers',
      active: true,
    },
    {
      name: 'Entertainer Buffs',
      description: 'Calculate and track entertainer buffs',
      icon: <FaUserFriends className="text-2xl" />,
      href: '/tools/ent-buff',
      active: true,
    },
    {
      name: 'GCW Calculator',
      description: 'Calculate and track Galactic Civil War points',
      icon: <FaChartLine className="text-2xl" />,
      href: '/tools/gcw',
      active: true,
    },



    {
      name: 'Character Builder',
      description: 'Plan your character\'s progression',
      icon: <FaUserAlt className="text-2xl" />,
      href: '/tools/character-planner',
      active: false,
    }
  ];

  // const filteredTools = tools.filter(tool =>
  //   tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    // <main className="flex flex-col w-full p-6"></main>
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">Tools</h1>




      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="relative">
            <Link
              href={tool.active ? tool.href : '#'}
              className={`block bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-200 ${tool.active
                  ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer'
                  : 'opacity-70 cursor-not-allowed'
                }`}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  {tool.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{tool.title}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>

              {!tool.active && (
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 transform rotate-45 translate-x-16 -translate-y-16 flex items-center justify-center">
                    <span className="text-white font-bold text-sm transform translate-x-8 translate-y-8 whitespace-nowrap">Coming Soon</span>
                  </div>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <Card key={index} {...tool} />
        ))}
      </div>
    </div>
  )
}

function Card({ name, href, description, active }: { name: string, href: string, description: string, active: boolean }) {
  return (
    <Link href={active ? href : '#'} className="block relative">
      <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow min-h-32">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-muted-foreground">{description}</p>
        {active ? '' :
          <div className="absolute top-0 right-0 left-0 bottom-0 bg-white/50  rounded-lg  p-6 flex items-center justify-center">
            <span className="text-red-500 text-2xl font-bold"> Coming soon... </span>
          </div>
        }
      </div>

    </Link>
  )
}