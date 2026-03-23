'use client'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  title: string
  content: string
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])

  const fetchPosts = async () => {
    let { data: posts, error } = await supabase.from('posts').select('*')
    if (posts) {
      setPosts(posts ?? [])
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="p-2 rounded hover:bg-gray-200"
          >
            {post.id}. {post.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
