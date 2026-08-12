import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaSave, FaTimes, FaImage, FaSpinner, FaUpload, FaTrash } from 'react-icons/fa';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to save product.';
      setToast({ message: errorMessage, type: 'error' });
      setLoading(false);
    }
  };

  const clearImage = () => {
    setForm({ ...form, image_url: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white">
            {id ? 'Edit Product' : 'Add Product'}
          </h1>
          <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 font-body">
            {id ? `ID: ${id}` : 'New'}
          </span>
        </div>
        <Link
          to="/admin/products"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#2EAD32] dark:hover:text-[#4ADE80] transition flex items-center gap-1"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl">
        {/* Basic Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#2EAD32] rounded-full" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="e.g. Ordinary Portland Cement"
              />
            </div>

            {/* Slug */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="e.g. ordinary-portland-cement"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                URL-friendly identifier. Use lowercase letters and hyphens only.
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500"
                placeholder="e.g. OPC, PPC, Specialty"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#2EAD32] rounded-full" />
            Description
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Product Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-y min-h-[100px]"
              placeholder="Describe your product in detail..."
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#2EAD32] rounded-full" />
            Product Image
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Image URL
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#2EAD32] focus:border-transparent transition placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-24"
                    placeholder="https://example.com/image.jpg"
                  />
                  {form.image_url && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      aria-label="Clear image"
                    >
                      <Icon icon={FaTrash} size={14} />
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                  Enter a URL or relative path to the product image.
                </p>
              </div>

              {/* Image Preview */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800 transition-all hover:border-[#2EAD32] dark:hover:border-[#4ADE80]">
                  {form.image_url ? (
                    <img
                      src={form.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '';
                        (e.target as HTMLImageElement).alt = 'Invalid image URL';
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
                      <Icon icon={FaImage} className="text-3xl mb-1" />
                      <span className="text-[10px]">Preview</span>
                    </div>
                  )}
                </div>
                {form.image_url && (
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 truncate max-w-[100px]">
                    ✓ Loaded
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#2EAD32] hover:bg-emerald-700 dark:bg-[#2EAD32] dark:hover:bg-[#4ADE80] text-white dark:text-gray-900 px-6 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center"
          >
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
          <Link
            to="/admin/products"
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