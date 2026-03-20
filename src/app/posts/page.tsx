'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function PostsList() {
  const [posts, setPosts] = useState([])

  //useEffect를 사용해서 외부 시스템과 컴포넌트를 동기화하는 hocks
  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then((res) => res.json())
      // posts안에 배열이 들어있음 더미 데이터를 셋 포스트에 넣어줌
      .then((res) => setPosts(res.posts))
  }, [])

  return (
    // posts 배열을 map으로 돌려서 li로 출력
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
