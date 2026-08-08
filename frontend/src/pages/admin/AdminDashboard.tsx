import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import {
  FaBox,
  FaNewspaper,
  FaBriefcase,
  FaUsers,
  FaEnvelope,
  FaChartLine,
  FaPlusCircle,
  FaEye,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';

// Safe icon renderer
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

interface DashboardStats {
  products: number;
  news: number;
  jobs: number;
  applications: number;
  messages: number;
  pendingApplications: number;
}

interface RecentActivity {
  id: number;
  type: 'product' | 'news' | 'job' | 'application' | 'message';
  title: string;
  time: string;
  status?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    news: 0,
    jobs: 0,
    applications: 0,
    messages: 0,
    pendingApplications: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch all data in parallel
        const [productsRes, newsRes, jobsRes, applicationsRes, messagesRes] = await Promise.all([
          API.get('/products'),
          API.get('/news'),
          API.get('/jobs'),
          API.get('/admin/applications'),
          API.get('/contacts'),
        ]);

        const products = productsRes.data;
        const news = newsRes.data;
        const jobs = jobsRes.data;
        const applications = applicationsRes.data;
        const messages = messagesRes.data;

        // Count pending applications
        const pendingApps = applications.filter((app: any) => app.status === 'pending').length;

        setStats({
          products: products.length,
          news: news.length,
          jobs: jobs.length,
          applications: applications.length,
          messages: messages.length,
          pendingApplications: pendingApps,
        });

        // Build recent activity (latest 4 items across all types)
        const activities: RecentActivity[] = [];

        // Add recent products (max 2)
        products.slice(0, 2).forEach((p: any) => {
          activities.push({
            id: p.id,
            type: 'product',
            title: `New product: ${p.name}`,
            time: new Date(p.created_at || Date.now()).toLocaleDateString(),
          });
        });

        // Add recent news (max 2)
        news.slice(0, 2).forEach((n: any) => {
          activities.push({
            id: n.id,
            type: 'news',
            title: `News published: ${n.title}`,
            time: new Date(n.created_at || Date.now()).toLocaleDateString(),
          });
        });

        // Add recent applications (max 2)
        applications.slice(0, 2).forEach((a: any) => {
          activities.push({
            id: a.id,
            type: 'application',
            title: `New application from ${a.name}`,
            time: new Date(a.created_at || Date.now()).toLocaleDateString(),
            status: a.status,
          });
        });

        // Add recent messages (max 2)
        messages.slice(0, 2).forEach((m: any) => {
          activities.push({
            id: m.id,
            type: 'message',
            title: `Message from ${m.name}: ${m.subject}`,
            time: new Date(m.created_at || Date.now()).toLocaleDateString(),
          });
        });

        // Sort by time (most recent first) and take latest 4
        activities.sort((a, b) => (a.time > b.time ? -1 : 1));
        setRecentActivity(activities.slice(0, 4));

      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        // If some endpoints fail, we still show zeros
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Card data
  const cards = [
    {
      title: 'Products',
      count: stats.products,
      icon: FaBox,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-600 dark:text-blue-400',
      link: '/admin/products',
    },
    {
      title: 'News',
      count: stats.news,
      icon: FaNewspaper,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-600 dark:text-green-400',
      link: '/admin/news',
    },
    {
      title: 'Jobs',
      count: stats.jobs,
      icon: FaBriefcase,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-600 dark:text-purple-400',
      link: '/admin/jobs',
    },
    {
      title: 'Applications',
      count: stats.applications,
      icon: FaUsers,
      color: 'from-amber-500 to-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-600 dark:text-amber-400',
      link: '/admin/applications',
      badge: stats.pendingApplications > 0 ? stats.pendingApplications : undefined,
    },
    {
      title: 'Messages',
      count: stats.messages,
      icon: FaEnvelope,
      color: 'from-red-500 to-red-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-600 dark:text-red-400',
      link: '/admin/messages',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-body">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-body text-sm mt-1">
            Overview of your Mugher Cement website activity.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            <Icon icon={FaChartLine} size={14} />
            Last updated: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className={`group ${card.bg} border ${card.border} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative`}
          >
            {card.badge && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {card.badge}
              </span>
            )}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-body">
                  {card.title}
                </p>
                <p className={`text-3xl font-heading font-bold ${card.text} mt-1`}>
                  {card.count}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                <Icon icon={card.icon} size={20} />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 group-hover:text-[#2EAD32] dark:group-hover:text-[#4ADE80] transition">
              <span>View all</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Two-column layout: Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white mb-4 flex items-center gap-2">
            <Icon icon={FaPlusCircle} size={18} className="text-[#2EAD32]" />
            Quick Actions
          </h2>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/products/create"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
              >
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon icon={FaBox} size={14} />
                </span>
                <span className="font-body text-sm">Add New Product</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/news/create"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
              >
                <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                  <Icon icon={FaNewspaper} size={14} />
                </span>
                <span className="font-body text-sm">Publish News</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/jobs/create"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
              >
                <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Icon icon={FaBriefcase} size={14} />
                </span>
                <span className="font-body text-sm">Post New Job</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/messages"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300"
              >
                <span className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                  <Icon icon={FaEnvelope} size={14} />
                </span>
                <span className="font-body text-sm">Check Messages</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white mb-4 flex items-center gap-2">
            <Icon icon={FaEye} size={18} className="text-[#2EAD32]" />
            Recent Activity
          </h2>
          {recentActivity.length === 0 ? (
            <div className="text-center py-8 text-gray-400 dark:text-gray-500">
              <Icon icon={FaFileAlt} size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent activity yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border-b border-slate-100 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 dark:text-gray-300 font-body text-sm">
                      {item.title}
                    </span>
                    {item.status && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : item.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : item.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <Icon icon={FaClock} size={12} />
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          )}
          {recentActivity.length > 0 && (
            <div className="mt-4 text-center">
              <Link
                to="/admin"
                className="text-sm text-[#2EAD32] hover:text-emerald-700 dark:text-[#4ADE80] dark:hover:text-emerald-400 transition"
              >
                View all activity →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}