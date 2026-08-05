import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import API from '../services/api';
import NewsCard from '../components/news/NewsCard';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  published_date: string;
}

export default function Media() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/news')
      .then((res) => setNews(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <Helmet><title>Media | Mugher Cement</title></Helmet>
      <h1 className="text-4xl font-bold text-brand mb-8">News & Press</h1>
      {news.length === 0 ? (
        <p className="text-gray-500">No news articles published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}