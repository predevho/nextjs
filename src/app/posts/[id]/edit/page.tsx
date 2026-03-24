'use client'
import { supabase } from '@/lib/supabase'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { id } = useParams()

  const fetchPost = async () => {
    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()
    setTitle(post.title)
    setContent(post.content)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id)
      .select()
    if (error) {
      console.log(error)
    } else {
      alert('수정 성공')
      router.push('/posts')
    }
  }
  return (
    <form className="flex flex-col gap-2 items-start" onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="content"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="p-2 rounded hover:bg-gray-200 hover:text-black">
        수정
      </button>
    </form>
  )
}
