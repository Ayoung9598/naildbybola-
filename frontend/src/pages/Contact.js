import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { contactAPI } from '../services/apiClient';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject_type: 'general',
    subject: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const subjectTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Booking Question' },
    { value: 'pricing', label: 'Pricing Information' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'compliment', label: 'Compliment' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.sendMessage(formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject_type: 'general',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await contactAPI.subscribeNewsletter({ email: newsletterEmail });
      toast.success('Successfully subscribed to our newsletter!');
      setNewsletterEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-rose text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-responsive-xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-responsive-md opacity-90 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mr-4">
                    <FaPhone className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">Call us directly</p>
                  </div>
                </div>
                <a href="tel:+2349021227325" className="text-gray-700 font-medium hover:text-pink-600">+234 902 122 7325</a>
              </div>

              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mr-4">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">Send us an email</p>
                  </div>
                </div>
                <a href="mailto:oladunnimariam32@gmail.com" className="text-gray-700 font-medium hover:text-pink-600">oladunnimariam32@gmail.com</a>
              </div>

              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mr-4">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Location</h3>
                    <p className="text-gray-600">Visit our studio</p>
                  </div>
                </div>
                <p className="text-gray-700 font-medium">
                  06, Akin Akinyemi Str<br />
                  Ikolaba Main Estate
                </p>
              </div>

              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mr-4">
                    <FaClock className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Hours</h3>
                    <p className="text-gray-600">Our business hours</p>
                  </div>
                </div>
                <div className="text-gray-700 space-y-1">
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mr-4">
                    <FaWhatsapp className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">WhatsApp</h3>
                    <p className="text-gray-600">Chat with us</p>
                  </div>
                </div>
                <a 
                  href="https://wa.me/2349021227325" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 font-medium hover:text-pink-600 inline-flex items-center space-x-2"
                >
                  <span>+234 902 122 7325</span>
                  <FaWhatsapp className="text-green-500" />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject Type *
                      </label>
                      <select
                        name="subject_type"
                        value={formData.subject_type}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                      >
                        {subjectTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="form-textarea"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="spinner"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-blush">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for beauty tips, special offers, and the latest updates
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 bg-white"
                required
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
              Find Us
            </h2>
            <p className="text-gray-600">
              Visit our beautiful studio located in the heart of the city
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FaMapMarkerAlt size={48} className="mx-auto mb-4" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">06, Akin Akinyemi Str, Ikolaba Main Estate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
