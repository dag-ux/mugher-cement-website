import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import API from '../services/api';
import NewsCard from '../components/news/NewsCard';

// ----- Types -----
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
}

interface News {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
}

// ----- Scroll Animation Hook -----
const useScrollAnimation = () => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return { setRef, isVisible };
};

// ----- Hero Slider Data -----
const heroSlides = [
  {
    id: 1,
    title: 'State‑of‑the‑Art Cement Plant',
    subtitle: 'Aerial view of Mugher Cement – 90 km northwest of Addis Ababa',
    bg: '/dron2.jpg',
    cta: 'Explore Our Factory',
    link: '/about',
  },
  {
    id: 2,
    title: 'Industry Leadership & Innovation',
    subtitle: 'Mugher Cement at the Ethiopia Tamirt Expo – building partnerships for growth',
    bg: '/exhibition.jpg',
    cta: 'Our News',
    link: '/media',
  },
  {
    id: 3,
    title: 'Building Ethiopia’s Future',
    subtitle: 'Trusted by engineers for mega‑projects – from dams to high‑rises',
    bg: '/cement.jpg',
    cta: 'View Our Products',
    link: '/products',
  },
  {
    id: 4,
    title: 'Quality & Sustainability',
    subtitle: 'Committed to ISO standards, green technology, and community development',
    bg: '/dron2.jpg',
    cta: 'Learn About Quality',
    link: '/quality',
  },
];

