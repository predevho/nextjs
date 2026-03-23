'use client'

import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Post {
  id: number
  created_at: string
  title: string
  content: string
}

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  const fetchPosts = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    setPost(post)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>{post.id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
    </>
  )
}
