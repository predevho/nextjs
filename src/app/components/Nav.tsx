'use client'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Nav() {
  const [user, setUser] = useState()

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleOnLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log(error)
    } else {
      alert('로그아웃 성공')
    }
  }
  return (
    <nav className="flex">
      <Link href="/" className="p-2 rounded hover:bg-gray-200 hover:text-black">
        메인
      </Link>
      <Link
        href="/posts"
        className="p-2 rounded hover:bg-gray-200 hover:text-black"
      >
        글목록
      </Link>
      {user ? (
        <button
          onClick={handleOnLogout}
          className="p-2 rounded hover:bg-gray-200"
        >
          로그아웃
        </button>
      ) : (
        <>
          <Link href="/signup" className="p-2 rounded hover:bg-gray-200">
            회원가입
          </Link>
          <Link href="/signin" className="p-2 rounded hover:bg-gray-200">
            로그인
          </Link>
        </>
      )}
    </nav>
  )
}
