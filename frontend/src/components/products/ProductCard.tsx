import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={product.image_url || '/placeholder.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-brand">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        <Link
          to={`/products/${product.slug}`}
          className="inline-block mt-3 text-secondary font-medium hover:underline"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}