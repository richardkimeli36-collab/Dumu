export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold mb-4">About Dumu</h3>
          <p className="text-sm">
            Your trusted platform for premium roofing materials and building supplies in Kenya.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Contact</h3>
          <p className="text-sm mb-2">📞 +254 123 456 789</p>
          <p className="text-sm mb-2">📧 info@dumu.co.ke</p>
          <p className="text-sm">📍 Nairobi, Kenya</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-gray-800 mt-8 pt-8 text-center text-sm">
        <p>&copy; 2024 Dumu. All rights reserved.</p>
      </div>
    </footer>
  );
}
