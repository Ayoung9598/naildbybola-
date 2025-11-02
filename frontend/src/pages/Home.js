import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaQuoteLeft, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { servicesAPI, testimonialsAPI, galleryAPI } from '../services/apiClient';
import NewsletterSignup from '../components/NewsletterSignup';

const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState([]);
  const [featuredGallery, setFeaturedGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, testimonialsRes, galleryRes] = await Promise.all([
          servicesAPI.getFeatured(),
          testimonialsAPI.getFeatured(),
          galleryAPI.getFeatured()
        ]);

        setFeaturedServices(servicesRes.data.results || servicesRes.data);
        setFeaturedTestimonials(testimonialsRes.data.results || testimonialsRes.data);
        setFeaturedGallery(galleryRes.data.results || galleryRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set mock data for development
        setFeaturedServices([
          {
            id: 1,
            name: 'Classic Manicure',
            price: '35.00',
            duration_minutes: 60,
            description: 'Professional nail care with polish application'
          },
          {
            id: 2,
            name: 'Volume Lash Extensions',
            price: '120.00',
            duration_minutes: 120,
            description: 'Full set of volume lash extensions for dramatic look'
          }
        ]);
        setFeaturedTestimonials([
          {
            id: 1,
            client_name: 'Sarah M.',
            rating: 5,
            review_text: 'Amazing service! My nails look perfect and the lash extensions are gorgeous.',
            service_category: 'both'
          }
        ]);
        setFeaturedGallery([
          {
            id: 1,
            title: 'Beautiful Nail Art',
            image: '/api/placeholder/300/400',
            category: 'nails'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-responsive-xl font-bold mb-6 fade-in">
              Naildby_bola
            </h1>
            <p className="text-responsive-md mb-8 opacity-90 fade-in">
              Professional nail and lash services in a relaxing, modern environment. 
              We're dedicated to making you feel beautiful and confident.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
              <Link
                to="/booking"
                className="btn-gold text-lg px-8 py-4 inline-flex items-center space-x-2"
              >
                <span>Book Appointment</span>
                <FaArrowRight />
              </Link>
              <Link
                to="/gallery"
                className="btn-secondary text-lg px-8 py-4"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
              Our Featured Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional nail and lash services designed to enhance your natural beauty
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <div key={service.id} className="card-gradient p-6 slide-up">
                  <div className="text-center">
                    {service.image ? (
                      service.category === 'both' && service.second_image ? (
                        // Combined service with 2 images side by side
                        <div className="flex justify-center gap-1.5 mb-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden relative shadow-lg">
                            <img 
                              src={service.image} 
                              alt={`${service.name} - Part 1`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-20 h-20 rounded-full overflow-hidden relative shadow-lg">
                            <img 
                              src={service.second_image} 
                              alt={`${service.name} - Part 2`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        // Single image service
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 relative shadow-lg">
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
                          <div className="w-24 h-24 bg-gradient-rose rounded-full hidden items-center justify-center absolute inset-0 service-icon-fallback">
                            <span className="text-white text-2xl font-bold">
                              {service.category === 'nails' ? '💅' : service.category === 'lashes' ? '👁️' : '✨'}
                            </span>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl font-bold">
                          {service.category === 'nails' ? '💅' : service.category === 'lashes' ? '👁️' : '✨'}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-pink-600">
                        ₦{parseFloat(service.price).toLocaleString('en-NG')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.duration_minutes} min
                      </span>
                    </div>
                    <Link
                      to="/booking"
                      className="btn-primary w-full text-center"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>View All Services</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
              Our Latest Work
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the beautiful transformations we create for our clients
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGallery.slice(0, 6).map((image) => (
                <div key={image.id} className="card overflow-hidden slide-up group">
                  <div className="aspect-w-4 aspect-h-5 bg-gray-200">
                    <img
                      src={image.image || '/api/placeholder/400/500'}
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {image.title}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {image.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>View Full Gallery</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card slide-up">
                  <div className="flex items-center mb-4">
                    <div className="star-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <FaQuoteLeft className="text-pink-400 text-2xl mb-2" />
                    <p className="text-gray-700 italic">
                      "{testimonial.review_text}"
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-rose rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.client_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {testimonial.client_name}
                      </p>
                      <p className="text-sm text-gray-600 capitalize">
                        {testimonial.service_category} Services
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="btn-secondary inline-flex items-center space-x-2"
            >
              <span>Read More Reviews</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-16 bg-gradient-blush">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Follow Our Journey
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with our latest work, beauty tips, and special offers
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.tiktok.com/@ibadan.nail.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
            >
              <FaTiktok size={20} />
            </a>
            <a
              href="https://www.instagram.com/ibadan_nailandlashtech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://wa.me/2349021227325"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-responsive-lg font-bold mb-4">
            Ready to Transform Your Look?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience the difference professional nail and lash services can make
          </p>
          <Link
            to="/booking"
            className="btn-gold text-lg px-8 py-4 inline-flex items-center space-x-2"
          >
            <span>Book Your Appointment</span>
            <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Newsletter Modal */}
      {showNewsletter && (
        <NewsletterSignup
          variant="modal"
          onClose={() => setShowNewsletter(false)}
        />
      )}
    </div>
  );
};

export default Home;
