import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MouseEvent, ChangeEvent } from 'react';
import {
  motion,
  AnimatePresence,
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
  FaAward,
  FaGlobeAfrica,
  FaSearch,
  FaChevronUp,
  FaExclamationTriangle,
  FaRedo,
  FaCalculator,
  FaFileDownload,
  FaBalanceScale,
  FaTimes,
  FaInfoCircle,
  FaTruck,
  FaShieldAlt,
  FaFlask,
  FaLayerGroup,
  FaTable,
  FaThLarge,
} from 'react-icons/fa';

// Safe icon renderer
const Icon = ({ icon: IconComponent, className, size }: { icon: any; className?: string; size?: number }) => (
  <IconComponent className={className} size={size} />
);

interface Product {
  id: number;
  name: string;
  slug?: string;
  description: string;
  image_url: string;
  category: string;
  grade?: string;
  standard?: string;
  technical_specs?: Record<string, any>;
  application?: string;
}

// Fallback industrial dataset for production resilience
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Mugher OPC 42.5N Cement',
    slug: 'opc-42-5n',
    category: 'Ordinary Portland',
    grade: 'CEM I 42.5N',
    standard: 'ES 1177-1 / EN 197-1',
    description:
      'High-performance Ordinary Portland Cement engineered for heavy-duty structural concrete, high-rise construction, pre-stressed elements, and major civil engineering projects.',
    image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    application:
      'Multi-story commercial complexes, concrete highways, bridges, dams, pre-cast concrete structures, and structural foundations requiring rapid strength gain.',
    technical_specs: {
      compressive_strength_2d: '≥ 20.0 MPa',
      compressive_strength_28d: '≥ 42.5 MPa',
      initial_setting_time: '≥ 60 min',
      soundness: '≤ 10 mm',
      blaine_fineness: '3,450 cm²/g',
      clinker_content: '95% - 100%',
    },
  },
  {
    id: 2,
    name: 'Mugher PPC 32.5R Cement',
    slug: 'ppc-32-5r',
    category: 'Portland Pozzolana',
    grade: 'CEM II/B-P 32.5R',
    standard: 'ES 1177-1 / EN 197-1',
    description:
      'Eco-friendly blended cement enriched with calcined pozzolana, offering superior long-term strength development, enhanced resistance to sulfate attack, and reduced thermal cracking.',
    image_url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=800&auto=format&fit=crop',
    application:
      'General residential building, masonry plastering, brick laying, hydraulic structures, underground foundations, mass concrete work, and coastal developments.',
    technical_specs: {
      compressive_strength_2d: '≥ 10.0 MPa',
      compressive_strength_28d: '≥ 32.5 MPa',
      initial_setting_time: '≥ 75 min',
      soundness: '≤ 10 mm',
      pozzolana_content: '21% - 35%',
      blaine_fineness: '3,800 cm²/g',
    },
  },
  {
    id: 3,
    name: 'Mugher High Early Strength 52.5N',
    slug: 'cem-i-52-5n',
    category: 'Specialty Cement',
    grade: 'CEM I 52.5N',
    standard: 'ES 1177-1 / EN 197-1',
    description:
      'Ultra-high strength premium cement formulated for specialized industrial applications where rapid setting and exceptionally high early compressive strength are critical.',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    application:
      'Pre-stressed post-tensioned concrete, rapid formwork stripping, airport runways, cold-weather concreting, and high-load industrial floors.',
    technical_specs: {
      compressive_strength_2d: '≥ 30.0 MPa',
      compressive_strength_28d: '≥ 52.5 MPa',
      initial_setting_time: '≥ 45 min',
      soundness: '≤ 10 mm',
      blaine_fineness: '4,200 cm²/g',
      clinker_content: '95% - 100%',
    },
  },
  {
    id: 4,
    name: 'Mugher Sulfate Resistant Cement',
    slug: 'cem-i-42-5n-sr3',
    category: 'Specialty Cement',
    grade: 'CEM I 42.5N-SR3',
    standard: 'EN 197-1 / ASTM C150',
    description:
      'Specialized chemical-resistant Portland cement specifically produced with low Tricalcium Aluminate (C3A ≤ 3%) to withstand aggressive soil and saline environments.',
    image_url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=800&auto=format&fit=crop',
    application:
      'Wastewater treatment plants, marine docks, sub-soil foundations in high-sulfate soil zones, underground tunnels, and industrial effluent tanks.',
    technical_specs: {
      compressive_strength_2d: '≥ 18.0 MPa',
      compressive_strength_28d: '≥ 42.5 MPa',
      c3a_content: '≤ 3.0%',
      initial_setting_time: '≥ 90 min',
      soundness: '≤ 10 mm',
      sulfate_expansion: '< 0.04%',
    },
  },
];

