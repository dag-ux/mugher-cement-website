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

// Reusable "engraved plaque" eyebrow — the signature motif used
// above every section heading, echoing a cornerstone/foundation plate.
const SectionEyebrow = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <span className="h-px w-8 bg-[#2EAD32] dark:bg-[#4ADE80]" />
    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#2EAD32] dark:text-[#4ADE80] font-body">
      {label}
    </span>
    <span className="h-px w-8 bg-[#2EAD32] dark:bg-[#4ADE80]" />
  </div>
);

// Subtle dot-grid texture (inline, no external asset) — evokes
// aggregate/cement texture without adding weight to the page.
const dotGrid = {
  backgroundImage:
    'radial-gradient(circle, rgba(26,60,145,0.08) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
};

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
        style={{ minHeight: '440px', maxHeight: '620px' }}
      >
        <img
          src="/about.jpg"
          alt="Mugher Cement Factory"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/1920x600?text=Mugher+Cement+Factory';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3C91]/85 via-[#1A3C91]/70 to-[#2EAD32]/60 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              {/* Engraved plaque badge — signature element */}
              <div
                className="inline-flex items-center gap-2 border border-white/60 px-4 py-1.5 mb-5"
                style={{ boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.15)' }}
              >
                <Icon icon={FaIndustry} className="text-white text-xs" />
                <span className="text-white text-xs font-bold uppercase tracking-[0.25em] font-body">
                  Est. 1984 — Mugher, Ethiopia
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.05] tracking-tight">
                Building Ethiopia,
                <br className="hidden md:block" /> One Foundation at a Time
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-body mt-5 max-w-2xl leading-relaxed">
                Ethiopia's pioneer and largest state‑owned cement manufacturer –
                supplying the cement behind the nation's roads, bridges, and homes
                for over four decades.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar — styled like a plant spec plate */}
      <div className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 dark:divide-gray-700 text-center">
            <div className="px-2">
              <div className="text-3xl md:text-4xl font-heading font-black text-[#1A3C91] dark:text-[#4A7DB4] tabular-nums">
                1984
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-body mt-1">
                Established
              </p>
            </div>
            <div className="px-2">
              <div className="text-3xl md:text-4xl font-heading font-black text-[#2EAD32] dark:text-[#4ADE80] tabular-nums">
                3
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-body mt-1">
                Production Lines
              </p>
            </div>
            <div className="px-2">
              <div className="text-3xl md:text-4xl font-heading font-black text-[#1A3C91] dark:text-[#4A7DB4] tabular-nums">
                2.2M
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-body mt-1">
                Tons / Year
              </p>
            </div>
            <div className="px-2">
              <div className="text-3xl md:text-4xl font-heading font-black text-[#2EAD32] dark:text-[#4ADE80] tabular-nums">
                90 km
              </div>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-body mt-1">
                From Addis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Ghost watermark of founding year */}
        <div
          className="pointer-events-none select-none absolute -right-6 -top-10 text-[10rem] md:text-[14rem] font-heading font-black text-[#1A3C91]/5 dark:text-[#4A7DB4]/5 leading-none"
          aria-hidden="true"
        >
          1984
        </div>
        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="bg-slate-50 dark:bg-gray-800 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-start gap-4">
              <Icon
                icon={FaIndustry}
                className="text-[#2EAD32] dark:text-[#4ADE80] text-3xl mt-1 flex-shrink-0"
              />
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-body">
                  Mugher Cement Enterprise is Ethiopia's pioneer and largest
                  state‑owned cement manufacturer, established in{' '}
                  <strong>1984</strong> during the Derg military regime. Built
                  by an East German company near the Mugher River, about{' '}
                  <strong>90 km west of Addis Ababa</strong>, the plant started
                  with a capacity of 300,000 tons of clinker per year.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-body mt-4">
                  Today, it remains a vital pillar of the domestic construction
                  industry, supplying{' '}
                  <strong>Ordinary Portland Cement (OPC)</strong> and{' '}
                  <strong>Portland Pozzolana Cement (PPC)</strong> for
                  mega‑projects, bridges, and residential developments across
                  Ethiopia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline — rebar-style vertical line */}
      <section className="py-16 bg-slate-50 dark:bg-gray-800" style={dotGrid}>
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionEyebrow label="Growth Timeline" />
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-12 text-center tracking-tight">
            Our History & Growth
          </h2>

          <div className="relative pl-8">
            {/* the "rebar" line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#1A3C91] via-[#2EAD32] to-[#1A3C91] dark:from-[#4A7DB4] dark:via-[#4ADE80] dark:to-[#4A7DB4]" />

            {[
              {
                year: '1984',
                title: 'Founding',
                icon: FaCalendarAlt,
                text: "Plant construction completed by East German engineers in Mekoda (Oromia region), launching production with a 300,000‑ton yearly capacity.",
              },
              {
                year: '1990',
                title: 'Expansion',
                icon: FaChartLine,
                text: 'Production capacity doubled to 600,000 tons per year with the addition of a second production line.',
              },
              {
                year: '1999',
                title: 'Reorganisation',
                icon: FaBuilding,
                text: 'Merged with the Addis Ababa Cement Factory to form Mugher Cement Enterprise, with an authorised capital of over 334 million birr.',
              },
              {
                year: '2011',
                title: 'Major Upgrade',
                icon: FaIndustry,
                text: "A third production line, built by China's Sinoma, significantly increased total output and modernised the plant.",
              },
            ].map((item, idx) => (
              <div key={item.year} className="relative pb-10 last:pb-0">
                <div className="absolute -left-8 top-0 w-5 h-5 rounded-full bg-white dark:bg-gray-800 border-2 border-[#2EAD32] dark:border-[#4ADE80] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#2EAD32] dark:bg-[#4ADE80]" />
                </div>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md hover:border-[#2EAD32]/30 transition group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold tracking-widest text-[#2EAD32] dark:text-[#4ADE80] font-body">
                      {item.year}
                    </span>
                    <Icon
                      icon={item.icon}
                      className="text-[#1A3C91] dark:text-[#4A7DB4] group-hover:scale-110 transition-transform"
                    />
                    <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Capacity — silo-gauge style bars */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionEyebrow label="Plant Output" />
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-10 text-center tracking-tight">
            Production Capacity
          </h2>

          <div className="bg-slate-50 dark:bg-gray-800 rounded-3xl border border-slate-200 dark:border-gray-700 p-6 md:p-8 space-y-6">
            {[
              { line: 'Line 1', year: '1984', tons: 1000, pct: 33 },
              { line: 'Line 2', year: '1990', tons: 1000, pct: 33 },
              { line: 'Line 3', year: '2012', tons: 3000, pct: 100 },
            ].map((row) => (
              <div key={row.line}>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-bold text-[#1A3C91] dark:text-white font-heading">
                    {row.line}{' '}
                    <span className="text-gray-400 dark:text-gray-500 font-normal text-sm font-body">
                      · {row.year}
                    </span>
                  </span>
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300 font-body tabular-nums">
                    {row.tons.toLocaleString()} tons/day
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1A3C91] to-[#2EAD32] dark:from-[#4A7DB4] dark:to-[#4ADE80]"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 mt-2 border-t border-slate-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-300 font-body">
                Total annual output
              </span>
              <span className="font-heading font-black text-lg text-[#1A3C91] dark:text-[#4A7DB4]">
                1.5M tons clinker · 2.2M tons cement
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Services */}
      <section className="py-16 bg-slate-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionEyebrow label="Beyond the Plant" />
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-4 text-center tracking-tight">
            Community & Social Responsibility
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 font-body max-w-2xl mx-auto mb-10">
            Mugher Cement is deeply committed to the well‑being of its
            employees and the surrounding community, providing services that
            transform the local area.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-lg transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon icon={FaSchool} className="text-[#1A3C91] dark:text-[#4A7DB4]" />
                </div>
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">
                  Education
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Runs schools from <strong>Kindergarten through Preparatory</strong> in
                Mugher, Tatek, and Derba – serving children of employees and the
                local community.
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
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">
                  Healthcare
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Operates health centers and clinics providing essential medical
                services to workers and nearby residents.
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
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">
                  Housing & Utilities
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Provides fully furnished housing for employees with water,
                electricity, and foreign television channels. A dedicated
                workers' village exists near the factory.
              </p>
            </div>

            {/* Sports */}
            <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-lg transition group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon icon={FaFutbol} className="text-red-600 dark:text-red-400" />
                </div>
                <h3 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">
                  Sports & Recreation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-body">
                Home to a <strong>national‑level football club</strong>, athletics
                teams, and regular tournaments. Produces athletes for
                international competitions and the Olympics.
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
          <SectionEyebrow label="What Drives Us" />
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-10 text-center tracking-tight">
            Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#1A3C91] to-[#1A3C91]/80 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <Icon icon={FaHandsHelping} className="text-4xl mb-4 text-white/90" />
              <h3 className="text-2xl font-heading font-bold mb-3">Our Mission</h3>
              <p className="text-gray-200 font-body leading-relaxed">
                To deliver high‑quality cement products that build lasting
                infrastructure, while fostering sustainable development and
                creating value for our stakeholders, employees, and
                communities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#2EAD32] to-[#2EAD32]/80 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <Icon icon={FaTrophy} className="text-4xl mb-4 text-white/90" />
              <h3 className="text-2xl font-heading font-bold mb-3">Our Vision</h3>
              <p className="text-gray-200 font-body leading-relaxed">
                To become a globally competitive cement producer – producing
                high‑quality cement, ensuring customer satisfaction, and
                promoting clean production, teamwork, and sustainable
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-slate-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionEyebrow label="Leadership" />
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-[#1A3C91] dark:text-white mb-10 text-center tracking-tight">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Ato Tewodros Gebremedhin', role: 'Chief Executive Officer', accent: '#1A3C91' },
              { name: 'W/ro Almaz Desta', role: 'Chief Operating Officer', accent: '#2EAD32' },
              { name: 'Ato Abebe Worku', role: 'Chief Financial Officer', accent: '#1A3C91' },
              { name: 'Engineer Yonas Tefera', role: 'Director of Production', accent: '#2EAD32' },
            ].map((person) => (
              <div
                key={person.name}
                className="bg-white dark:bg-gray-700 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-gray-600 hover:shadow-md transition flex items-center gap-4 border-l-4"
                style={{ borderLeftColor: person.accent }}
              >
                <Icon icon={FaUserTie} className="text-3xl" style={{ color: person.accent }} />
                <div>
                  <h4 className="font-bold text-[#1A3C91] dark:text-white text-lg font-heading">
                    {person.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-body">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts — spec-plate style */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-[#1A3C91] dark:bg-gray-800 p-8 md:p-10 rounded-3xl border-2 border-[#2EAD32]/40 text-white relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon={FaAward} className="text-[#2EAD32] dark:text-[#4ADE80] text-xl" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-300 font-body">
                Plant Facts
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">
              Quick Facts
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-white/90 font-body">
              {[
                { icon: FaMapMarkerAlt, text: 'Located 90 km west of Addis Ababa' },
                { icon: FaCalendarAlt, text: 'Established in 1984' },
                { icon: FaIndustry, text: '3 production lines' },
                { icon: FaBoxes, text: '2.2 million tons of cement per year' },
                { icon: FaUsers, text: 'Over 1,500 employees' },
                { icon: FaFutbol, text: 'Owns a national‑level football club' },
                { icon: FaGraduationCap, text: 'Runs schools from KG to Preparatory' },
                { icon: FaHeart, text: 'Operates health clinics and housing' },
              ].map((fact, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 pb-3 border-b border-white/10 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <Icon icon={fact.icon} className="text-[#2EAD32] dark:text-[#4ADE80] flex-shrink-0" />
                  <span>{fact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
