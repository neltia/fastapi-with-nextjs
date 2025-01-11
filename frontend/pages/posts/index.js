import Link from "next/link";
import Layout from "../../components/Layout";
import { fetchPosts } from "../../utils/api";

export default function Posts({ posts }) {
  return (
    <Layout>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">블로그 게시글</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          최신 게시글을 확인해 보세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
          >
            {/* 이미지 섹션 */}
            <div className="h-40 bg-gray-200 dark:bg-gray-700">
              <img
                src={post.image || "/placeholder.png"} // 이미지가 없으면 기본 이미지 사용
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
            {/* 텍스트 섹션 */}
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {post.content.substring(0, 100)}...
              </p>
              <Link
                href={`/posts/${post.id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200 rounded-md shadow hover:bg-blue-600 dark:hover:bg-blue-700"
              >
                자세히 보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts } };
}
