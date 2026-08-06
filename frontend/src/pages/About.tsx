import { Helmet } from 'react-helmet';
import {
  FaBuilding,
  FaCalendarAlt,
  FaChartLine,
  FaIndustry,
  FaSchool,
  FaHospital,
  FaHome,
  FaFutbol,
  FaUsers,
  FaLeaf,
  FaHandsHelping,
  FaUserTie,
  FaMapMarkerAlt,
  FaBoxes,
  FaTrophy,
  FaAward,
  FaHeart,
  FaGraduationCap,
} from 'react-icons/fa';

// Safe icon renderer (bypasses React 19 type issues)
const Icon = ({ icon: IconComponent, className, size }: any) => (
  <IconComponent className={className} size={size} />
);

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Helmet>
        <title>About Us | Mugher Cement</title>
        <meta
          name="description"
          content="Mugher Cement Enterprise – Ethiopia's pioneer state‑owned cement manufacturer since 1984. Quality OPC & PPC cement for all infrastructure projects."
        />
      </Helmet>

      {/* Hero Section */}
      <div
        className="relative w-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden"
        style={{ minHeight: '400px', maxHeight: '600px' }}
      >
        <img
          src="/about.jpg"
          alt="Mugher Cement Factory"
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/1920x600?text=Mugher+Cement+Factory';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3C91]/80 to-[#2EAD32]/70 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                Since 1984
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-tight">
                About Mugher Cement
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-body mt-4 max-w-2xl">
                Ethiopia's pioneer and largest state‑owned cement manufacturer – building the
                nation's infrastructure with quality and integrity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-[#1A3C91] dark:text-[#4A7DB4]">1984</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-body">Established</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-[#2EAD32] dark:text-[#4ADE80]">3</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-body">Production Lines</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-[#1A3C91] dark:text-[#4A7DB4]">2.2M</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-body">Tons / Year</p>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading font-black text-[#2EAD32] dark:text-[#4ADE80]">90 km</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-body">From Addis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-start gap-4">
              <Icon icon={FaIndustry} className="text-[#2EAD32] dark:text-[#4ADE80] text-3xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-body">
                  Mugher Cement Enterprise is Ethiopia's pioneer and largest state‑owned cement
                  manufacturer, established in <strong>1984</strong> during the Derg military regime.
                  Built by an East German company near the Mugher River, about{' '}
                  <strong>90 km west of Addis Ababa</strong>, the plant started with a capacity of
                  300,000 tons of clinker per year.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-body mt-4">
                  Today, it remains a vital pillar of the domestic construction industry, supplying
                  <strong> Ordinary Portland Cement (OPC)</strong> and{' '}
                  <strong>Portland Pozzolana Cement (PPC)</strong> for mega‑projects, bridges, and
                  residential developments across Ethiopia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-slate-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-10 text-center tracking-wide">
            Our History & Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition hover:border-[#2EAD32]/30 group">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon={FaCalendarAlt} className="text-[#2EAD32] dark:text-[#4ADE80] group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg">1984 – Founding</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Plant construction completed by East German engineers in Mekoda (Oromia region),
                launching production with a 300,000‑ton yearly capacity.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition hover:border-[#2EAD32]/30 group">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon={FaChartLine} className="text-[#2EAD32] dark:text-[#4ADE80] group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg">1990 – Expansion</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Production capacity doubled to 600,000 tons per year with the addition of a
                second production line.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition hover:border-[#2EAD32]/30 group">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon={FaBuilding} className="text-[#2EAD32] dark:text-[#4ADE80] group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg">1999 – Reorganisation</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Merged with the Addis Ababa Cement Factory to form Mugher Cement Enterprise,
                with an authorised capital of over 334 million birr.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition hover:border-[#2EAD32]/30 group">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon={FaIndustry} className="text-[#2EAD32] dark:text-[#4ADE80] group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg">2011 – Major Upgrade</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                A third production line, built by China's Sinoma, significantly increased total
                output and modernised the plant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Capacity */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-10 text-center tracking-wide">
            Production Capacity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#1A3C91]/5 dark:from-[#4A7DB4]/10 to-[#2EAD32]/5 dark:to-[#4ADE80]/10 p-6 rounded-2xl border border-slate-200 dark:border-gray-700 text-center hover:shadow-lg transition">
              <div className="text-4xl font-heading font-black text-[#1A3C91] dark:text-[#4A7DB4]">1</div>
              <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg mt-1">Line 1</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">1984 – 1,000 tons/day</p>
            </div>
            <div className="bg-gradient-to-br from-[#1A3C91]/5 dark:from-[#4A7DB4]/10 to-[#2EAD32]/5 dark:to-[#4ADE80]/10 p-6 rounded-2xl border border-slate-200 dark:border-gray-700 text-center hover:shadow-lg transition">
              <div className="text-4xl font-heading font-black text-[#2EAD32] dark:text-[#4ADE80]">2</div>
              <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg mt-1">Line 2</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">1990 – 1,000 tons/day</p>
            </div>
            <div className="bg-gradient-to-br from-[#1A3C91]/5 dark:from-[#4A7DB4]/10 to-[#2EAD32]/5 dark:to-[#4ADE80]/10 p-6 rounded-2xl border border-slate-200 dark:border-gray-700 text-center hover:shadow-lg transition">
              <div className="text-4xl font-heading font-black text-[#1A3C91] dark:text-[#4A7DB4]">3</div>
              <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg mt-1">Line 3</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">2012 – 3,000 tons/day</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-[#1A3C91]/5 dark:bg-[#4A7DB4]/10 rounded-xl border border-[#1A3C91]/20 dark:border-[#4A7DB4]/20 text-center">
            <p className="text-gray-700 dark:text-gray-300 font-body">
              <strong className="text-[#1A3C91] dark:text-[#4A7DB4]">Total annual production:</strong>{' '}
              1.5 million tons of clinker, 2.2 million tons of cement.
            </p>
          </div>
        </div>
      </section>

      {/* Community Services */}
      <section className="py-16 bg-slate-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-6 text-center tracking-wide">
            Community & Social Responsibility
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 font-body max-w-2xl mx-auto mb-10">
            Mugher Cement is deeply committed to the well‑being of its employees and the surrounding
            community, providing services that transform the local area.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-lg transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon icon={FaSchool} className="text-[#1A3C91] dark:text-[#4A7DB4]" />
                </div>
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg">Education</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Runs schools from <strong>Kindergarten through Preparatory</strong> in Mugher,
                Tatek, and Derba – serving children of employees and the local community.
              </p>
              <div className="mt-3 rounded-lg overflow-hidden">
                <img
                  src="/kg.jpg"
                  alt="Mugher Cement School"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/600x300?text=Education';
                  }}
                />
              </div>
            </div>

            {/* Healthcare */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-lg transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon icon={FaHospital} className="text-[#2EAD32] dark:text-[#4ADE80]" />
                </div>
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg">Healthcare</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Operates health centers and clinics providing essential medical services to workers
                and nearby residents.
              </p>
              <div className="mt-3 rounded-lg overflow-hidden">
                <img
                  src="/healthteam.jpg"
                  alt="Healthcare"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/600x300?text=Healthcare';
                  }}
                />
              </div>
            </div>

            {/* Housing & Utilities */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-lg transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon icon={FaHome} className="text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg">Housing & Utilities</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Provides fully furnished housing for employees with water, electricity, and
                foreign television channels. A dedicated workers' village exists near the factory.
              </p>
            </div>

            {/* Sports */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-lg transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon icon={FaFutbol} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg">Sports & Recreation</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Home to a <strong>national‑level football club</strong>, athletics teams, and
                regular tournaments. Produces athletes for international competitions and the
                Olympics.
              </p>
              <div className="mt-3 rounded-lg overflow-hidden">
                <img
                  src="/image3.jpg"
                  alt="Sports Team"
                  className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/600x300?text=Sports';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-10 text-center tracking-wide">
            Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1A3C91]/80 to-[#2EAD32]/70 text-white p-8 rounded-2xl shadow-xl">
              <Icon icon={FaHandsHelping} className="text-4xl mb-4 text-white" />
              <h3 className="text-2xl font-heading font-bold mb-3">Our Mission</h3>
              <p className="text-gray-200 font-body leading-relaxed">
                To deliver high‑quality cement products that build lasting infrastructure, while
                fostering sustainable development and creating value for our stakeholders,
                employees, and communities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#1A3C91]/80 to-[#2EAD32]/70 text-white p-8 rounded-2xl shadow-xl">
              <Icon icon={FaTrophy} className="text-4xl mb-4 text-white" />
              <h3 className="text-2xl font-heading font-bold mb-3">Our Vision</h3>
              <p className="text-gray-200 font-body leading-relaxed">
                To become a globally competitive cement producer – producing high‑quality cement,
                ensuring customer satisfaction, and promoting clean production, teamwork, and
                sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-slate-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-10 text-center tracking-wide">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-700 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition flex items-center gap-4">
              <Icon icon={FaUserTie} className="text-[#1A3C91] dark:text-[#4A7DB4] text-3xl" />
              <div>
                <h4 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">Ato Tewodros Gebremedhin</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-body">Chief Executive Officer</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition flex items-center gap-4">
              <Icon icon={FaUserTie} className="text-[#2EAD32] dark:text-[#4ADE80] text-3xl" />
              <div>
                <h4 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">W/ro Almaz Desta</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-body">Chief Operating Officer</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition flex items-center gap-4">
              <Icon icon={FaUserTie} className="text-[#1A3C91] dark:text-[#4A7DB4] text-3xl" />
              <div>
                <h4 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">Ato Abebe Worku</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-body">Chief Financial Officer</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition flex items-center gap-4">
              <Icon icon={FaUserTie} className="text-[#2EAD32] dark:text-[#4ADE80] text-3xl" />
              <div>
                <h4 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">Engineer Yonas Tefera</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-body">Director of Production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-gradient-to-r from-[#1A3C91]/80 to-[#2EAD32]/70 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 text-white">
            <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
              <Icon icon={FaAward} className="text-white" />
              Quick Facts
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white/90 font-body">
              <li className="flex items-center gap-2">
                <Icon icon={FaMapMarkerAlt} className="text-white" /> Located 90 km west of Addis Ababa
              </li>
              <li className="flex items-center gap-2">
                <Icon icon={FaCalendarAlt} className="text-white" /> Established in 1984
              </li>
              <li className="flex items-center gap-2">
                <Icon icon={FaIndustry} className="text-white" /> 3 production lines
              </li>
              <li className="flex items-center gap-2">
                <Icon icon={FaBoxes} className="text-white" /> 2.2 million tons of cement per year
              </li>
              <li className="flex items-center gap-2">
                <Icon icon={FaUsers} className="text-white" /> Over 1,500 employees
              </li>
              <li className="flex items-center gap-2">
                <Icon icon={FaFutbol} className="text-white" /> Owns a national‑level football club
              </li>
              <li className="flex items-center gap-2">
                <Icon icon={FaGraduationCap} className="text-white" /> Runs schools from KG to Preparatory
              </li>
              <li className="flex items-center gap-2">
                <Icon icon={FaHeart} className="text-white" /> Operates health clinics and housing
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}