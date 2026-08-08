import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaNewspaper, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';
import API from '../../services/api';

// ===== Safe Icon Wrapper =====
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

// ===== Toast Component =====
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 max-w-sm w-full rounded-xl shadow-2xl px-5 py-4 text-white transform transition-all duration-300 animate-slide-in ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{type === 'success' ? '✅' : '❌'}</span>
        <div>
          <p className="font-semibold text-sm">{type === 'success' ? 'Success!' : 'Error!'}</p>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <button onClick={onClose} className="ml-auto text-white/70 hover:text-white transition">
          ✕
        </button>
      </div>
    </div>
  );
};

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  is_published: boolean;
}

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await API.get('/news');
      setNews(res.data);
    } catch (err) {
      setToast({ message: 'Failed to load news.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await API.delete(`/news/${id}`);
      setNews(news.filter((n) => n.id !== id));
      setToast({ message: `"${title}" deleted successfully.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to delete news.', type: 'error' });
    }
  };

  const togglePublish = async (id: number, currentStatus: boolean, title: string) => {
    try {
      const newStatus = !currentStatus;
      await API.put(`/news/${id}`, { is_published: newStatus });
      setNews(news.map((n) => (n.id === id ? { ...n, is_published: newStatus } : n)));
      setToast({ message: `"${title}" ${newStatus ? 'published' : 'unpublished'}.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to update status.', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-body">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white flex items-center gap-2">
            <Icon icon={FaNewspaper} className="text-[#2EAD32]" />
            Manage News
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {news.length} article{news.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <Link
          to="/admin/news/create"
          className="inline-flex items-center gap-2 bg-[#2EAD32] hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg text-sm whitespace-nowrap"
        >
          <Icon icon={FaPlus} size={14} />
          Add News
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Icon icon={FaImage} className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-body">No news articles added yet.</p>
          <Link to="/admin/news/create" className="inline-block mt-4 text-[#2EAD32] hover:text-emerald-700 font-semibold">
            Write your first article →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Title</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">
                    <div className="flex items-center gap-3">
                      {item.cover_image ? (
                        <img
                          src={item.cover_image}
                          alt={item.title}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                          <Icon icon={FaImage} size={16} />
                        </div>
                      )}
                      <span className="line-clamp-1">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => togglePublish(item.id, item.is_published, item.title)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition ${
                        item.is_published
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
                      }`}
                    >
                      {item.is_published ? (
                        <>
                          <Icon icon={FaEye} size={10} /> Published
                        </>
                      ) : (
                        <>
                          <Icon icon={FaEyeSlash} size={10} /> Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/news/edit/${item.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition"
                      >
                        <Icon icon={FaEdit} size={14} />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm transition"
                      >
                        <Icon icon={FaTrash} size={14} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}