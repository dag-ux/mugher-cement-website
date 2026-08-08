import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import API from '../services/api';
import NewsCard from '../components/news/NewsCard';
import { FaNewspaper } from 'react-icons/fa';

// Safe icon renderer
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium font-body">Loading News...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>News | Mugher Cement</title>
        <meta
          name="description"
          content="Latest news, press releases, and updates from Mugher Cement."
        />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <Icon icon={FaNewspaper} className="text-5xl md:text-6xl mb-4 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-wide">
            News & Press
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mx-auto mt-4">
            Stay updated with the latest announcements, community stories, and media coverage.
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {news.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700">
            <Icon icon={FaNewspaper} className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 font-body text-lg">No news articles published yet.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 font-body mt-2">Check back soon for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <NewsCard news={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}