import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/Layout";
import { fetchPostById, updatePost } from "../../../utils/api";

export default function EditPost({ post }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(post.id, { title, content });
      router.push(`/posts/${post.id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          글 수정
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="10"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200 rounded-md shadow hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const post = await fetchPostById(params.id);
  return { props: { post } };
}
