'use client'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [content, setContent] = useState<string>('')

  const fetchPosts = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    setPost(post)
  }
  const handleOnDelete = async (id: number) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      console.log(error)
    } else {
      alert('삭제 성공')
      router.push('/posts')
    }
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

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase
      .from('comments')
      .insert({ post_id: id as string, content: content })
    if (error) {
      console.log(error)
    } else {
      alert('댓글 작성 성공')
      fetchComments()
      setContent('')
    }
  }

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
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="content"
            value={content}
            placeholder="댓글"
            onChange={(e) => setContent(e.target.value)}
          />
          <button>댓글 작성</button>
        </form>
      </ul>
      <button
        className="p-2 rounded border border-black hover:bg-gray-200 hover:text-black"
        onClick={() => handleOnDelete(post.id)}
      >
        삭제
      </button>
      <Link href={`/posts/${post.id}/edit`}>수정</Link>
    </>
  )
}
