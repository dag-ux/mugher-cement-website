export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-secondary text-lg font-bold mb-4">Mugher Cement</h4>
          <p>Building Ethiopia's future with quality cement.</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-secondary"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-secondary"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-secondary"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Products</h5>
          <ul className="space-y-1 text-gray-300">
            <li>Ordinary Portland Cement</li>
            <li>Portland-Pozzolana Cement</li>
            <li>Specialty Grades</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Company</h5>
          <ul className="space-y-1 text-gray-300">
            <li>About</li>
            <li>Leadership</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold mb-2">Contact</h5>
          <p className="text-gray-300">+251 11 123 4567</p>
          <p className="text-gray-300">info@mughercement.com</p>
          <p className="text-gray-300">Addis Ababa, Ethiopia</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Mugher Cement. All rights reserved.
      </div>
    </footer>
  );
}