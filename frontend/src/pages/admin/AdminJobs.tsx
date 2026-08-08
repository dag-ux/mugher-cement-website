import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaBriefcase, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import API from '../../services/api';

const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

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

interface Job {
  id: number;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      setToast({ message: 'Failed to load jobs.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: number, currentStatus: boolean, title: string) => {
    try {
      const newStatus = !currentStatus;
      await API.put(`/admin/jobs/${id}`, { is_active: newStatus });
      setJobs(jobs.map((j) => (j.id === id ? { ...j, is_active: newStatus } : j)));
      setToast({ message: `"${title}" ${newStatus ? 'activated' : 'deactivated'}.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to update job status.', type: 'error' });
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await API.delete(`/admin/jobs/${id}`);
      setJobs(jobs.filter((j) => j.id !== id));
      setToast({ message: `"${title}" deleted successfully.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to delete job.', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-body">Loading jobs...</p>
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
            <Icon icon={FaBriefcase} className="text-[#2EAD32]" />
            Manage Jobs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {jobs.length} job{jobs.length !== 1 ? 's' : ''} available
            {' • '}
            <span className="text-green-500 font-semibold">{jobs.filter((j) => j.is_active).length} active</span>
          </p>
        </div>
        <Link
          to="/admin/jobs/create"
          className="inline-flex items-center gap-2 bg-[#2EAD32] hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg text-sm whitespace-nowrap"
        >
          <Icon icon={FaPlus} size={14} />
          Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Icon icon={FaBriefcase} className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-body">No job openings added yet.</p>
          <Link to="/admin/jobs/create" className="inline-block mt-4 text-[#2EAD32] hover:text-emerald-700 font-semibold">
            Create your first job posting →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Title</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Location</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Type</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Status</th>
                <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">
                    <div className="flex items-center gap-2">
                      <Icon icon={FaBriefcase} className="text-[#2EAD32] text-sm" />
                      <span>{job.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{job.location}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                      {job.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(job.id, job.is_active, job.title)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition ${
                        job.is_active
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {job.is_active ? (
                        <>
                          <Icon icon={FaCheckCircle} size={10} /> Active
                        </>
                      ) : (
                        <>
                          <Icon icon={FaTimesCircle} size={10} /> Inactive
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/jobs/edit/${job.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition"
                      >
                        <Icon icon={FaEdit} size={14} />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(job.id, job.title)}
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