import Link from "next/link";
import { useState } from "react";
import { fetchPosts } from "../utils/api";

export default function Home({ posts }) {
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const searchResults = posts.filter((post) =>
      post.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPosts(searchResults);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <header className="text-center py-10">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            블로그
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            최신 게시글을 검색하고 읽어보세요!
          </p>
        </header>

        {/* 검색창 */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="게시글 제목 검색..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>

        {/* 게시글 목록 */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            최근 게시글
          </h2>
          <ul className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <li
                  key={post.id}
                  className="p-4 bg-white dark:bg-gray-800 shadow rounded-md hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    {post.content.substring(0, 100)}...
                  </p>
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-blue-500 dark:text-blue-400 hover:underline mt-2 block"
                  >
                    자세히 보기 →
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">검색 결과가 없습니다.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts } };
}
