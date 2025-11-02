import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaSearch } from 'react-icons/fa';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      category: 'General',
      questions: [
        {
          question: 'What services do you offer?',
          answer: 'We offer a full range of nail and lash services including manicures, pedicures, gel polish, nail art, classic lash extensions, volume lash extensions, lash lifts, and lash tints. We also provide combined packages for clients who want both nail and lash services.'
        },
        {
          question: 'How do I book an appointment?',
          answer: 'You can book an appointment through our online booking system on our website, call us at +234 902 122 7325, or visit our studio in person. We recommend booking in advance as we tend to fill up quickly, especially on weekends.'
        },
        {
          question: 'What are your business hours?',
          answer: 'We are open Monday through Saturday from 9:00 AM to 7:00 PM, and Sunday from 10:00 AM to 5:00 PM. We also offer extended hours by appointment for special occasions.'
        },
        {
          question: 'Do you accept walk-ins?',
          answer: 'While we do accept walk-ins when we have availability, we highly recommend making an appointment to ensure you get the time slot that works best for you. Walk-ins are subject to availability and may require a wait.'
        }
      ]
    },
    {
      category: 'Nail Services',
      questions: [
        {
          question: 'How long does a manicure last?',
          answer: 'A regular manicure typically lasts 1-2 weeks, while a gel manicure can last 2-3 weeks. The longevity depends on your daily activities, nail care routine, and how well you maintain your nails.'
        },
        {
          question: 'Can I bring my own nail polish?',
          answer: 'Yes, absolutely! We welcome clients to bring their own nail polish. However, we do have an extensive collection of high-quality polishes and gel colors for you to choose from.'
        },
        {
          question: 'Do you offer nail art services?',
          answer: 'Yes! We specialize in custom nail art designs. Our talented artists can create everything from simple designs to intricate artwork. Please let us know about your nail art preferences when booking your appointment.'
        },
        {
          question: 'What should I do to prepare for my nail appointment?',
          answer: 'Please arrive with clean, dry nails. Remove any existing polish before your appointment. If you have any nail concerns or allergies, please inform us when booking or upon arrival.'
        }
      ]
    },
    {
      category: 'Lash Services',
      questions: [
        {
          question: 'How long do lash extensions last?',
          answer: 'Lash extensions typically last 3-4 weeks with proper care. We recommend getting fills every 2-3 weeks to maintain the fullness and appearance of your lashes.'
        },
        {
          question: 'Can I wear makeup with lash extensions?',
          answer: 'Yes, but we recommend using oil-free makeup products and avoiding waterproof mascara. We also suggest using a gentle, oil-free makeup remover to avoid damaging the extensions.'
        },
        {
          question: 'What is the difference between classic and volume lashes?',
          answer: 'Classic lashes involve applying one extension per natural lash for a natural look. Volume lashes involve applying multiple thinner extensions per natural lash for a fuller, more dramatic appearance.'
        },
        {
          question: 'How should I care for my lash extensions?',
          answer: 'Avoid getting them wet for the first 24 hours, don\'t rub your eyes, use oil-free products, and brush them gently with a clean spoolie. Avoid sleeping on your face and be gentle when removing makeup.'
        }
      ]
    },
    {
      category: 'Booking & Policies',
      questions: [
        {
          question: 'What is your cancellation policy?',
          answer: 'We require 24 hours notice for cancellations or rescheduling. Cancellations made less than 24 hours in advance may be subject to a cancellation fee. No-shows will be charged the full service amount.'
        },
        {
          question: 'Do you offer gift certificates?',
          answer: 'Yes! We offer gift certificates for all our services. They make perfect gifts for birthdays, holidays, or any special occasion. Gift certificates can be purchased in our studio or online.'
        },
        {
          question: 'What forms of payment do you accept?',
          answer: 'We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), and digital payments like Apple Pay and Google Pay. We also accept Venmo and PayPal.'
        },
        {
          question: 'Do you offer group bookings or parties?',
          answer: 'Yes! We love hosting groups and special events. We can accommodate bridal parties, birthday celebrations, and other group bookings. Please contact us in advance to discuss your needs and availability.'
        }
      ]
    }
  ];

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredFAQData = searchQuery
    ? faqData.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-rose text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-responsive-xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-responsive-md opacity-90 max-w-2xl mx-auto">
            Find answers to common questions about our services, policies, and procedures
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full px-6 py-4 pl-12 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-lg"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {filteredFAQData.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No results found
              </h3>
              <p className="text-gray-500">
                Try searching with different keywords.
              </p>
            </div>
          )}
          {filteredFAQData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {category.category}
              </h2>
              
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openItems[key];
                  
                  return (
                    <div key={questionIndex} className="card">
                      <button
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-pink-50 transition-all duration-300 rounded-lg"
                      >
                        <div className="flex items-center">
                          <FaQuestionCircle className="text-pink-500 mr-3 flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.question}
                          </h3>
                        </div>
                        {isOpen ? (
                          <FaChevronUp className="text-gray-500 flex-shrink-0" />
                        ) : (
                          <FaChevronDown className="text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6 animate-slideUp">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? We're here to help! 
            Contact us directly and we'll be happy to assist you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary text-lg px-8 py-4"
            >
              Contact Us
            </a>
            <a
              href="tel:+2349021227325"
              className="btn-secondary text-lg px-8 py-4"
            >
              Call +234 902 122 7325
            </a>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 bg-gradient-blush">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
              Quick Tips for Your Visit
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Make the most of your appointment with these helpful tips
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⏰</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Arrive Early</h3>
              <p className="text-gray-600 text-sm">
                Come 5-10 minutes early to relax and prepare for your service
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Silence Your Phone</h3>
              <p className="text-gray-600 text-sm">
                Help create a relaxing environment for everyone
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">💬</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Communicate</h3>
              <p className="text-gray-600 text-sm">
                Let us know about any preferences or concerns
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🌟</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Relax & Enjoy</h3>
              <p className="text-gray-600 text-sm">
                Sit back, relax, and let us pamper you
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
