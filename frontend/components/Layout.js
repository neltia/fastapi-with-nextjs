export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="max-w-7xl mx-auto p-4 mt-16">{children}</main>
    </div>
  );
}
