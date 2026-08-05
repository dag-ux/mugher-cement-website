import { Helmet } from 'react-helmet';

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <Helmet>
        <title>About Us | Mugher Cement</title>
        <meta
          name="description"
          content="Mugher Cement Enterprise – Ethiopia's pioneer state‑owned cement manufacturer since 1984. Quality OPC & PPC cement for all infrastructure projects."
        />
      </Helmet>

      {/* Hero Image – Factory aerial */}
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-300 rounded-2xl overflow-hidden shadow-xl mb-10">
        <img
          src="https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Mugher Cement Factory"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://via.placeholder.com/1200x400?text=Mugher+Cement+Factory';
          }}
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-[#1A3C91] mb-6 tracking-wide">
        About Mugher Cement Enterprise
      </h1>

      <div className="space-y-12">
        {/* Introduction */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-lg text-gray-700 leading-relaxed font-body">
            Mugher Cement Enterprise is Ethiopia's pioneer and largest state‑owned cement manufacturer,
            established in <strong>1984</strong> during the Derg military regime. Built by an East German
            company near the Mugher River, about <strong>90 km west of Addis Ababa</strong>, the plant
            started with a capacity of 300,000 tons of clinker per year.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-body mt-4">
            Today, it remains a vital pillar of the domestic construction industry, supplying
            <strong> Ordinary Portland Cement (OPC)</strong> and{' '}
            <strong>Portland Pozzolana Cement (PPC)</strong> for mega‑projects, bridges, and
            residential developments across Ethiopia.
          </p>
        </section>

        {/* History Timeline */}
        <section>
          <h2 className="text-3xl font-heading font-extrabold text-[#1A3C91] mb-6 tracking-wide">
            Our History & Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="border-l-4 border-[#2EAD32] pl-4 hover:border-[#1A3C91] transition-colors">
                <h3 className="font-bold text-[#1A3C91] text-lg">1984 – Founding</h3>
                <p className="text-gray-600 text-sm font-body">
                  Plant construction completed by East German engineers in Mekoda (Oromia region),
                  launching production with a 300,000‑ton yearly capacity.
                </p>
              </div>
              <div className="border-l-4 border-[#2EAD32] pl-4 hover:border-[#1A3C91] transition-colors">
                <h3 className="font-bold text-[#1A3C91] text-lg">1990 – Expansion</h3>
                <p className="text-gray-600 text-sm font-body">
                  Production capacity doubled to 600,000 tons per year with the addition of a
                  second production line.
                </p>
              </div>
              <div className="border-l-4 border-[#2EAD32] pl-4 hover:border-[#1A3C91] transition-colors">
                <h3 className="font-bold text-[#1A3C91] text-lg">1999 – Reorganisation</h3>
                <p className="text-gray-600 text-sm font-body">
                  Merged with the Addis Ababa Cement Factory to form Mugher Cement Enterprise,
                  with an authorised capital of over 334 million birr.
                </p>
              </div>
              <div className="border-l-4 border-[#2EAD32] pl-4 hover:border-[#1A3C91] transition-colors">
                <h3 className="font-bold text-[#1A3C91] text-lg">2011 – Major Upgrade</h3>
                <p className="text-gray-600 text-sm font-body">
                  A third production line, built by China's Sinoma, significantly increased total
                  output and modernised the plant.
                </p>
              </div>
              <div className="border-l-4 border-[#2EAD32] pl-4 hover:border-[#1A3C91] transition-colors">
                <h3 className="font-bold text-[#1A3C91] text-lg">Today</h3>
                <p className="text-gray-600 text-sm font-body">
                  Managed under the Chemical Industry Corporation, supplying OPC and PPC cement
                  critical to Ethiopian infrastructure.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Construction and growth"
                className="w-full max-h-72 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/600x400?text=History+Timeline';
                }}
              />
            </div>
          </div>
        </section>

        {/* Production Capacity */}
        <section>
          <h2 className="text-3xl font-heading font-extrabold text-[#1A3C91] mb-6 tracking-wide">
            Production Capacity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-[#2EAD32] hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#1A3C91] text-lg">Line 1</h3>
              <p className="text-gray-600">1984 – 1,000 tons/day</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-[#2EAD32] hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#1A3C91] text-lg">Line 2</h3>
              <p className="text-gray-600">1990 – 1,000 tons/day</p>
            </div>
            <div className="bg-gray-50 p-5 rounded-xl border-l-4 border-[#2EAD32] hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#1A3C91] text-lg">Line 3</h3>
              <p className="text-gray-600">2012 – 3,000 tons/day</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-[#1A3C91]/5 rounded-xl border border-[#1A3C91]/20">
            <p className="text-gray-700 font-body">
              <strong className="text-[#1A3C91]">Total annual production:</strong>{' '}
              1.5 million tons of clinker, 2.2 million tons of cement.
            </p>
          </div>
        </section>

        {/* Community Services – Expanded */}
        <section>
          <h2 className="text-3xl font-heading font-extrabold text-[#1A3C91] mb-6 tracking-wide">
            Community & Social Responsibility
          </h2>
          <p className="text-gray-700 leading-relaxed font-body mb-6">
            Mugher Cement is deeply committed to the well‑being of its employees and the surrounding
            community. Beyond cement production, the enterprise provides a wide range of services
            that have transformed the local area into a vibrant community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-[#1A3C91]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1A3C91] text-lg">Education</h3>
              </div>
              <p className="text-gray-600 text-sm font-body">
                Runs schools from <strong>Kindergarten through Preparatory</strong> in Mugher,
                Tatek, and Derba – serving children of employees and the local community.
              </p>
            </div>

            {/* Healthcare */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-[#2EAD32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 4h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1A3C91] text-lg">Healthcare</h3>
              </div>
              <p className="text-gray-600 text-sm font-body">
                Operates health centers and clinics of varying levels, providing essential
                medical services to workers and nearby residents.
              </p>
            </div>

            {/* Housing & Utilities */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1A3C91] text-lg">Housing & Utilities</h3>
              </div>
              <p className="text-gray-600 text-sm font-body">
                Provides fully furnished housing for employees, complete with water,
                electricity, and even foreign television channels. A dedicated workers'
                village exists near the factory.
              </p>
            </div>

            {/* Sports & Recreation */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1A3C91] text-lg">Sports & Recreation</h3>
              </div>
              <p className="text-gray-600 text-sm font-body">
                Home to a <strong>national‑level football club</strong> (Mugher Football Club),
                athletics teams, and regular table tennis and volleyball tournaments. The
                factory produces athletes for international competitions and the Olympics.
              </p>
            </div>
          </div>

          {/* Image placeholder for community */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="School"
              className="w-full h-32 object-cover rounded-xl shadow hover:shadow-lg transition-shadow"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=School'}
            />
            <img
              src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Healthcare"
              className="w-full h-32 object-cover rounded-xl shadow hover:shadow-lg transition-shadow"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Health'}
            />
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Housing"
              className="w-full h-32 object-cover rounded-xl shadow hover:shadow-lg transition-shadow"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Housing'}
            />
            <img
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
              alt="Football"
              className="w-full h-32 object-cover rounded-xl shadow hover:shadow-lg transition-shadow"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Football'}
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section>
          <h2 className="text-3xl font-heading font-extrabold text-[#1A3C91] mb-6 tracking-wide">
            Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border-l-4 border-[#2EAD32] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#1A3C91] text-xl font-heading mb-2">Our Mission</h3>
              <p className="text-gray-700 font-body leading-relaxed">
                To deliver high‑quality cement products that build lasting infrastructure, while
                fostering sustainable development and creating value for our stakeholders,
                employees, and communities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border-l-4 border-[#2EAD32] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#1A3C91] text-xl font-heading mb-2">Our Vision</h3>
              <p className="text-gray-700 font-body leading-relaxed">
                To become a globally competitive cement producer – producing high‑quality cement,
                ensuring customer satisfaction, and promoting clean production, teamwork, and
                sustainable development.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section>
          <h2 className="text-3xl font-heading font-extrabold text-[#1A3C91] mb-6 tracking-wide">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <h4 className="font-bold text-[#1A3C91] text-lg font-heading">Ato Tewodros Gebremedhin</h4>
              <p className="text-sm text-gray-600 font-body">Chief Executive Officer</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <h4 className="font-bold text-[#1A3C91] text-lg font-heading">W/ro Almaz Desta</h4>
              <p className="text-sm text-gray-600 font-body">Chief Operating Officer</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <h4 className="font-bold text-[#1A3C91] text-lg font-heading">Ato Abebe Worku</h4>
              <p className="text-sm text-gray-600 font-body">Chief Financial Officer</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <h4 className="font-bold text-[#1A3C91] text-lg font-heading">Engineer Yonas Tefera</h4>
              <p className="text-sm text-gray-600 font-body">Director of Production</p>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="bg-[#1A3C91]/5 p-6 rounded-2xl border border-[#1A3C91]/20">
          <h2 className="text-2xl font-heading font-bold text-[#1A3C91] mb-3">Quick Facts</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 font-body text-sm">
            <li>📍 Located 90 km west of Addis Ababa</li>
            <li>🏗️ Established in 1984</li>
            <li>🏭 3 production lines</li>
            <li>📦 2.2 million tons of cement per year</li>
            <li>👥 Over 1,500 employees</li>
            <li>⚽ Owns a national‑level football club</li>
            <li>🏫 Runs schools from KG to Preparatory</li>
            <li>🏥 Operates health clinics and housing</li>
          </ul>
        </section>
      </div>
    </div>
  );
}