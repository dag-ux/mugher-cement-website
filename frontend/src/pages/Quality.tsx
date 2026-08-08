import { Helmet } from 'react-helmet';
import {
  FaAward,
  FaFlask,
  FaIndustry,
  FaLeaf,
  FaHandsHelping,
  FaCheckCircle,
  FaRecycle,
  FaChartLine,
  FaUsers,
} from 'react-icons/fa';

// Safe icon renderer
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

export default function Quality() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>Quality & Sustainability | Mugher Cement</title>
        <meta
          name="description"
          content="Mugher Cement's commitment to quality, environmental responsibility, and social sustainability. ISO certified with rigorous quality control."
        />
      </Helmet>

      {/* Hero Banner with Background Image */}
      <div
        className="relative bg-cover bg-center py-16 md:py-20 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3C91]/90 to-[#2EAD32]/80" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <Icon icon={FaAward} className="text-5xl md:text-6xl mb-4 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-wide">
            Quality & Sustainability
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mx-auto mt-4">
            Committed to international standards, environmental stewardship, and social responsibility.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-[#2EAD32] dark:text-[#4ADE80]">ISO</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-body">Certified Quality</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-[#1A3C91] dark:text-[#4A7DB4]">100%</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-body">Lab Tested</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-[#2EAD32] dark:text-[#4ADE80]">35+</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-body">Years of Excellence</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-[#1A3C91] dark:text-[#4A7DB4]">0</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-body">Compromises on Quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="space-y-12">
          {/* Quality Process Steps */}
          <section>
            <h2 className="text-3xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-8 text-center tracking-wide">
              Our Quality Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { step: '1', label: 'Raw Material Testing', icon: FaFlask, img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
                { step: '2', label: 'Production Monitoring', icon: FaIndustry, img: 'https://images.unsplash.com/photo-1581092335871-4c9e7e7e8e3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
                { step: '3', label: 'Laboratory Analysis', icon: FaCheckCircle, img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
                { step: '4', label: 'Quality Approval', icon: FaAward, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
                { step: '5', label: 'Customer Delivery', icon: FaUsers, img: 'https://images.unsplash.com/photo-1581092335871-4c9e7e7e8e3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md dark:shadow-gray-900/30 border border-slate-200 dark:border-gray-700 text-center hover:shadow-lg transition"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                    onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                  />
                  <div className="w-12 h-12 mx-auto bg-[#1A3C91]/10 dark:bg-[#4A7DB4]/20 rounded-full flex items-center justify-center mb-3">
                    <span className="text-xl font-heading font-bold text-[#1A3C91] dark:text-[#4A7DB4]">{item.step}</span>
                  </div>
                  <Icon icon={item.icon} className="text-2xl text-[#2EAD32] dark:text-[#4ADE80] mx-auto mb-2" />
                  <p className="text-sm font-body font-semibold text-gray-700 dark:text-gray-300">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Commitment to Quality */}
          <section className="bg-slate-50 dark:bg-gray-800 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Quality Lab"
                className="w-full md:w-1/3 h-48 object-cover rounded-xl"
                onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
              />
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <Icon icon={FaFlask} className="text-[#2EAD32] dark:text-[#4ADE80] text-3xl mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-[#1A3C91] dark:text-white mb-3">
                      Commitment to Quality
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-body">
                      At Mugher Cement, quality is not just a standard – it is our culture. Our manufacturing
                      process adheres to international specifications, with rigorous quality control at every
                      stage, from raw material selection to final packaging. Our in‑house laboratory is
                      equipped with cutting‑edge technology to verify chemical and physical properties.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="bg-[#1A3C91]/10 dark:bg-[#4A7DB4]/20 text-[#1A3C91] dark:text-[#4A7DB4] text-sm font-semibold px-3 py-1 rounded-full">ISO 9001:2015</span>
                      <span className="bg-[#1A3C91]/10 dark:bg-[#4A7DB4]/20 text-[#1A3C91] dark:text-[#4A7DB4] text-sm font-semibold px-3 py-1 rounded-full">ASTM Standards</span>
                      <span className="bg-[#1A3C91]/10 dark:bg-[#4A7DB4]/20 text-[#1A3C91] dark:text-[#4A7DB4] text-sm font-semibold px-3 py-1 rounded-full">ES ISO Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Environmental Responsibility */}
          <section className="bg-gradient-to-br from-[#1A3C91]/5 to-[#2EAD32]/5 dark:from-[#4A7DB4]/10 dark:to-[#4ADE80]/10 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col md:flex-row-reverse items-start gap-6">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Environment"
                className="w-full md:w-1/3 h-48 object-cover rounded-xl"
                onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
              />
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <Icon icon={FaLeaf} className="text-[#2EAD32] dark:text-[#4ADE80] text-3xl mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-[#1A3C91] dark:text-white mb-3">
                      Environmental Responsibility
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-body">
                      We are committed to sustainable production. We actively invest in technologies that
                      minimise emissions, conserve energy, and reduce waste. Our goal is to lower our carbon
                      footprint while maintaining exceptional product quality.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <Icon icon={FaLeaf} className="text-sm" /> Low Emissions
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <Icon icon={FaRecycle} className="text-sm" /> Waste Reduction
                      </span>
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <Icon icon={FaChartLine} className="text-sm" /> Energy Efficiency
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Responsibility */}
          <section className="bg-slate-50 dark:bg-gray-800 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Community"
                className="w-full md:w-1/3 h-48 object-cover rounded-xl"
                onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
              />
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <Icon icon={FaHandsHelping} className="text-[#2EAD32] dark:text-[#4ADE80] text-3xl mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-[#1A3C91] dark:text-white mb-3">
                      Social Responsibility
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-body">
                      We believe in giving back to the communities that host us. Mugher Cement supports
                      local development projects, education initiatives, and health programmes as part of our
                      corporate citizenship. Our employees are our greatest asset, and we invest in their
                      well‑being and professional growth.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="bg-blue-100 dark:bg-blue-900/30
                       text-blue-700 dark:text-blue-300 text-sm font-semibold
                        px-3 py-1 rounded-full"> Education</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 
                      dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full"> Health</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700
                       dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full">Housing</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700
                       dark:text-blue-300 text-sm font-semibold px-3 py-1 rounded-full"> Sports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2EAD32] hover:bg-emerald-700 dark:bg-[#2EAD32] dark:hover:bg-[#4ADE80] text-white dark:text-gray-900 px-8 py-3 rounded-lg font-semibold transition shadow-md"
            >
              <Icon icon={FaCheckCircle} />
              Learn More About Our Commitment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}