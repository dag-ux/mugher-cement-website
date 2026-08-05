import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import API from '../services/api';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  published_date: string;
}

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchNews = async () => {
      try {
        const response = await API.get(`/news/${slug}`);
        setNews(response.data);
      } catch (err) {
        setError('News article not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error || !news) {
    return <div className="text-center py-20 text-red-500">{error || 'News not found'}</div>;
  }

  const formattedDate = news.published_date
    ? new Date(news.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Helmet>
        <title>{news.title} | Mugher Cement</title>
      </Helmet>

      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {news.cover_image && (
          <img
            src={news.cover_image}
            alt={news.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        <div className="p-6 md:p-8">
          {formattedDate && (
            <p className="text-gray-500 text-sm mb-2">{formattedDate}</p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-brand mb-6">
            {news.title}
          </h1>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {news.content}
          </div>
          <div className="mt-8">
            <a
              href="/media"
              className="text-secondary font-medium hover:underline"
            >
              ← Back to News
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}