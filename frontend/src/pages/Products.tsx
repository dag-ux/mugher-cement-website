import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import API from '../services/api';
import { Helmet } from 'react-helmet';
import {
  FaIndustry,
  FaClipboardList,
  FaTools,
  FaCheckCircle,
  FaStar,
  FaEnvelope,
} from 'react-icons/fa';

// Safe icon renderer
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  technical_specs?: Record<string, any>;
  application?: string;
}

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

// Floating image animation
const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    repeat: Infinity,
    duration: 3,
    ease: 'easeInOut' as const,
  },
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium font-body">Loading Products...</p>
        </div>
      </div>
    );
  }

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
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
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
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Icon icon={FaIndustry} className="text-3xl md:text-4xl" />
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-wide">
              Our Products
            </h1>
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mx-auto"
          >
            Premium cement formulations engineered for strength, durability, and performance.
          </motion.p>
        </div>
      </div>

      {/* Product List with Floating Images */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-12"
      >
        {products.length > 0 ? (
          <div className="space-y-16">
            {products.map((product) => {
              const specEntries = product.technical_specs
                ? Object.entries(product.technical_specs)
                : [];

              return (
                <motion.div
                  key={product.id}
                  variants={fadeUp}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-shadow duration-500 overflow-hidden border border-slate-100/80 dark:border-gray-700"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
                    {/* Floating Image */}
                    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 min-h-[300px]">
                      <motion.img
                        src={product.image_url || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full max-h-64 object-contain"
                        animate={floatAnimation}
                        whileHover={{ scale: 1.05 }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/400x400?text=Cement+Product';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                      <div>
                        <span className="inline-block px-3 py-1 bg-[#1A3C91]/10 dark:bg-[#4A7DB4]/20 text-[#1A3C91] dark:text-[#4A7DB4] text-xs font-bold rounded-full mb-2">
                          {product.category || 'Cement'}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1A3C91] dark:text-white mb-3">
                          {product.name}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 font-body leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white flex items-center gap-2 mb-2">
                          <Icon icon={FaStar} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                          Key Features
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 font-body text-sm">
                              <Icon icon={FaCheckCircle} className="text-[#2EAD32] dark:text-[#4ADE80] mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h3 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white flex items-center gap-2 mb-2">
                          <Icon icon={FaCheckCircle} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                          Benefits
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 font-body text-sm">
                              <Icon icon={FaCheckCircle} className="text-[#2EAD32] dark:text-[#4ADE80] mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Applications */}
                      {product.application && (
                        <div>
                          <h3 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white flex items-center gap-2 mb-2">
                            <Icon icon={FaClipboardList} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                            Applications
                          </h3>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl border border-slate-200 dark:border-gray-600 p-4">
                            <p className="text-gray-700 dark:text-gray-300 font-body leading-relaxed text-sm">
                              {product.application}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Technical Specifications */}
                      {specEntries.length > 0 && (
                        <div>
                          <h3 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white flex items-center gap-2 mb-2">
                            <Icon icon={FaTools} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                            Technical Specifications
                          </h3>
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl border border-slate-200 dark:border-gray-600 overflow-hidden">
                            <table className="w-full text-sm font-body">
                              <tbody>
                                {specEntries.map(([key, value], idx) => (
                                  <tr
                                    key={key}
                                    className={`border-b border-slate-200 dark:border-gray-600 last:border-0 ${
                                      idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-700/50'
                                    }`}
                                  >
                                    <td className="px-4 py-2 font-semibold text-[#1A3C91] dark:text-[#4A7DB4] capitalize w-1/3">
                                      {key.replace(/_/g, ' ')}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300 w-2/3">
                                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-4">
                        <a
                          href="/contact"
                          className="inline-flex items-center justify-center gap-2 bg-[#2EAD32] hover:bg-emerald-700 dark:bg-[#2EAD32] dark:hover:bg-[#4ADE80] text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold transition shadow-md"
                        >
                          <Icon icon={FaEnvelope} />
                          Request a Quote
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 font-body text-lg">No products available.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}