'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'


import type { Database } from '@/lib/database.types';

type Todo = Database['public']['Tables']['posts']['Row']

export default function Home() {
  const [todos, setTodos] = useState<Todo[] | null>(null)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('todos').select()
      setTodos(data)
    }

    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return todos ? <pre>{JSON.stringify(todos, null, 2)}</pre> : <p>Loading todos...</p>
}