export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Header Section */}
      <div className="h-8 w-2/3 bg-gray-300 rounded-sm mt-4"></div>
      <div className="mt-2">
        <div className="flex flex-wrap gap-3">
          <div className="h-6 w-20 bg-gray-300 rounded-sm"></div>
          <div className="h-6 w-24 bg-gray-300 rounded-sm"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-sm"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        {/* Details */}
        <div className="flex-1 space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="h-24 bg-gray-300 rounded-lg"></div>
          ))}
        </div>

        {/* Images */}
        <div className="flex-1 space-y-4">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="w-full h-48 bg-gray-300 rounded-md"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
