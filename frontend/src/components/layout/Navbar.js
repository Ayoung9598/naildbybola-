import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Booking', href: '/booking' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-rose text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-sm" />
                <a href="tel:+2349021227325" className="hover:underline">+234 902 122 7325</a>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-sm" />
                <a href="mailto:oladunnimariam32@gmail.com" className="hover:underline">oladunnimariam32@gmail.com</a>
              </div>
            </div>
          <div className="text-sm">
            Mon-Sat: 9AM-7PM | Sun: 10AM-5PM
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-rose rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">💅</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">Naildby_bola</h1>
                <p className="text-xs text-gray-600">Professional Nail & Lash Services</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-pink-600 border-b-2 border-pink-600 pb-1'
                      : 'text-gray-700 hover:text-pink-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/booking"
                className="btn-primary"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-gray-100 transition-colors duration-300"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium transition-all duration-300 transform ${
                      isActive(item.href)
                        ? 'text-pink-600 translate-x-2'
                        : 'text-gray-700 hover:text-pink-600 hover:translate-x-2'
                    }`}
                    style={{
                      animationDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link
                    to="/booking"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full text-center block"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
