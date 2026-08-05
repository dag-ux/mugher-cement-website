import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Helmet } from 'react-helmet';
import { FaIndustry } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ['All', ...new Set(cats)];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium font-body">Loading Products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Products | Mugher Cement</title>
        <meta
          name="description"
          content="Explore Mugher Cement's premium product range – OPC, PPC, and specialty cements for all construction needs."
        />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaIndustry className="text-3xl md:text-4xl text-[#2EAD32]" />
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-wide">
              Our Products
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mx-auto">
            Premium cement formulations engineered for strength, durability, and performance.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="container mx-auto px-6 pt-8 pb-4">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-body font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#1A3C91] text-white shadow-lg shadow-[#1A3C91]/30 scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-center mt-3 text-sm text-gray-500 font-body">
          Showing <strong className="text-[#1A3C91]">{filteredProducts.length}</strong> product{filteredProducts.length !== 1 && 's'}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 pb-16">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-slate-100/80 hover:border-[#2EAD32]/30"
              >
                {/* Image Container – fully visible */}
                <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={product.image_url || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/400x400?text=Cement+Product';
                    }}
                  />
                  {/* Category badge */}
                  {product.category && (
                    <span className="absolute top-3 right-3 bg-[#1A3C91]/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-[#1A3C91] mb-2 group-hover:text-[#2EAD32] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-body leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <Link
                    to={`/products/${product.slug}`}
                    className="inline-flex items-center gap-2 mt-4 text-[#2EAD32] font-semibold font-body hover:text-emerald-700 transition group/link"
                  >
                    <span>Learn More</span>
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-gray-500 font-body text-lg">No products in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-4 inline-block bg-[#2EAD32] text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}