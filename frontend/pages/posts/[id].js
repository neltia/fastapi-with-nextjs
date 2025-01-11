import Layout from "../../components/Layout";
import { fetchPostById } from "../../utils/api";

export default function Post({ post }) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {post.title}
        </h1>
        <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          {post.content}
        </p>
        <a
          href="/posts"
          className="inline-block mt-8 px-4 py-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-gray-200 rounded-md shadow hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          목록으로 돌아가기
        </a>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const post = await fetchPostById(params.id);
  return { props: { post } };
}
