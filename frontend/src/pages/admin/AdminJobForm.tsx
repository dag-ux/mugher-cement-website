import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaSpinner, FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
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

export default function AdminJobForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    location: '',
    type: '',
    description: '',
    is_active: true,
  });

  useEffect(() => {
    if (id) {
      setFetching(true);
      API.get(`/jobs/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => setToast({ message: 'Failed to load job.', type: 'error' }))
        .finally(() => setFetching(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await API.put(`/admin/jobs/${id}`, form);
        setToast({ message: 'Job updated successfully!', type: 'success' });
      } else {
        await API.post('/admin/jobs', form);
        setToast({ message: 'Job created successfully!', type: 'success' });
      }
      setTimeout(() => navigate('/admin/jobs'), 1500);
    } catch (err) {
      setToast({ message: 'Failed to save job.', type: 'error' });
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-body">Loading job...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white">
          {id ? 'Edit Job' : 'Add Job'}
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">{id ? `ID: ${id}` : 'New'}</span>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title <span className="text-red-500">*</span></label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon={FaBriefcase} className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
              placeholder="e.g. Production Manager"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
            placeholder="e.g. production-manager"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">URL-friendly identifier (lowercase, hyphens)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location <span className="text-red-500">*</span></label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon={FaMapMarkerAlt} className="text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
              placeholder="e.g. Addis Ababa or Mugher Factory"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type <span className="text-red-500">*</span></label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon icon={FaClock} className="text-gray-400 dark:text-gray-500" />
            </div>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full pl-10 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition appearance-none"
            >
              <option value="">Select type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description <span className="text-red-500">*</span></label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            required
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition"
            placeholder="Job description, responsibilities, requirements..."
          />
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <input
            type="checkbox"
            name="is_active"
            id="is_active"
            checked={form.is_active}
            onChange={handleChange}
            className="w-5 h-5 text-[#2EAD32] focus:ring-[#2EAD32] rounded"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
            {form.is_active ? '✅ Active – visible on the careers page' : '❌ Inactive – hidden from visitors'}
          </label>
        </div>
        <div className="flex flex-wrap gap-3 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#2EAD32] hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Icon icon={FaSpinner} className="animate-spin" size={16} />
                Saving...
              </>
            ) : (
              <>
                <Icon icon={FaSave} size={16} />
                {id ? 'Update Job' : 'Create Job'}
              </>
            )}
          </button>
          <Link
            to="/admin/jobs"
            className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-lg font-semibold transition"
          >
            <Icon icon={FaTimes} size={16} />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}