// ----- Main Component -----
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const aboutRef = useScrollAnimation();
  const productsRef = useScrollAnimation();
  const qualityRef = useScrollAnimation();
  const newsRef = useScrollAnimation();
  const careersRef = useScrollAnimation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, newsRes] = await Promise.all([
          API.get('/products'),
          API.get('/news'),
        ]);
        setProducts(prodRes.data.slice(0, 5));
        setNews(newsRes.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium font-body">Loading Mugher Cement...</p>
        </div>
      </div>
    );
  }

  const fadeUp = (visible: boolean) =>
    `transition-all duration-1000 transform ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    }`;

  return (
    <div className="bg-white text-gray-800 antialiased selection:bg-brand selection:text-white overflow-x-hidden font-body">
      <Helmet>
        <title>Mugher Cement – Building Ethiopia</title>
        <meta
          name="description"
          content="Mugher Cement Enterprise – Ethiopia's pioneer cement manufacturer since 1984. Quality OPC & PPC cement for all infrastructure projects."
        />
      </Helmet>

      {/* ============ HERO CAROUSEL ============ */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-screen min-h-[600px] max-h-[900px] w-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="container mx-auto px-6 text-center text-white relative z-10 max-w-4xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-tight mb-4 tracking-wide drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 font-light mb-8 tracking-wide">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.link}
                  className="inline-block px-8 py-4 bg-[#2EAD32] text-white font-semibold rounded-full shadow-lg hover:bg-emerald-700 transition transform hover:scale-105 font-body"
                >
                  {slide.cta} →
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#1A3C91_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#2EAD32] text-sm font-bold uppercase tracking-widest border-b-2 border-[#2EAD32] pb-1">
              Why Mugher Cement
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] mt-4 mb-3 leading-tight">
              Trusted by Engineers. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EAD32] to-emerald-600">
                Preferred by Builders.
              </span>
            </h2>
            <p className="text-gray-600 text-lg font-body max-w-2xl mx-auto">
              Our commitment to quality, innovation, and sustainability makes us the cement of choice for Ethiopia’s most ambitious projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100/80 hover:border-[#1A3C91]/30">
              <div className="w-14 h-14 bg-[#1A3C91]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-[#1A3C91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 4h4" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-[#1A3C91] mb-2 group-hover:text-[#2EAD32] transition-colors">35+ Years of Excellence</h3>
              <p className="text-gray-600 text-sm font-body leading-relaxed">
                A proven track record of delivering high‑quality cement for Ethiopia’s most critical infrastructure.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100/80 hover:border-[#2EAD32]/30">
              <div className="w-14 h-14 bg-[#2EAD32]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-[#2EAD32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-[#1A3C91] mb-2 group-hover:text-[#2EAD32] transition-colors">ISO Certified Quality</h3>
              <p className="text-gray-600 text-sm font-body leading-relaxed">
                Rigorous lab testing at every stage ensures consistent compressive strength and durability.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100/80 hover:border-amber-500/30">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-[#1A3C91] mb-2 group-hover:text-[#2EAD32] transition-colors">Advanced Technology</h3>
              <p className="text-gray-600 text-sm font-body leading-relaxed">
                Dry‑process preheater kilns and precalciner technology for higher efficiency and lower emissions.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100/80 hover:border-emerald-500/30">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-bold text-[#1A3C91] mb-2 group-hover:text-[#2EAD32] transition-colors">Community Focused</h3>
              <p className="text-gray-600 text-sm font-body leading-relaxed">
                Investing in education, health, housing, and sports for the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ABOUT / FACTORY OVERVIEW ============ */}
      <section id="about" ref={aboutRef.setRef} className="py-20 bg-white">
        <div className={fadeUp(aboutRef.isVisible)}>
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4 font-body">
                  Since 1984 • Pioneer
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1A3C91] leading-tight mb-6 tracking-wide">
                  Ethiopia’s Premier Cement <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EAD32] to-emerald-600">
                    Manufacturer
                  </span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 font-body">
                  Mugher Cement Enterprise is Ethiopia’s pioneer and largest state‑owned cement
                  manufacturer, located in <strong>Mekoda, Ada'a Barga District, West Shewa Zone,
                  Oromia</strong> – about 90 km northwest of Addis Ababa at an elevation of
                  2,450 metres above sea level.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition hover:border-[#1A3C91]/30 group">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#2EAD32] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 4h4" />
                      </svg>
                      <span className="font-semibold text-[#1A3C91]">3 Production Lines</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Clinker: 1.5M tons/year • Cement: 2.2M tons/year</p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition hover:border-[#1A3C91]/30 group">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#2EAD32] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="font-semibold text-[#1A3C91]">Modern Technology</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Dry Process • Five‑Stage Preheater • Precalciner Kiln</p>
                  </div>
                </div>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-[#1A3C91] text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition shadow-md hover:shadow-lg font-body group"
                >
                  <span>Learn More About Us</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              <div className="relative">
                <img
                  src="/dron2.jpg"
                  alt="Mugher Cement Factory Aerial"
                  className="w-full rounded-2xl shadow-2xl object-cover h-80 lg:h-96 hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute -bottom-6 -right-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 max-w-xs">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-[#2EAD32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium font-body">Mekoda, Oromia</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-body">Elevation: 2,450 m • 90 km from Addis</p>
                </div>
              </div>
            </div>

            {/* Technology Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition hover:-translate-y-1 hover:border-[#1A3C91]/30 group">
                <div className="w-12 h-12 bg-[#1A3C91]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#1A3C91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#1A3C91] group-hover:text-[#2EAD32] transition-colors">Dry Process Technology</h3>
                <p className="text-sm text-gray-600 mt-1 font-body">Five‑stage shaft preheater kiln with rotary cooler – lower fuel consumption and higher efficiency.</p>
              </div>
              <div className="bg-slate-50/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition hover:-translate-y-1 hover:border-[#1A3C91]/30 group">
                <div className="w-12 h-12 bg-[#2EAD32]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-[#2EAD32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#1A3C91] group-hover:text-[#2EAD32] transition-colors">Precalciner Kiln (Line 3)</h3>
                <p className="text-sm text-gray-600 mt-1 font-body">Advanced grate cooler technology – higher capacity, lower emissions, and better clinker quality.</p>
              </div>
              <div className="bg-slate-50/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition hover:-translate-y-1 hover:border-amber-500/30 group">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-heading font-bold text-[#1A3C91] group-hover:text-[#2EAD32] transition-colors">ISO Certified Quality</h3>
                <p className="text-sm text-gray-600 mt-1 font-body">Continuous laboratory testing to ensure consistent compressive strength and setting time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTS – SPOTLIGHT SHOWCASE (no arrows) ============ */}
      <section id="products" ref={productsRef.setRef} className="py-20 bg-slate-50">
        <div className={fadeUp(productsRef.isVisible)}>
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2EAD32] font-body">Premium Grade Solutions</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1A3C91] mt-2 mb-4 tracking-wide">
                Our Products
              </h2>
              <p className="text-gray-600 text-lg font-body">
                Premium cement formulations engineered for strength, durability, and performance.
              </p>
            </div>

            {products.length > 0 ? (
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <Swiper
                  modules={[Autoplay, Pagination, EffectFade]}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true, type: 'bullets' }}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  loop
                  className="w-full"
                  style={{ height: '480px' }}
                >
                  {products.map((product) => {
                    // Gradient mapping: OPC → Blue, PPC → Green
                    const bgGradients: Record<string, string> = {
                      OPC: 'from-blue-900 via-blue-700 to-blue-500',
                      PPC: 'from-emerald-900 via-emerald-700 to-emerald-500',
                    };
                    const gradientClass =
                      bgGradients[product.category] ||
                      'from-brand via-blue-800 to-blue-600';

                    return (
                      <SwiperSlide key={product.id}>
                        <div
                          className={`relative w-full h-full flex flex-col md:flex-row items-center justify-center bg-gradient-to-br ${gradientClass} p-8 md:p-12`}
                        >
                          {/* Floating image */}
                          <div className="w-full md:w-1/2 flex items-center justify-center animate-float">
                            <img
                              src={product.image_url || '/placeholder.jpg'}
                              alt={product.name}
                              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://via.placeholder.com/400x400?text=Cement+Product';
                              }}
                            />
                          </div>

                          {/* Text content */}
                          <div className="w-full md:w-1/2 text-white text-center md:text-left">
                            <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full mb-4">
                              {product.category || 'Cement'}
                            </span>
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-3">
                              {product.name}
                            </h3>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0 mb-6">
                              {product.description}
                            </p>
                            <Link
                              to={`/products/${product.slug}`}
                              className="inline-block bg-white text-[#1A3C91] px-6 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
                            >
                              Learn More →
                            </Link>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-gray-500 font-body">
                No products available.
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1A3C91] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-slate-800 transition group font-body"
              >
                <span>View All Products</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ QUALITY & EXPO ============ */}
      <section id="quality" ref={qualityRef.setRef} className="py-20 bg-[#1A3C91] text-white">
        <div className={fadeUp(qualityRef.isVisible)}>
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-[#2EAD32]/20 text-emerald-300 text-xs font-semibold rounded-md uppercase tracking-wider mb-4 font-body">
                  Uncompromised Quality
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold leading-tight mb-6 tracking-wide">
                  Quality & Sustainability <br />
                  <span className="text-[#2EAD32]">at Our Core</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8 font-body">
                  We maintain rigorous quality control and invest in eco‑friendly technology to
                  minimise environmental impact while maximising cement performance. Our active
                  participation in industry expos like the Ethiopia Tamirt Expo strengthens our
                  market relationships and drives innovation.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 group">
                    <div className="mt-1 p-1 bg-[#2EAD32]/20 rounded text-emerald-400 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold font-body">ISO Standard Testing</h4>
                      <p className="text-slate-400 text-sm font-body">Continuous batch analysis ensuring consistent setting time and strength.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="mt-1 p-1 bg-[#2EAD32]/20 rounded text-emerald-400 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold font-body">Reduced Environmental Footprint</h4>
                      <p className="text-slate-400 text-sm font-body">Advanced dust collection and sustainable manufacturing practices.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="mt-1 p-1 bg-[#2EAD32]/20 rounded text-emerald-400 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold font-body">Community & Social Responsibility</h4>
                      <p className="text-slate-400 text-sm font-body">Supporting schools, health centers, housing, and sports for local communities.</p>
                    </div>
                  </li>
                </ul>
                <Link
                  to="/quality"
                  className="inline-flex items-center gap-2 bg-[#2EAD32] hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-emerald-900/30 font-body group"
                >
                  <span>Learn More About Quality</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-[#1a2f5e]/80 backdrop-blur border border-white/10 p-6 rounded-3xl shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-black/20 rounded-xl">
                      <div className="text-3xl font-heading font-black text-[#2EAD32]">35+</div>
                      <div className="text-xs text-slate-300 font-body">Years of Excellence</div>
                    </div>
                    <div className="p-4 bg-black/20 rounded-xl">
                      <div className="text-3xl font-heading font-black text-[#2EAD32]">100%</div>
                      <div className="text-xs text-slate-300 font-body">Lab Checked</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-4 hover:shadow-xl transition">
                  <img
                    src="/exhibition.jpg"
                    alt="Mugher Cement at Ethiopia Tamirt Expo"
                    className="w-full max-h-64 object-contain rounded-xl hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ NEWS ============ */}
      <section id="media" ref={newsRef.setRef} className="py-20 bg-white">
        <div className={fadeUp(newsRef.isVisible)}>
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-[#2EAD32] font-body">Press & Announcements</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1A3C91] mt-2 mb-4 tracking-wide">
                Latest News
              </h2>
              <p className="text-gray-600 text-lg font-body">
                Read current stories, community investments, and updates from Mugher Cement.
              </p>
            </div>

            {news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {news.map((n) => (
                  <div key={n.id} className="transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <NewsCard news={n} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-gray-500 font-body">
                No news articles found.
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/media"
                className="inline-flex items-center gap-2 text-[#2EAD32] font-semibold hover:text-emerald-700 transition group font-body"
              >
                <span>View All News →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAREERS ============ */}
      <section id="careers" ref={careersRef.setRef} className="py-20 bg-slate-50">
        <div className={fadeUp(careersRef.isVisible)}>
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-full mb-4 font-body">
                  Careers & Community
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1A3C91] leading-tight mb-6 tracking-wide">
                  Build Ethiopia's Future <br />
                  <span className="text-[#2EAD32]">With Us</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 font-body">
                  Join <strong>1,500+</strong> dedicated professionals and help us build Ethiopia's
                  future with passion, safety, and innovation. We invest in our communities through
                  education, health, housing, and sports.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-gray-700 font-body">1,263 Male</span>
                  <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-gray-700 font-body">239 Female</span>
                  <span className="bg-white px-4 py-2 rounded-full shadow-sm text-sm text-gray-700 font-body">+50 Community Services</span>
                </div>
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2EAD32] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-emerald-700 transition group font-body"
                >
                  <span>View Openings</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="relative">
                <img
                  src="/image3.jpg"
                  alt="Mugher Cement Volleyball Team"
                  className="w-full rounded-2xl shadow-2xl object-cover h-72 hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1612872087720-bb876e22e5d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#2EAD32]/10 rounded-full blur-2xl pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT CTA ============ */}
      <section className="py-20 bg-[#1A3C91] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2EAD32]/20 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-6 drop-shadow-lg">
            Get in Touch
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-body">
            Have a question or need a quote? Reach out to our dedicated team today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 bg-[#2EAD32] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-emerald-700 transition transform hover:-translate-y-0.5 font-body"
            >
              Contact Us
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 bg-white/10 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/20 transition border border-white/20 font-body"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}