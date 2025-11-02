import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaArrowRight, FaStar } from 'react-icons/fa';
import { servicesAPI } from '../services/apiClient';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        setServices(response.data.results || response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Mock data for development
        setServices([
          {
            id: 1,
            name: 'Classic Manicure',
            category: 'nails',
            price: '35.00',
            duration_minutes: 60,
            description: 'Professional nail care including cuticle work, shaping, and polish application.',
            is_featured: true
          },
          {
            id: 2,
            name: 'Gel Manicure',
            category: 'nails',
            price: '45.00',
            duration_minutes: 75,
            description: 'Long-lasting gel polish manicure with extended wear time.',
            is_featured: true
          },
          {
            id: 3,
            name: 'Pedicure',
            category: 'nails',
            price: '50.00',
            duration_minutes: 90,
            description: 'Complete foot care including exfoliation, massage, and polish.',
            is_featured: false
          },
          {
            id: 4,
            name: 'Nail Art Design',
            category: 'nails',
            price: '25.00',
            duration_minutes: 30,
            description: 'Custom nail art designs to express your unique style.',
            is_featured: false
          },
          {
            id: 5,
            name: 'Classic Lash Extensions',
            category: 'lashes',
            price: '80.00',
            duration_minutes: 90,
            description: 'Natural-looking lash extensions for everyday glamour.',
            is_featured: true
          },
          {
            id: 6,
            name: 'Volume Lash Extensions',
            category: 'lashes',
            price: '120.00',
            duration_minutes: 120,
            description: 'Full, dramatic volume lash extensions for maximum impact.',
            is_featured: true
          },
          {
            id: 7,
            name: 'Lash Lift & Tint',
            category: 'lashes',
            price: '65.00',
            duration_minutes: 60,
            description: 'Enhance your natural lashes with lift and tint treatment.',
            is_featured: false
          },
          {
            id: 8,
            name: 'Lash Fill',
            category: 'lashes',
            price: '45.00',
            duration_minutes: 60,
            description: 'Maintenance fill for existing lash extensions.',
            is_featured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'nails', label: 'Nail Services' },
    { value: 'lashes', label: 'Lash Services' },
    { value: 'both', label: 'Combined Services' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'nails':
        return '💅';
      case 'lashes':
        return '👁️';
      case 'both':
        return '✨';
      default:
        return '💫';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'nails':
        return 'from-pink-500 to-rose-500';
      case 'lashes':
        return 'from-purple-500 to-indigo-500';
      case 'both':
        return 'from-yellow-400 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-rose text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-responsive-xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-responsive-md opacity-90 max-w-2xl mx-auto">
            Professional nail and lash services designed to enhance your natural beauty. 
            Choose from our range of treatments tailored to your needs.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div key={service.id} className="card-gradient p-6 group hover:scale-105 transition-all duration-300 slide-up" style={{ animationDelay: `${filteredServices.indexOf(service) * 50}ms` }}>
                  {/* Service Header */}
                  <div className="text-center mb-6">
                    {service.image ? (
                      service.category === 'both' && service.second_image ? (
                        // Combined service with 2 images side by side
                        <div className="flex justify-center gap-2 mb-4 group-hover:scale-105 transition-transform duration-300">
                          <div className="w-32 h-32 rounded-full overflow-hidden relative shadow-lg">
                            <img 
                              src={service.image} 
                              alt={`${service.name} - Part 1`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="w-32 h-32 rounded-full overflow-hidden relative shadow-lg">
                            <img 
                              src={service.second_image} 
                              alt={`${service.name} - Part 2`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        // Single image service
                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 relative shadow-lg">
                          <img 
                            src={service.image} 
                            alt={service.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const parent = e.target.parentElement;
                              e.target.style.display = 'none';
                              const fallback = parent.querySelector('.service-icon-fallback');
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div className={`w-32 h-32 bg-gradient-to-r ${getCategoryColor(service.category)} rounded-full hidden items-center justify-center absolute inset-0 service-icon-fallback`}>
                            <span className="text-white text-3xl">
                              {getCategoryIcon(service.category)}
                            </span>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className={`w-20 h-20 bg-gradient-to-r ${getCategoryColor(service.category)} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white text-3xl">
                          {getCategoryIcon(service.category)}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {service.name}
                    </h3>
                    {service.is_featured && (
                      <div className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                        <FaStar className="text-xs" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Service Details */}
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="flex justify-between items-center py-3 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaClock className="text-sm" />
                        <span className="text-sm">{service.duration_minutes} minutes</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-pink-600">
                          ₦{parseFloat(service.price).toLocaleString('en-NG')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    to="/booking"
                    state={{ selectedService: service }}
                    className="btn-primary w-full text-center block"
                  >
                    Book This Service
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* No Services Message */}
          {!loading && filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No services found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category or check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Service Categories Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
              Service Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn more about our different service categories and what makes each one special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Nail Services */}
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Nail Services
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Professional nail care including manicures, pedicures, gel polish, and custom nail art designs.
              </p>
            </div>

            {/* Lash Services */}
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Lash Services
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Beautiful lash extensions, lifts, tints, and maintenance services for stunning eyes.
              </p>
            </div>

            {/* Combined Services */}
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Combined Services
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Complete beauty packages combining nail and lash services for the ultimate pampering experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-16 bg-gradient-blush">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Ready to Book Your Service?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose your preferred service and book an appointment that fits your schedule
          </p>
          <Link
            to="/booking"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
          >
            <span>Book Appointment</span>
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
