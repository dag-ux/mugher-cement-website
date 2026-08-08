import { useState, useEffect } from 'react';
import API from '../../services/api';
import { FaDownload, FaUsers, FaClock, FaCheckCircle, FaTimesCircle, FaFilter } from 'react-icons/fa';

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

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  cover_letter: string | null;
  cv_path: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
  job: { id: number; title: string };
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'accepted' | 'rejected'>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get('/admin/applications');
      setApplications(res.data);
    } catch (err) {
      setToast({ message: 'Failed to load applications.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string, name: string) => {
    try {
      await API.put(`/admin/applications/${id}`, { status });
      setApplications(applications.map((app) => (app.id === id ? { ...app, status: status as any } : app)));
      setToast({ message: `Application from ${name} ${status}.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to update status.', type: 'error' });
    }
  };

  const downloadCV = async (id: number, name: string) => {
    try {
      const res = await API.get(`/admin/applications/${id}/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = `CV_${name.replace(/\s/g, '_')}_${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setToast({ message: `CV for ${name} downloaded.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to download CV.', type: 'error' });
    }
  };

  const total = applications.length;
  const pending = applications.filter((a) => a.status === 'pending').length;
  const reviewed = applications.filter((a) => a.status === 'reviewed').length;
  const accepted = applications.filter((a) => a.status === 'accepted').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const StatusBadge = ({ status }: { status: string }) => {
    const configs: Record<string, { color: string; label: string }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', label: 'Pending' },
      reviewed: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', label: 'Reviewed' },
      accepted: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', label: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', label: 'Rejected' },
    };
    const config = configs[status] || configs.pending;
    return <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-body">Loading applications...</p>
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
            <Icon icon={FaUsers} className="text-[#2EAD32]" />
            Job Applications
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{total} application{total !== 1 ? 's' : ''} received</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{total}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pending}</p>
          <p className="text-xs text-yellow-600 dark:text-yellow-400">Pending</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{reviewed}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">Reviewed</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{accepted}</p>
          <p className="text-xs text-green-600 dark:text-green-400">Accepted</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{rejected}</p>
          <p className="text-xs text-red-600 dark:text-red-400">Rejected</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'reviewed', 'accepted', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition capitalize ${
              filter === status
                ? 'bg-[#1A3C91] text-white dark:bg-gray-600'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {status === 'all' ? 'All' : status}
          </button>
        ))}
      </div>

      {filteredApplications.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Icon icon={FaUsers} className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-body">
            {filter === 'all' ? 'No applications yet.' : `No ${filter} applications.`}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Applicant</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Job</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">CV</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800 dark:text-gray-200">{app.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{app.email}</div>
                      {app.phone && <div className="text-xs text-gray-500 dark:text-gray-400">{app.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{app.job.title}</td>
                    <td className="px-4 py-3">
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value, app.name)}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => downloadCV(app.id, app.name)}
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition"
                      >
                        <Icon icon={FaDownload} size={14} />
                        <span>Download</span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 dark:text-gray-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredApplications.map((app) => (
              <div key={app.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{app.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{app.email}</p>
                    {app.phone && <p className="text-sm text-gray-500 dark:text-gray-400">{app.phone}</p>}
                  </div>
                  <StatusBadge status={app.status} />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-medium">Job:</span> {app.job.title}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => downloadCV(app.id, app.name)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition"
                    >
                      <Icon icon={FaDownload} size={14} />
                      <span>CV</span>
                    </button>
                  </div>
                  <select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value, app.name)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{new Date(app.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}