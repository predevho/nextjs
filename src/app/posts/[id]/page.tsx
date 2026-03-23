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

interface Comment {
  id: number
  post_id: string
  content: string
  created_at: string
}

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])

  const fetchPosts = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    setPost(post)
  }

  const fetchComments = async () => {
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id as string)
    setComments(comments ?? [])
  }

  useEffect(() => {
    fetchPosts()
    fetchComments()
  }, [])

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div>{post.id}번 게시글 상세</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </>
  )
}
