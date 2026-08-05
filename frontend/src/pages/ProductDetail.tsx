import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import API from '../services/api';
import {
  FaArrowLeft,
  FaIndustry,
  FaClipboardList,
  FaTools,
  FaCheckCircle,
  FaStar,
  FaEnvelope,
} from 'react-icons/fa';

// Safe icon renderer (bypasses React 19 type issues)
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  technical_specs: Record<string, any>;
  application: string;
  image_url: string;
  category: string;
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    API.get(`/products/${slug}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Product not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium font-body">Loading Product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-body text-lg">{error || 'Product not found'}</p>
          <Link
            to="/products"
            className="mt-4 inline-block bg-[#1A3C91] text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const specEntries = product.technical_specs
    ? Object.entries(product.technical_specs)
    : [];

  const keyFeatures = [
    'High compressive strength for structural integrity',
    'Excellent workability and setting time',
    'Suitable for all weather conditions',
    'Meets Ethiopian and international standards',
    'Environmentally friendly production process',
  ];

  const benefits = [
    'Reduces construction time with faster setting',
    'Ensures long‑lasting durability',
    'Cost‑effective solution for large projects',
    'Consistent quality batch after batch',
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{product.name} | Mugher Cement</title>
        <meta
          name="description"
          content={`${product.name} – ${product.description.slice(0, 150)}`}
        />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container mx-auto px-6 text-white relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-200 font-body mb-1">
                <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-semibold">
                  {product.category || 'Cement'}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-wide">
                {product.name}
              </h1>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition px-5 py-2.5 rounded-lg font-body font-medium text-white border border-white/20 backdrop-blur-sm"
            >
              <Icon icon={FaArrowLeft} className="text-sm" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="bg-gray-50 rounded-2xl shadow-lg flex items-center justify-center p-6 min-h-[300px] lg:min-h-[400px]">
            <img
              src={product.image_url || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-full max-h-80 lg:max-h-[400px] object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/600x400?text=Cement+Product';
              }}
            />
          </div>

          {/* Overview & Quick Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-[#1A3C91] flex items-center gap-2 mb-2">
                <Icon icon={FaIndustry} className="text-[#2EAD32]" />
                Product Overview
              </h2>
              <p className="text-gray-700 font-body leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-heading font-bold text-[#1A3C91] flex items-center gap-2 mb-2">
                <Icon icon={FaStar} className="text-[#2EAD32]" />
                Key Features
              </h3>
              <ul className="space-y-1.5">
                {keyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 font-body text-sm">
                    <Icon icon={FaCheckCircle} className="text-[#2EAD32] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-heading font-bold text-[#1A3C91] flex items-center gap-2 mb-2">
                <Icon icon={FaCheckCircle} className="text-[#2EAD32]" />
                Benefits
              </h3>
              <ul className="space-y-1.5">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 font-body text-sm">
                    <Icon icon={FaCheckCircle} className="text-[#2EAD32] mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Applications */}
        {product.application && (
          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-[#1A3C91] flex items-center gap-3 mb-6">
              <Icon icon={FaClipboardList} className="text-[#2EAD32]" />
              Applications
            </h2>
            <div className="bg-gray-50 rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-gray-700 font-body leading-relaxed">
                {product.application}
              </p>
            </div>
          </div>
        )}

        {/* Technical Specifications */}
        {specEntries.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-[#1A3C91] flex items-center gap-3 mb-6">
              <Icon icon={FaTools} className="text-[#2EAD32]" />
              Technical Specifications
            </h2>
            <div className="bg-gray-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm font-body">
                <tbody>
                  {specEntries.map(([key, value], index) => (
                    <tr
                      key={key}
                      className={`border-b border-slate-200 last:border-0 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      <td className="px-6 py-3 font-semibold text-[#1A3C91] capitalize w-1/3">
                        {key.replace(/_/g, ' ')}
                      </td>
                      <td className="px-6 py-3 text-gray-700 w-2/3">
                        {typeof value === 'object'
                          ? JSON.stringify(value, null, 2)
                          : String(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-[#1A3C91] text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-md"
          >
            <Icon icon={FaArrowLeft} />
            Browse All Products
          </Link>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#2EAD32] text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-md"
          >
            <Icon icon={FaEnvelope} />
            Request a Quote
          </a>
        </div>
      </div>
    </div>
  );
}