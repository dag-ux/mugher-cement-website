import { useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion';
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
  visible: { transition: { staggerChildren: 0.15 } },
};

// Gentle idle float for the showcased product
const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    repeat: Infinity,
    duration: 3,
    ease: 'easeInOut' as const,
  },
};

// Eyebrow motif reused from the About page for a consistent site identity
const SectionEyebrow = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <span className="h-px w-8 bg-[#2EAD32] dark:bg-[#4ADE80]" />
    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2EAD32] dark:text-[#4ADE80] font-body">
      {label}
    </span>
    <span className="h-px w-8 bg-[#2EAD32] dark:bg-[#4ADE80]" />
  </div>
);

// ---- 3D Product Showcase -------------------------------------------------
// Pointer-driven tilt (rotateX/rotateY), a spotlight highlight that tracks
// the cursor, an idle float, and a faded reflection beneath the product —
// all via framer-motion + CSS, no extra 3D library required.
function ProductShowcase({ src, alt }: { src: string; alt: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), {
    stiffness: 220,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), {
    stiffness: 220,
    damping: 20,
  });
  const glowX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, rgba(46,173,50,0.25), transparent 70%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="group relative w-full flex flex-col items-center justify-center [perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* spotlight that tracks the cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: spotlight }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full flex flex-col items-center"
      >
        <motion.img
          src={src}
          alt={alt}
          animate={floatAnimation}
          style={{ transformStyle: 'preserve-3d' }}
          className="w-full max-h-64 object-contain drop-shadow-2xl select-none"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/400x400?text=Cement+Product';
          }}
        />
        {/* soft reflection */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="w-full max-h-20 object-contain opacity-20 -mt-2 pointer-events-none select-none"
          style={{
            transform: 'scaleY(-1)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
          }}
        />
      </motion.div>
    </div>
  );
}
// ---------------------------------------------------------------------------

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean))
    );
    return ['All', ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

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
      <div className="relative bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* floating decorative silo/bag shapes */}
        <motion.div
          aria-hidden="true"
          className="hidden md:block absolute -top-10 right-16 w-40 h-40 rounded-full bg-white/10 blur-2xl"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="hidden md:block absolute bottom-0 left-10 w-56 h-56 rounded-full bg-white/5 blur-3xl"
          animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 border border-white/50 px-4 py-1.5 mb-5"
            style={{ boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.15)' }}
          >
            <Icon icon={FaIndustry} className="text-xs" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] font-body">
              Engineered Cement Solutions
            </span>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mx-auto mt-5 leading-relaxed"
          >
            Premium cement formulations engineered for strength, durability, and
            performance — built for Ethiopia's roads, bridges, and homes.
          </motion.p>
        </div>
      </div>

      {/* Category Filters */}
      {!loading && categories.length > 2 && (
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-slate-200 dark:border-gray-700 py-4">
          <div className="container mx-auto px-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold font-body transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-[#1A3C91] border-[#1A3C91] text-white dark:bg-[#4A7DB4] dark:border-[#4A7DB4]'
                    : 'bg-transparent border-slate-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#2EAD32] hover:text-[#2EAD32] dark:hover:text-[#4ADE80]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="container mx-auto px-6 py-12 space-y-10">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white dark:bg-gray-800 rounded-3xl border border-slate-100 dark:border-gray-700 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div className="h-64 bg-slate-200 dark:bg-gray-700 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-4 w-24 bg-slate-200 dark:bg-gray-700 rounded-full" />
                <div className="h-8 w-2/3 bg-slate-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-3 w-full bg-slate-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-5/6 bg-slate-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-3/4 bg-slate-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product List */}
      {!loading && (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-6 py-12"
        >
          {filteredProducts.length > 0 ? (
            <div className="space-y-16">
              {filteredProducts.map((product, index) => {
                const specEntries = product.technical_specs
                  ? Object.entries(product.technical_specs)
                  : [];
                const reversed = index % 2 === 1;

                return (
                  <motion.div
                    key={product.id}
                    variants={fadeUp}
                    className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-shadow duration-500 overflow-hidden border border-slate-100/80 dark:border-gray-700"
                  >
                    {/* ghost index watermark */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none select-none absolute top-2 right-4 text-8xl font-heading font-black text-[#1A3C91]/5 dark:text-white/5 leading-none"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10 relative ${
                        reversed ? 'lg:[&>*:first-child]:order-2' : ''
                      }`}
                    >
                      {/* 3D Showcase */}
                      <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 min-h-[300px]">
                        <ProductShowcase
                          src={product.image_url || '/placeholder.jpg'}
                          alt={product.name}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block px-3 py-1 bg-[#1A3C91]/10 dark:bg-[#4A7DB4]/20 text-[#1A3C91] dark:text-[#4A7DB4] text-xs font-bold rounded-full">
                              {product.category || 'Cement'}
                            </span>
                            <span className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 font-body">
                              No. {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1A3C91] dark:text-white mb-3 tracking-tight">
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
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-gray-700 dark:text-gray-300 font-body text-sm"
                              >
                                <Icon
                                  icon={FaCheckCircle}
                                  className="text-[#2EAD32] dark:text-[#4ADE80] mt-0.5 flex-shrink-0"
                                />
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
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-gray-700 dark:text-gray-300 font-body text-sm"
                              >
                                <Icon
                                  icon={FaCheckCircle}
                                  className="text-[#2EAD32] dark:text-[#4ADE80] mt-0.5 flex-shrink-0"
                                />
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
                                        idx % 2 === 0
                                          ? 'bg-white dark:bg-gray-800'
                                          : 'bg-gray-50/50 dark:bg-gray-700/50'
                                      }`}
                                    >
                                      <td className="px-4 py-2 font-semibold text-[#1A3C91] dark:text-[#4A7DB4] capitalize w-1/3">
                                        {key.replace(/_/g, ' ')}
                                      </td>
                                      <td className="px-4 py-2 text-gray-700 dark:text-gray-300 w-2/3">
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
              <SectionEyebrow label="Nothing Here Yet" />
              <p className="text-gray-500 dark:text-gray-400 font-body text-lg">
                No products in this category yet.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}