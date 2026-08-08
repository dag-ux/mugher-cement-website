import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaImage, FaSpinner } from 'react-icons/fa';
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

export default function AdminProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    image_url: '',
  });

  useEffect(() => {
    if (id) {
      setFetching(true);
      API.get(`/products/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => setToast({ message: 'Failed to load product.', type: 'error' }))
        .finally(() => setFetching(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await API.put(`/products/${id}`, form);
        setToast({ message: 'Product updated successfully!', type: 'success' });
      } else {
        await API.post('/products', form);
        setToast({ message: 'Product created successfully!', type: 'success' });
      }
      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (err) {
      setToast({ message: 'Failed to save product.', type: 'error' });
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-body">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white">
          {id ? 'Edit Product' : 'Add Product'}
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">{id ? `ID: ${id}` : 'New'}</span>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition" placeholder="e.g. Ordinary Portland Cement" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug <span className="text-red-500">*</span></label>
          <input type="text" name="slug" value={form.slug} onChange={handleChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition" placeholder="e.g. ordinary-portland-cement" />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">URL-friendly identifier (lowercase, hyphens)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition" placeholder="Product description..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <input type="text" name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition" placeholder="e.g. OPC, PPC, Specialty" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" name="image_url" value={form.image_url} onChange={handleChange} className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition" placeholder="https://example.com/image.jpg" />
            <div className="flex-shrink-0 w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800">
              {form.image_url ? (
                <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              ) : (
                <Icon icon={FaImage} className="text-gray-400 dark:text-gray-500 text-xl" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-3">
          <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-[#2EAD32] hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <>
                <Icon icon={FaSpinner} className="animate-spin" size={16} />
                Saving...
              </>
            ) : (
              <>
                <Icon icon={FaSave} size={16} />
                {id ? 'Update Product' : 'Create Product'}
              </>
            )}
          </button>
          <Link to="/admin/products" className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-6 py-2.5 rounded-lg font-semibold transition">
            <Icon icon={FaTimes} size={16} />
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}