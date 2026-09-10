import { ProductGrid } from '@/components/ProductGrid';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Premium Roofing Materials</h1>
          <p className="text-xl mb-8">Quality corrugated sheets and building supplies for your next project</p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">Featured Products</h2>
        <p className="text-center text-gray-600 mb-12">Explore our extensive catalogue of quality roofing materials</p>
        <ProductGrid limit={12} />
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
              <p className="text-gray-600">All products from verified suppliers</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping across Kenya</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
              <p className="text-gray-600">Direct communication with suppliers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
