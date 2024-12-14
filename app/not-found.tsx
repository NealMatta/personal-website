import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]  text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
