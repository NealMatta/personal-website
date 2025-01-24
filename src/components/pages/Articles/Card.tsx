interface CardProps {
  title: string;
  details: string;
  postedDate: string;
  imageUrl: string; // Add a new prop for the image URL
}

export default function Card({
  title,
  details,
  postedDate,
  imageUrl,
}: CardProps) {
  return (
    <>
      <div className="items-start p-6 bg-white border rounded-lg shadow-md">
        <div className="flex">
          {/* Image Section */}
          <img
            src={imageUrl}
            alt={title}
            className="w-24 h-24 object-cover rounded-lg mr-6"
          />

          {/* Text Content Section */}
          <div>
            <h3 className="italic text-gray-500">{postedDate}</h3>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p>{details}</p>
          </div>
        </div>
      </div>
    </>
  );
}
