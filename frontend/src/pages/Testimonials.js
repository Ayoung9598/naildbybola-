import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { testimonialsAPI } from '../services/apiClient';
import TestimonialForm from '../components/TestimonialForm';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const categories = [
    { value: 'all', label: 'All Reviews' },
    { value: 'nails', label: 'Nail Services' },
    { value: 'lashes', label: 'Lash Services' },
    { value: 'both', label: 'Combined Services' }
  ];

  const fetchTestimonials = async () => {
      try {
        const response = await testimonialsAPI.getAll();
        const testimonialData = response.data.results || response.data;
        setTestimonials(testimonialData);
        setFilteredTestimonials(testimonialData);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Mock data for development
        const mockTestimonials = [
          {
            id: 1,
            client_name: 'Sarah M.',
            rating: 5,
            review_text: 'Amazing service! My nails look perfect and the lash extensions are gorgeous. Sarah is so talented and professional.',
            service_category: 'both',
            is_featured: true
          },
          {
            id: 2,
            client_name: 'Jessica L.',
            rating: 5,
            review_text: 'Best nail art I\'ve ever had! The attention to detail is incredible. I get compliments everywhere I go.',
            service_category: 'nails',
            is_featured: true
          },
          {
            id: 3,
            client_name: 'Maria R.',
            rating: 5,
            review_text: 'My lash extensions look so natural and beautiful. The studio is clean and relaxing. Highly recommend!',
            service_category: 'lashes',
            is_featured: false
          },
          {
            id: 4,
            client_name: 'Emily K.',
            rating: 5,
            review_text: 'Professional, friendly, and talented. My manicure lasted weeks and still looked perfect. Will definitely be back!',
            service_category: 'nails',
            is_featured: false
          },
          {
            id: 5,
            client_name: 'Ashley T.',
            rating: 5,
            review_text: 'The volume lashes are stunning! Sarah really knows how to enhance your natural beauty. Love this place!',
            service_category: 'lashes',
            is_featured: true
          },
          {
            id: 6,
            client_name: 'Rachel D.',
            rating: 5,
            review_text: 'Outstanding service from start to finish. The studio is beautiful and the results exceeded my expectations.',
            service_category: 'both',
            is_featured: false
          }
        ];
        setTestimonials(mockTestimonials);
        setFilteredTestimonials(mockTestimonials);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredTestimonials(testimonials);
    } else {
      setFilteredTestimonials(testimonials.filter(testimonial => testimonial.service_category === selectedCategory));
    }
    setCurrentSlide(0);
  }, [selectedCategory, testimonials]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredTestimonials.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredTestimonials.length / 3)) % Math.ceil(filteredTestimonials.length / 3));
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'nails':
        return 'bg-pink-100 text-pink-800';
      case 'lashes':
        return 'bg-purple-100 text-purple-800';
      case 'both':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-rose text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-responsive-xl font-bold mb-4">
            Client Testimonials
          </h1>
          <p className="text-responsive-md opacity-90 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients about their experiences
          </p>
        </div>
      </section>

      {/* Filter Section */}
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

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {/* Desktop Grid View */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTestimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card">
                      <div className="flex items-center justify-between mb-4">
                        <div className="star-rating">
                          {renderStars(testimonial.rating)}
                        </div>
                        {testimonial.is_featured && (
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <FaQuoteLeft className="text-pink-400 text-2xl mb-3" />
                        <p className="text-gray-700 italic leading-relaxed">
                          "{testimonial.review_text}"
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
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
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(testimonial.service_category)}`}>
                              {testimonial.service_category} Services
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Carousel View */}
              <div className="lg:hidden">
                <div className="relative">
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {Array.from({ length: Math.ceil(filteredTestimonials.length / 1) }, (_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                          <div className="space-y-6">
                            {filteredTestimonials.slice(slideIndex * 1, (slideIndex + 1) * 1).map((testimonial) => (
                              <div key={testimonial.id} className="testimonial-card">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="star-rating">
                                    {renderStars(testimonial.rating)}
                                  </div>
                                  {testimonial.is_featured && (
                                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                      Featured
                                    </span>
                                  )}
                                </div>
                                
                                <div className="mb-4">
                                  <FaQuoteLeft className="text-pink-400 text-2xl mb-3" />
                                  <p className="text-gray-700 italic leading-relaxed">
                                    "{testimonial.review_text}"
                                  </p>
                                </div>
                                
                                <div className="flex items-center justify-between">
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
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(testimonial.service_category)}`}>
                                        {testimonial.service_category} Services
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Carousel Controls */}
                  {filteredTestimonials.length > 1 && (
                    <div className="flex justify-center mt-8 space-x-4">
                      <button
                        onClick={prevSlide}
                        className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                      >
                        <FaChevronLeft className="text-gray-600" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                      >
                        <FaChevronRight className="text-gray-600" />
                      </button>
                    </div>
                  )}
                  
                  {/* Dots Indicator */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: Math.ceil(filteredTestimonials.length / 1) }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          index === currentSlide ? 'bg-pink-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* No Testimonials Message */}
          {!loading && filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No testimonials found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category or check back later for new reviews.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Average Rating */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-8">
            Overall Client Satisfaction
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-blush rounded-xl p-8">
              <div className="text-6xl font-bold text-pink-600 mb-4">5.0</div>
              <div className="flex justify-center mb-4">
                {renderStars(5)}
              </div>
              <p className="text-gray-700 text-lg mb-2">
                Based on {testimonials.length} client reviews
              </p>
              <p className="text-gray-600">
                We're proud to maintain a perfect 5-star rating from our satisfied clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-blush">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Ready to Experience Our Services?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join our satisfied clients and discover why we're the top choice for nail and lash services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Share Your Experience
            </button>
            <a
              href="/booking"
              className="btn-secondary text-lg px-8 py-4 text-center"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial Form Modal */}
      {showForm && (
        <TestimonialForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            // Refresh testimonials after submission
            fetchTestimonials();
          }}
        />
      )}
    </div>
  );
};

export default Testimonials;
