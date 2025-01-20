import PrimaryButton from '@/src/components/reusable/UI/PrimaryButton';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center  min-h-[calc(100vh-10rem)]  text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <PrimaryButton
        linkTo="/"
        target=""
        aria-label="Home"
        className="inline-flex items-center space-x-2"
      >
        <span>Return Home</span>
      </PrimaryButton>
    </div>
  );
}
