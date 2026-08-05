export default function Hero() {
  return (
    <section
      className="relative h-screen min-h-[600px] max-h-[800px] flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url('/images1.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="container mx-auto px-6 text-white relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Quality Cement for <br />
            <span className="text-secondary">Strong Foundations</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Mugher Cement – trusted by engineers and builders across Ethiopia for over three decades.
          </p>
          <a
            href="#products"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition shadow-lg"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </section>
  );
}