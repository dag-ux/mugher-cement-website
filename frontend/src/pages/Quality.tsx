import { Helmet } from 'react-helmet';

export default function Quality() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Helmet><title>Quality & Sustainability | Mugher Cement</title></Helmet>
      <h1 className="text-4xl font-bold text-brand mb-8">Quality & Sustainability</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-brand mb-3">Commitment to Quality</h2>
          <p className="text-gray-700 leading-relaxed">
            At Mugher Cement, quality is not just a standard – it is our culture. Our manufacturing
            process adheres to international specifications, with rigorous quality control at every
            stage, from raw material selection to final packaging. Our in‑house laboratory is
            equipped with cutting‑edge technology to verify chemical and physical properties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand mb-3">Environmental Responsibility</h2>
          <p className="text-gray-700 leading-relaxed">
            We are committed to sustainable production. We actively invest in technologies that
            minimise emissions, conserve energy, and reduce waste. Our goal is to lower our carbon
            footprint while maintaining exceptional product quality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-brand mb-3">Social Responsibility</h2>
          <p className="text-gray-700 leading-relaxed">
            We believe in giving back to the communities that host us. Mugher Cement supports
            local development projects, education initiatives, and health programmes as part of our
            corporate citizenship. Our employees are our greatest asset, and we invest in their
            well‑being and professional growth.
          </p>
        </section>
      </div>
    </div>
  );
}