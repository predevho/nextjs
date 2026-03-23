import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex">
      <Link href="/" className="p-2 rounded hover:bg-gray-200">
        메인
      </Link>
      <Link href="/posts" className="p-2 rounded hover:bg-gray-200">
        글목록
      </Link>
      <Link href="/signup" className="p-2 rounded hover:bg-gray-200">
        회원가입
      </Link>
      <Link href="/signin" className="p-2 rounded hover:bg-gray-200">
        로그인
      </Link>
    </nav>
  )
}