// Key company performance indicators
const STATS = [
  { icon: FaIndustry, value: '500,000+ MT', label: 'Annual Capacity' },
  { icon: FaAward, value: '25+ Years', label: 'Industry Leadership' },
  { icon: FaGlobeAfrica, value: '500+', label: 'Distribution Hubs' },
  { icon: FaCheckCircle, value: 'ISO 9001:2015', label: 'Quality Certified' },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const floatAnimation = {
  y: [0, -12, 0],
  transition: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' as const },
};

const shadowPulse = {
  scale: [1, 0.85, 1],
  opacity: [0.35, 0.15, 0.35],
  transition: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' as const },
};

const SectionEyebrow = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center gap-3 mb-3">
    <span className="h-px w-8 bg-[#2EAD32] dark:bg-[#4ADE80]" />
    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2EAD32] dark:text-[#4ADE80] font-body">
      {label}
    </span>
    <span className="h-px w-8 bg-[#2EAD32] dark:bg-[#4ADE80]" />
  </div>
);

// ---- 3D Interactive Product Showcase ---------------------------------------
function ProductShowcase({ src, alt }: { src: string; alt: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 });
  const glowX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${glowX} ${glowY}, rgba(46,173,50,0.22), transparent 70%)`;

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
      className="group relative w-full flex flex-col items-center justify-center [perspective:1200px] cursor-pointer py-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: spotlight }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute w-48 h-48 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background: 'conic-gradient(from 0deg, #2EAD32, #1A3C91, #2EAD32)',
          filter: 'blur(22px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
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
          className="w-full max-h-64 object-cover rounded-xl shadow-2xl select-none transform group-hover:scale-105 transition-transform duration-300"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop';
          }}
        />
        <motion.div
          aria-hidden="true"
          animate={shadowPulse}
          className="w-32 h-4 bg-black/40 dark:bg-black/70 rounded-full blur-md mt-4"
        />
      </motion.div>
    </div>
  );
}

// ---- Product Card Component ------------------------------------------------
function ProductCard({
  product,
  index,
  onOpenSpecs,
  onOpenQuote,
}: {
  product: Product;
  index: number;
  onOpenSpecs: (product: Product) => void;
  onOpenQuote: (product: Product) => void;
}) {
  const specEntries = product.technical_specs ? Object.entries(product.technical_specs) : [];
  const reversed = index % 2 === 1;

  const keyFeatures = [
    'High compressive strength & early load bearing',
    'Optimized setting time for structural casting',
    'Rigorous physical & chemical quality testing',
    'Compliant with ES 1177-1 and EN 197-1 international standards',
  ];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative bg-white dark:bg-gray-800/95 rounded-3xl shadow-xl dark:shadow-gray-950/50 hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200/80 dark:border-gray-700/80 group"
    >
      {/* Watermark Index */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-3 right-6 text-7xl font-heading font-black text-[#1A3C91]/5 dark:text-white/5 leading-none"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 relative ${
          reversed ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        {/* Visual Showcase Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900/60 dark:to-gray-800/60 rounded-2xl p-6 border border-slate-200/60 dark:border-gray-700/60">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A3C91]/10 dark:bg-[#4A7DB4]/20 text-[#1A3C91] dark:text-[#4A7DB4] text-xs font-bold rounded-full">
              <Icon icon={FaLayerGroup} className="text-xs" />
              {product.category}
            </span>
            {product.grade && (
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-md border border-emerald-500/20 font-mono">
                {product.grade}
              </span>
            )}
          </div>

          <ProductShowcase src={product.image_url} alt={product.name} />

          <div className="pt-4 border-t border-slate-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Icon icon={FaShieldAlt} className="text-[#2EAD32]" />
              {product.standard || 'ISO 9001 Certified'}
            </span>
            <span className="font-semibold text-[#1A3C91] dark:text-[#4ADE80]">50kg Sealed Bags</span>
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-3 tracking-tight group-hover:text-[#2EAD32] dark:group-hover:text-[#4ADE80] transition-colors duration-200">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-body leading-relaxed text-sm md:text-base">
              {product.description}
            </p>
          </div>

          {/* Key Advantages */}
          <div>
            <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-[#1A3C91] dark:text-gray-200 flex items-center gap-2 mb-3">
              <Icon icon={FaStar} className="text-[#2EAD32] dark:text-[#4ADE80]" />
              Key Features & Performance
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 font-body text-xs md:text-sm">
                  <Icon icon={FaCheckCircle} className="text-[#2EAD32] dark:text-[#4ADE80] mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Applications */}
          {product.application && (
            <div>
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-[#1A3C91] dark:text-gray-200 flex items-center gap-2 mb-2">
                <Icon icon={FaClipboardList} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                Recommended Applications
              </h3>
              <div className="bg-slate-50 dark:bg-gray-900/40 rounded-xl border border-slate-200 dark:border-gray-700/80 p-3.5">
                <p className="text-gray-700 dark:text-gray-300 font-body text-xs md:text-sm leading-relaxed">
                  {product.application}
                </p>
              </div>
            </div>
          )}

          {/* Technical Specs Preview */}
          {specEntries.length > 0 && (
            <div>
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-[#1A3C91] dark:text-gray-200 flex items-center gap-2 mb-2">
                <Icon icon={FaTools} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                Technical Specifications Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {specEntries.slice(0, 3).map(([key, val]) => (
                  <div key={key} className="bg-slate-100 dark:bg-gray-700/60 p-2.5 rounded-lg border border-slate-200 dark:border-gray-600">
                    <span className="block text-[11px] font-semibold text-gray-500 dark:text-gray-400 capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-100 font-mono">
                      {String(val)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="pt-4 border-t border-slate-200 dark:border-gray-700 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuote(product)}
              className="inline-flex items-center justify-center gap-2 bg-[#2EAD32] hover:bg-[#259329] dark:bg-[#4ADE80] dark:hover:bg-[#3fc972] text-white dark:text-gray-950 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none"
            >
              <Icon icon={FaEnvelope} />
              Request Bulk Quote
            </button>

            <button
              onClick={() => onOpenSpecs(product)}
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border border-slate-300 dark:border-gray-600"
            >
              <Icon icon={FaFlask} />
              Full Datasheet
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---- Concrete & Cement Quantity Calculator ---------------------------------
function CementCalculator() {
  const [volume, setVolume] = useState<number>(10); // m3
  const [mixRatio, setMixRatio] = useState<'structural' | 'residential' | 'plaster'>('structural');

  const calculation = useMemo(() => {
    // Standard estimation factors: 1m3 concrete ~ 7 to 8 bags of 50kg cement depending on grade
    const bagMultiplier = mixRatio === 'structural' ? 7.5 : mixRatio === 'residential' ? 6.5 : 5.0;
    const bags = Math.ceil(volume * bagMultiplier);
    const metricTons = (bags * 50) / 1000;
    return { bags, metricTons };
  }, [volume, mixRatio]);

  return (
    <div className="bg-gradient-to-br from-[#0F2942] to-[#1A3C91] rounded-3xl text-white p-6 md:p-10 shadow-2xl mb-12 relative overflow-hidden">
      <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#2EAD32]/10 blur-3xl" />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#4ADE80]">
            <Icon icon={FaCalculator} />
            Construction Utility
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight">
            Cement Quantity Estimator
          </h3>
          <p className="text-gray-300 font-body text-sm leading-relaxed">
            Quickly estimate your project cement requirements based on structural volume and target application mix ratios.
          </p>
        </div>

        <div className="lg:col-span-7 bg-white/10 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/15 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-200 mb-2">
                Total Concrete Volume (m³)
              </label>
              <input
                type="number"
                min="1"
                max="10000"
                value={volume}
                onChange={(e) => setVolume(Math.max(1, Number(e.target.value)))}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-200 mb-2">
                Mix Type / Application
              </label>
              <select
                value={mixRatio}
                onChange={(e) => setMixRatio(e.target.value as any)}
                className="w-full bg-slate-900/90 border border-white/20 rounded-xl px-4 py-2.5 text-white font-body font-semibold focus:outline-none focus:ring-2 focus:ring-[#4ADE80]"
              >
                <option value="structural">C25/C30 Structural (OPC 42.5N)</option>
                <option value="residential">C15/C20 Residential (PPC 32.5R)</option>
                <option value="plaster">Masonry & Render Plaster</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10 text-center">
            <div className="bg-black/20 rounded-xl p-3">
              <span className="block text-xs text-gray-300 font-body">Estimated 50kg Bags</span>
              <span className="text-2xl md:text-3xl font-extrabold text-[#4ADE80] font-mono">
                {calculation.bags.toLocaleString()}
              </span>
            </div>
            <div className="bg-black/20 rounded-xl p-3">
              <span className="block text-xs text-gray-300 font-body">Estimated Tonnage</span>
              <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">
                {calculation.metricTons.toFixed(1)} MT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Main Page Component ---------------------------------------------------
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  // Modals
  const [activeSpecProduct, setActiveSpecProduct] = useState<Product | null>(null);
  const [activeQuoteProduct, setActiveQuoteProduct] = useState<Product | null>(null);

  // Quote form state
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '500',
    unit: 'Bags',
    location: 'Addis Ababa',
    notes: '',
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(false);
    API.get('/products')
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
      })
      .catch(() => {
        // Fallback gracefully to default product catalog if backend fails
        setProducts(INITIAL_PRODUCTS);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
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
      const matchesSearch =
        p.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        p.description.toLowerCase().includes(search.trim().toLowerCase()) ||
        (p.grade && p.grade.toLowerCase().includes(search.trim().toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setActiveQuoteProduct(null);
    }, 2500);
  };

  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen font-body transition-colors duration-300">
      <Helmet>
        <title>Products & Technical Cement Solutions | Mugher Cement</title>
        <meta
          name="description"
          content="Explore Mugher Cement's high-performance OPC, PPC, and specialized cement formulations certified for national infrastructure and residential projects."
        />
      </Helmet>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#0F2942] via-[#1A3C91] to-[#0F4229] pt-20 md:pt-28 pb-28 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_40%,_#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6"
          >
            <Icon icon={FaIndustry} className="text-[#4ADE80] text-xs" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white">
              Ethiopia's Premier Cement Manufacturer
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tight max-w-4xl mx-auto leading-tight"
          >
            Industrial-Grade Cement & Technical Solutions
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Formulated for extreme load durability, structural setting performance, and climate resilience — certified to ES 1177-1 and EN 197-1 standards.
          </motion.p>
        </div>
      </div>

      {/* Corporate Performance Metrics Strip */}
      <div className="container mx-auto px-6 relative z-20 -mt-16 mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 dark:divide-gray-700/60">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center text-center gap-2 py-6 px-4">
              <Icon icon={stat.icon} className="text-[#2EAD32] dark:text-[#4ADE80]" size={24} />
              <span className="text-xl md:text-2xl font-heading font-extrabold text-[#1A3C91] dark:text-white font-mono">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 pb-24">
        {/* Cement Calculator Tool */}
        <CementCalculator />

        {/* Filter Controls Bar */}
        <div className="sticky top-4 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-gray-700 p-4 mb-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1A3C91] text-white shadow-md'
                      : 'bg-slate-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & View Switcher */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-grow lg:w-64">
                <Icon icon={FaSearch} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products or specs..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2EAD32]"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon icon={FaTimes} className="text-xs" />
                  </button>
                )}
              </div>

              <div className="flex items-center bg-slate-100 dark:bg-gray-700 rounded-xl p-1 border border-slate-200 dark:border-gray-600">
                <button
                  onClick={() => setViewMode('cards')}
                  title="Card View"
                  className={`p-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'cards' ? 'bg-white dark:bg-gray-800 text-[#1A3C91] dark:text-[#4ADE80] shadow' : 'text-gray-500'
                  }`}
                >
                  <Icon icon={FaThLarge} size={14} />
                </button>
                <button
                  onClick={() => setViewMode('matrix')}
                  title="Comparison Matrix View"
                  className={`p-2 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'matrix' ? 'bg-white dark:bg-gray-800 text-[#1A3C91] dark:text-[#4ADE80] shadow' : 'text-gray-500'
                  }`}
                >
                  <Icon icon={FaTable} size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-3xl h-80 border border-slate-200 dark:border-gray-700" />
            ))}
          </div>
        )}

        {/* Product Cards View */}
        {!loading && viewMode === 'cards' && (
          <div className="space-y-12">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onOpenSpecs={(p) => setActiveSpecProduct(p)}
                  onOpenQuote={(p) => setActiveQuoteProduct(p)}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 p-8">
                <SectionEyebrow label="No Results" />
                <p className="text-gray-500 dark:text-gray-400 font-body text-base">
                  No cement products match your selected criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearch('');
                  }}
                  className="mt-4 inline-flex items-center gap-2 bg-[#1A3C91] text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  <Icon icon={FaRedo} /> Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Side-by-Side Comparison Matrix View */}
        {!loading && viewMode === 'matrix' && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-slate-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 bg-slate-50 dark:bg-gray-900/50 border-b border-slate-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-extrabold text-[#1A3C91] dark:text-white">
                  Product Technical Matrix
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Compare parameters side-by-side for engineering design selection.
                </p>
              </div>
              <span className="text-xs font-bold text-[#2EAD32] dark:text-[#4ADE80] font-mono">
                {filteredProducts.length} Formulations Listed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 text-xs font-bold uppercase">
                  <tr>
                    <th className="p-4 border-b border-slate-200 dark:border-gray-600">Product Name</th>
                    <th className="p-4 border-b border-slate-200 dark:border-gray-600">Grade / Standard</th>
                    <th className="p-4 border-b border-slate-200 dark:border-gray-600">Category</th>
                    <th className="p-4 border-b border-slate-200 dark:border-gray-600">28-Day Strength</th>
                    <th className="p-4 border-b border-slate-200 dark:border-gray-600">Initial Setting</th>
                    <th className="p-4 border-b border-slate-200 dark:border-gray-600">Primary Usage</th>
                    <th className="p-4 border-b border-slate-200 dark:border-gray-600 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-gray-700 font-body">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-gray-700/40 transition-colors">
                      <td className="p-4 font-bold text-[#1A3C91] dark:text-white">{p.name}</td>
                      <td className="p-4 font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {p.grade || 'Standard'}
                      </td>
                      <td className="p-4 text-xs font-semibold text-gray-600 dark:text-gray-300">{p.category}</td>
                      <td className="p-4 font-mono text-xs font-bold text-gray-900 dark:text-gray-100">
                        {p.technical_specs?.compressive_strength_28d || '≥ 32.5 MPa'}
                      </td>
                      <td className="p-4 font-mono text-xs text-gray-600 dark:text-gray-400">
                        {p.technical_specs?.initial_setting_time || '≥ 60 min'}
                      </td>
                      <td className="p-4 text-xs text-gray-600 dark:text-gray-300 max-w-xs truncate">
                        {p.application}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setActiveQuoteProduct(p)}
                          className="px-3 py-1.5 bg-[#2EAD32] text-white rounded-lg text-xs font-bold hover:bg-[#259329]"
                        >
                          Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Datasheet Modal Drawer */}
      <AnimatePresence>
        {activeSpecProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-gray-700 p-6 md:p-8 relative"
            >
              <button
                onClick={() => setActiveSpecProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-gray-700 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                <Icon icon={FaTimes} />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-[#2EAD32] dark:text-[#4ADE80] uppercase tracking-wider mb-2">
                <Icon icon={FaFlask} /> Technical Specification Sheet
              </div>

              <h2 className="text-2xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-2">
                {activeSpecProduct.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mb-6">
                Standard: {activeSpecProduct.standard || 'ES 1177-1 / EN 197-1'} | Grade: {activeSpecProduct.grade || 'N/A'}
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Chemical & Physical Parameters
                  </h4>
                  <div className="bg-slate-50 dark:bg-gray-900/60 rounded-xl border border-slate-200 dark:border-gray-700 overflow-hidden">
                    <table className="w-full text-xs">
                      <tbody>
                        {activeSpecProduct.technical_specs &&
                          Object.entries(activeSpecProduct.technical_specs).map(([key, val], idx) => (
                            <tr key={key} className={idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-transparent'}>
                              <td className="p-3 font-semibold text-gray-600 dark:text-gray-400 capitalize">
                                {key.replace(/_/g, ' ')}
                              </td>
                              <td className="p-3 font-mono font-bold text-gray-900 dark:text-gray-100 text-right">
                                {String(val)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">Curing & Handling Advice</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                    Ensure continuous wet curing for at least 7 days post-casting to achieve optimum design strength and prevent hydration shrinkage micro-cracks. Store bags in dry, elevated palletized conditions.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-gray-700 flex justify-end gap-3">
                <button
                  onClick={() => alert('Technical PDF Datasheet download triggered for ' + activeSpecProduct.name)}
                  className="inline-flex items-center gap-2 bg-[#1A3C91] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#152f73]"
                >
                  <Icon icon={FaFileDownload} /> Download PDF Spec Sheet
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quote Request Modal */}
      <AnimatePresence>
        {activeQuoteProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 dark:border-gray-700 p-6 md:p-8 relative"
            >
              <button
                onClick={() => setActiveQuoteProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-gray-700 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              >
                <Icon icon={FaTimes} />
              </button>

              <div className="flex items-center gap-2 text-xs font-bold text-[#2EAD32] dark:text-[#4ADE80] uppercase tracking-wider mb-2">
                <Icon icon={FaTruck} /> Commercial Procurement Request
              </div>

              <h2 className="text-xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-1">
                Request Quote: {activeQuoteProduct.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Fill out your volume requirements for direct factory dispatch pricing.
              </p>

              {quoteSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <Icon icon={FaCheckCircle} className="text-[#2EAD32] mx-auto" size={48} />
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">Quote Request Received!</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Our sales and logistics department will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name / Company</label>
                    <input
                      required
                      type="text"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      placeholder="e.g. Ethiopian Construction Corp"
                      className="w-full bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        placeholder="+251 9..."
                        className="w-full bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <input
                        required
                        type="email"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        placeholder="client@company.et"
                        className="w-full bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Estimated Quantity</label>
                      <input
                        required
                        type="number"
                        min="1"
                        value={quoteForm.quantity}
                        onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-800 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                      <select
                        value={quoteForm.unit}
                        onChange={(e) => setQuoteForm({ ...quoteForm, unit: e.target.value })}
                        className="w-full bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-800 dark:text-white"
                      >
                        <option value="Bags">50kg Bags</option>
                        <option value="MetricTons">Metric Tons (MT)</option>
                        <option value="BulkTankers">Bulk Tankers</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Delivery Destination</label>
                    <input
                      type="text"
                      value={quoteForm.location}
                      onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                      placeholder="e.g. Addis Ababa / Adama / Hawassa Site"
                      className="w-full bg-slate-100 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-xl p-2.5 text-gray-800 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2EAD32] text-white font-bold rounded-xl hover:bg-[#259329] transition-all shadow-md mt-4 text-sm"
                  >
                    Submit Procurement Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 bg-[#2EAD32] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#259329] transition-all"
            aria-label="Scroll to top"
          >
            <Icon icon={FaChevronUp} size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}