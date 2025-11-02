import React, { useState } from 'react';
import { FaEnvelope, FaTimes, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/apiClient';

// Alias for backward compatibility
const submitNewsletter = contactAPI.submitNewsletter || contactAPI.subscribeNewsletter;

const NewsletterSignup = ({ variant = 'inline', onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitNewsletter({ email, name: name || undefined });
      setSubmitted(true);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
      setName('');
      
      // Reset after 3 seconds if modal variant
      if (variant === 'modal') {
        setTimeout(() => {
          setSubmitted(false);
          if (onClose) onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Modal variant
  if (variant === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <FaTimes size={20} />
            </button>
          )}

          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Stay Updated!
                </h3>
                <p className="text-gray-600">
                  Subscribe to our newsletter for exclusive offers, beauty tips, and latest updates.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="newsletter-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name (Optional)
                  </label>
                  <input
                    id="newsletter-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-rose text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <div className="spinner-small mr-2"></div>
                      Subscribing...
                    </span>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                You've successfully subscribed to our newsletter.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Inline variant
  return (
    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-6 md:p-8">
      {!submitted ? (
        <>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mr-4">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">Newsletter</h4>
              <p className="text-sm text-gray-600">Stay updated with our latest offers</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-rose text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? '...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center py-4">
          <div className="flex items-center justify-center mb-2">
            <FaCheck className="text-green-600 text-xl mr-2" />
            <span className="text-gray-800 font-semibold">Successfully subscribed!</span>
          </div>
          <p className="text-sm text-gray-600">Thank you for joining our newsletter.</p>
        </div>
      )}
    </div>
  );
};

export default NewsletterSignup;

