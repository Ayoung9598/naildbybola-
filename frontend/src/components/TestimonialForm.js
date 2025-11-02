import React, { useState } from 'react';
import { FaStar, FaTimes, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { testimonialsAPI } from '../services/apiClient';

const TestimonialForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    client_name: '',
    service_category: 'both',
    rating: 0,
    review_text: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { value: 'nails', label: 'Nail Services' },
    { value: 'lashes', label: 'Lash Services' },
    { value: 'both', label: 'Both Services' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.rating) {
      toast.error('Please select a rating');
      return;
    }

    if (!formData.review_text.trim()) {
      toast.error('Please write a review');
      return;
    }

    setLoading(true);

    try {
      await testimonialsAPI.create(formData);
      setSubmitted(true);
      toast.success('Thank you for your review! It will be reviewed before being published.');
      
      if (onSuccess) onSuccess();
      
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-green-600 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600">
            Your review has been submitted and will be reviewed before being published.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-slideUp max-h-[90vh] overflow-y-auto">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <FaTimes size={20} />
          </button>
        )}

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⭐</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Share Your Experience
          </h3>
          <p className="text-gray-600">
            We'd love to hear about your experience with our services!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Category *
            </label>
            <select
              name="service_category"
              value={formData.service_category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <FaStar
                    className={`text-3xl ${
                      star <= (hoveredStar || formData.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {formData.rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {formData.rating} star{formData.rating !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review *
            </label>
            <textarea
              name="review_text"
              value={formData.review_text}
              onChange={handleInputChange}
              placeholder="Tell us about your experience..."
              rows={5}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-vertical"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !formData.rating}
            className="w-full bg-gradient-rose text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="spinner-small mr-2"></div>
                Submitting...
              </span>
            ) : (
              'Submit Review'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;

