import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">블로그</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/posts" className="hover:underline">
              글 목록
            </Link>
          </li>
          <li>
            <Link href="/posts/new" className="hover:underline">
              새 글 작성
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
