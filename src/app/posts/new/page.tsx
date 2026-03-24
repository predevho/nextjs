'use client'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content }])
      .select()
    if (error) {
      console.log(error)
    } else if (!data || data.length === 0) {
      alert('권한이 없습니다.')
    } else {
      alert('글쓰기 성공')
      router.push('/posts')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
      <input
        type="text"
        placeholder="제목"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="content"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="p-2 rounded hover:bg-gray-200 hover:text-black">
        등록
      </button>
    </form>
  )
}
