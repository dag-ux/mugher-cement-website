import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaBox, FaImage, FaChevronRight } from 'react-icons/fa';
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

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  image_url: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      setToast({ message: 'Failed to load products.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await API.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
      setToast({ message: `"${name}" deleted successfully.`, type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to delete product.', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-body">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white flex items-center gap-2">
            <Icon icon={FaBox} className="text-[#2EAD32]" />
            Manage Products
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <span>{products.length} product{products.length !== 1 ? 's' : ''} available</span>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">•</span>
            <span className="hidden sm:inline text-xs px-2 py-0.5 bg-[#2EAD32]/10 dark:bg-[#4ADE80]/20 text-[#2EAD32] dark:text-[#4ADE80] rounded-full font-semibold">
              {products.filter((p) => p.category).length} categories
            </span>
          </p>
        </div>
        <Link
          to="/admin/products/create"
          className="inline-flex items-center gap-2 bg-[#2EAD32] hover:bg-emerald-700 dark:bg-[#2EAD32] dark:hover:bg-[#4ADE80] text-white dark:text-gray-900 px-5 py-2.5 rounded-lg font-semibold transition shadow-md hover:shadow-lg text-sm whitespace-nowrap"
        >
          <Icon icon={FaPlus} size={14} />
          Add Product
        </Link>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Icon icon={FaImage} className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-body">No products added yet.</p>
          <Link
            to="/admin/products/create"
            className="inline-block mt-4 text-[#2EAD32] hover:text-emerald-700 font-semibold"
          >
            Create your first product →
          </Link>
        </div>
      ) : (
        <>
          {/* ===== DESKTOP TABLE VIEW ===== */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Product</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200">Category</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition duration-150"
                  >
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">
                      <div className="flex items-center gap-3">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                            <Icon icon={FaImage} size={16} />
                          </div>
                        )}
                        <span className="line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      <span className="inline-block px-2.5 py-1 bg-gray-100 dark:bg-gray-600 rounded-full text-xs font-medium">
                        {product.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm transition px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Icon icon={FaEdit} size={14} />
                          <span className="hidden sm:inline">Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm transition px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
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

          {/* ===== MOBILE CARD VIEW ===== */}
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="flex items-start gap-3">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                        <Icon icon={FaImage} size={20} />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                      {product.name}
                    </h3>
                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-gray-100 dark:bg-gray-600 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300">
                      {product.category || 'Uncategorized'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
                      aria-label="Edit product"
                    >
                      <Icon icon={FaEdit} size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      aria-label="Delete product"
                    >
                      <Icon icon={FaTrash} size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile: View All / Count */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-400 dark:text-gray-500 font-body">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}