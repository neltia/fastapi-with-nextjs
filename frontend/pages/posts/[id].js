import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { deletePost, fetchPostById, fetchPosts } from "../../utils/api";

export default function Post({ post, posts }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deletePost(post.id);
        alert("게시글이 삭제되었습니다.");
        router.push("/posts");
      } catch (error) {
        console.error("삭제 중 오류가 발생했습니다:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        {/* 좌측 사이드바 */}
        <aside className="w-full md:w-1/4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
            카테고리
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="/category/technology"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                기술
              </Link>
            </li>
            <li>
              <Link
                href="/category/life"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                라이프
              </Link>
            </li>
            <li>
              <Link
                href="/category/travel"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                여행
              </Link>
            </li>
            <li>
              <Link
                href="/category/other"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                기타
              </Link>
            </li>
          </ul>
        </aside>

        {/* 메인 콘텐츠 */}
        <section className="flex-1 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 relative">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {post.title}
          </h1>

          {/* 버튼 섹션 */}
          <div className="flex justify-end gap-2 mb-6">
            <Link
              href={`/posts/edit/${post.id}`}
              className="px-3 py-1 bg-yellow-500 text-white dark:bg-yellow-600 dark:text-gray-200 rounded shadow hover:bg-yellow-600 dark:hover:bg-yellow-700 text-sm focus:outline-none"
            >
              수정
            </Link>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white dark:bg-red-600 dark:text-gray-200 rounded shadow hover:bg-red-600 dark:hover:bg-red-700 text-sm focus:outline-none"
            >
              삭제
            </button>
          </div>

          <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            {post.content}
          </p>
        </section>

        {/* 우측 사이드바 */}
        <aside className="w-full md:w-1/4 bg-gray-200 dark:bg-gray-800 p-4 rounded-md shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
            인기 게시글
          </h2>
          <ul className="space-y-4">
            {posts.slice(0, 5).map((relatedPost) => (
              <li
                key={relatedPost.id}
                className="text-gray-700 dark:text-gray-300"
              >
                <Link
                  href={`/posts/${relatedPost.id}`}
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  {relatedPost.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const post = await fetchPostById(params.id); // 현재 게시글 데이터
  const posts = await fetchPosts(); // 모든 게시글 데이터 (우측 사이드바용)
  return { props: { post, posts } };
}
