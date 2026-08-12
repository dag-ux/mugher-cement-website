import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { PanInfo } from 'framer-motion';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useAnimationFrame,
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
  FaAward,
  FaGlobeAfrica,
  FaSearch,
  FaChevronUp,
  FaExclamationTriangle,
  FaRedo,
  FaPlay,
  FaPause,
  FaSyncAlt,
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const SectionEyebrow = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <span className="h-px w-8 bg-[#2EAD32] dark:bg-[#4ADE80]" />
    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2EAD32] dark:text-[#4ADE80] font-body">
      {label}
    </span>
    <span className="h-px w-8 bg-[#2EAD32] dark:bg-[#4ADE80]" />
  </div>
);

// TODO: replace with your company's real figures
const STATS = [
  { icon: FaIndustry, value: '500,000+ MT', label: 'Annual Capacity' },
  { icon: FaAward, value: '25+ Years', label: 'Industry Experience' },
  { icon: FaGlobeAfrica, value: '50+', label: 'Distributors Nationwide' },
  { icon: FaCheckCircle, value: 'ISO 9001', label: 'Certified Quality' },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// Small deterministic pseudo-random generator so particles don't reshuffle on every render
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ---- Cinematic Video-Style Product Showcase --------------------------------
// A continuously auto-rotating 3D turntable inside a letterboxed "video frame",
// with a real play/pause control, a scrub-style progress bar, a light sweep,
// and drifting dust particles for atmosphere. Drag left/right to scrub the
// rotation manually, just like scrubbing a video. No video file required —
// everything here is CSS/SVG + framer-motion.
function CinematicShowcase({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: string;
}) {
  const prefersReduced = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(!prefersReduced);
  const [isDragging, setIsDragging] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  const rotateY = useMotionValue(0);
  const degreesPerSecond = 26;

  // Drive the turntable rotation every frame when playing and not being dragged
  useAnimationFrame((_, delta) => {
    if (isPlaying && !isDragging) {
      rotateY.set(rotateY.get() + (degreesPerSecond * delta) / 1000);
    }
  });

  // 0–100% progress bar mapped from the current rotation angle
  const progress = useTransform(rotateY, (v) => (((v % 360) + 360) % 360 / 360) * 100);
  const progressWidth = useTransform(progress, (v) => `${v}%`);

  const handlePan = useCallback(
    (_: unknown, info: PanInfo) => {
      rotateY.set(rotateY.get() + info.delta.x * 0.6);
    },
    [rotateY]
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: seededRandom(i * 3.1) * 100,
        top: seededRandom(i * 7.7) * 100,
        size: 2 + seededRandom(i * 5.3) * 3,
        duration: 4 + seededRandom(i * 2.9) * 5,
        delay: seededRandom(i * 1.7) * 4,
      })),
    []
  );

  return (
    <div className="relative w-full">
      {/* Cinema frame */}
      <div
        className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 shadow-inner ring-1 ring-black/40 select-none touch-pan-y"
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        {/* ambient vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* drifting dust particles */}
        {particles.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={
              isPlaying
                ? { y: [0, -14, 0], opacity: [0.15, 0.6, 0.15] }
                : { opacity: 0.15 }
            }
            transition={{
              repeat: Infinity,
              duration: p.duration,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* light sweep across the frame */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 w-1/3 z-10"
          style={{
            background:
              'linear-gradient(100deg, transparent, rgba(255,255,255,0.10) 45%, transparent 90%)',
          }}
          animate={isPlaying ? { left: ['-40%', '130%'] } : { left: '-40%' }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut', repeatDelay: 1.4 }}
        />

        {/* turntable stage */}
        <div className="absolute inset-0 flex items-center justify-center [perspective:1400px]">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onPan={handlePan}
            style={{ rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-2/3 h-2/3 flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <img
              src={imgSrc}
              alt={alt}
              draggable={false}
              className="w-full h-full object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.55)]"
              onError={() => setImgSrc('https://via.placeholder.com/500x500?text=Cement+Product')}
            />
          </motion.div>

          {/* grounded turntable disc */}
          <div
            aria-hidden="true"
            className="absolute bottom-[14%] w-1/2 h-3 rounded-full bg-black/50 blur-md"
          />
        </div>

        {/* letterbox bars for the cinematic feel */}
        <div aria-hidden="true" className="absolute top-0 inset-x-0 h-[6%] bg-black z-20" />
        <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[6%] bg-black z-20" />

        {/* top-left REC badge */}
        <div className="absolute top-3 left-4 z-30 flex items-center gap-1.5">
          <motion.span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-red-500"
            animate={isPlaying ? { opacity: [1, 0.25, 1] } : { opacity: 0.4 }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 font-body">
            360° Live View
          </span>
        </div>

        {/* top-right category badge */}
        <span className="absolute top-3 right-4 z-30 text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 font-body">
          {category || 'Cement'}
        </span>

        {/* bottom video-player control bar */}
        <div className="absolute bottom-[8%] inset-x-0 z-30 px-4 flex items-center gap-3 opacity-90">
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause rotation' : 'Play rotation'}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80]"
          >
            <Icon icon={isPlaying ? FaPause : FaPlay} size={11} />
          </button>

          <div className="relative flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#4ADE80] rounded-full"
              style={{ width: progressWidth }}
            />
          </div>

          <button
            type="button"
            onClick={() => rotateY.set(0)}
            aria-label="Reset rotation"
            className="flex-shrink-0 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4ADE80]"
          >
            <Icon icon={FaSyncAlt} size={11} />
          </button>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 font-body mt-2 tracking-wide">
        Drag to rotate · Tap play to auto-spin
      </p>
    </div>
  );
}
// -----------------------------------------------------------------------------

function ProductCard({ product, index }: { product: Product; index: number }) {
  const specEntries = product.technical_specs
    ? Object.entries(product.technical_specs)
    : [];
  const reversed = index % 2 === 1;

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
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-gray-900/50 hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-shadow duration-500 overflow-hidden border border-slate-100/80 dark:border-gray-700"
    >
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
        {/* Cinematic Showcase */}
        <div className="flex flex-col justify-center">
          <CinematicShowcase
            src={product.image_url || '/placeholder.jpg'}
            alt={product.name}
            category={product.category}
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

          {specEntries.length > 0 && (
            <div>
              <h3 className="text-lg font-heading font-bold text-[#1A3C91] dark:text-white flex items-center gap-2 mb-2">
                <Icon icon={FaTools} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                Technical Specifications
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl border border-slate-200 dark:border-gray-600 overflow-x-auto">
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
                        <td className="px-4 py-2 font-semibold text-[#1A3C91] dark:text-[#4A7DB4] capitalize w-1/3 whitespace-nowrap">
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

          <div className="pt-4">
            
              <a href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#2EAD32] hover:bg-[#278f2b] dark:bg-[#4ADE80] dark:hover:bg-[#3fc972] text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md"
            >
              <Icon icon={FaEnvelope} />
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(false);
    API.get('/products')
      .then((res) => setProducts(res.data ?? []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 500);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ['All', ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

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
      <div className="relative bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
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

      {/* Trust / stats strip */}
      <div className="container mx-auto px-6 relative z-10 -mt-14 md:-mt-16 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/60 border border-slate-100 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 dark:divide-gray-700">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center gap-1.5 py-6 px-3"
            >
              <Icon icon={stat.icon} className="text-[#2EAD32] dark:text-[#4ADE80]" size={22} />
              <span className="text-lg md:text-xl font-heading font-bold text-[#1A3C91] dark:text-white">
                {stat.value}
              </span>
              <span className="text-[11px] md:text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-body">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filters + Search */}
      {!loading && !error && products.length > 0 && (
        <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-slate-200 dark:border-gray-700 py-4">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold font-body transition-colors border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EAD32] ${
                    selectedCategory === cat
                      ? 'bg-[#1A3C91] border-[#1A3C91] text-white dark:bg-[#4A7DB4] dark:border-[#4A7DB4]'
                      : 'bg-transparent border-slate-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#2EAD32] hover:text-[#2EAD32] dark:hover:text-[#4ADE80]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64 flex-shrink-0">
              <Icon
                icon={FaSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2EAD32] font-body"
              />
            </div>
          </div>

          <p
            aria-live="polite"
            className="container mx-auto px-6 text-xs text-gray-400 dark:text-gray-500 font-body mt-3"
          >
            Showing {filteredProducts.length} of {products.length} products
          </p>
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
              <div className="aspect-video bg-slate-200 dark:bg-gray-700 rounded-2xl" />
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

      {/* Error state */}
      {!loading && error && (
        <div className="container mx-auto px-6 py-16">
          <div className="text-center py-16 bg-red-50 dark:bg-gray-800 rounded-2xl border border-red-100 dark:border-gray-700 max-w-lg mx-auto">
            <Icon
              icon={FaExclamationTriangle}
              className="text-red-400 dark:text-red-400 mx-auto mb-4"
              size={32}
            />
            <p className="text-gray-600 dark:text-gray-300 font-body text-lg mb-5">
              We couldn't load our products right now. Please try again.
            </p>
            <button
              onClick={fetchProducts}
              className="inline-flex items-center gap-2 bg-[#1A3C91] hover:bg-[#152f73] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors duration-200"
            >
              <Icon icon={FaRedo} size={14} />
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      {!loading && !error && (
        <div className="container mx-auto px-6 py-12">
          {filteredProducts.length > 0 ? (
            <div className="space-y-16">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700">
              <SectionEyebrow label="Nothing Here Yet" />
              <p className="text-gray-500 dark:text-gray-400 font-body text-lg">
                {products.length === 0
                  ? 'No products in this category yet.'
                  : 'No products match your search.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Scroll to top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-30 bg-[#2EAD32] hover:bg-[#278f2b] dark:bg-[#4ADE80] dark:hover:bg-[#3fc972] text-white dark:text-gray-900 w-11 h-11 rounded-full shadow-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1A3C91] focus-visible:ring-offset-2"
          >
            <Icon icon={FaChevronUp} size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}