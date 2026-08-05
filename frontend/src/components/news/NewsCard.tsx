import { Link } from 'react-router-dom';

interface NewsCardProps {
  news: {
    id: number;
    title: string;
    slug: string;
    cover_image: string;
    content: string;
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={news.cover_image || '/placeholder.jpg'}
        alt={news.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-brand">{news.title}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">{news.content}</p>
        <Link
          to={`/media/news/${news.slug}`}
          className="inline-block mt-3 text-secondary font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}