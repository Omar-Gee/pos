import type { User } from '../interfaces'
import useSwr from 'swr'
import Link from 'next/link'
import {useState} from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Index() {
  const { data, error, isLoading } = useSwr<User[]>('/api/users', fetcher)
  const [name, setName] = useState('');
  if (error) return <div>Failed to load users</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  
  const send =() => {
    fetch('/api/tester', {
      method: 'POST',
      body: JSON.stringify({name})
    })
  }
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <Link href="/user/[id]" as={`/user/${user.id}`}>
            {user.name ?? `User ${user.id}`}
          </Link>
        </li>
      ))}
  
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      <button onClick={send}>send</button>
    </ul>
  )
}
