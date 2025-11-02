import React from 'react';
import { FaHeart, FaStar, FaQuoteLeft, FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: FaHeart,
      title: 'Passion for Beauty',
      description: 'We believe everyone deserves to feel beautiful and confident in their own skin.'
    },
    {
      icon: FaStar,
      title: 'Quality Service',
      description: 'We use only the highest quality products and techniques to ensure the best results.'
    },
    {
      icon: FaStar,
      title: 'Professional Excellence',
      description: 'Our team is highly trained and continuously educated on the latest beauty trends.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-rose text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-responsive-xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-responsive-md opacity-90 max-w-2xl mx-auto">
            Meet the passionate professionals behind Naildby_bola
          </p>
        </div>
      </section>

      {/* Owner Bio */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-80 h-80 bg-gradient-rose rounded-full mx-auto lg:mx-0 flex items-center justify-center">
                  <span className="text-white text-6xl">👩‍💼</span>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Welcome to Naildby_bola
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Welcome to Naildby_bola! We are your premier destination for luxury nail art and 
                    stunning lash extensions. With years of experience in the beauty industry, we've 
                    dedicated our craft to helping clients feel confident and beautiful.
                  </p>
                  <p>
                    Our journey began with a passion for nail art and evolved into specializing in lash 
                    extensions. We continue to stay updated with the latest techniques and trends to provide 
                    you with the best possible service.
                  </p>
                  <p>
                    At Naildby_bola, we believe that beauty is about enhancing your natural features 
                    and making you feel amazing. Every service is performed with care, attention to 
                    detail, and a commitment to your satisfaction.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <FaMapMarkerAlt className="text-pink-600" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-gray-800 font-medium">06, Akin Akinyemi Str<br />Ikolaba Main Estate</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPhone className="text-pink-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a href="tel:+2349021227325" className="text-gray-800 font-medium hover:text-pink-600">+234 902 122 7325</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-pink-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href="mailto:oladunnimariam32@gmail.com" className="text-gray-800 font-medium hover:text-pink-600">oladunnimariam32@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <a href="https://www.instagram.com/ibadan_nailandlashtech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-rose rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all">
                        <FaInstagram size={18} />
                      </a>
                      <a href="https://www.tiktok.com/@ibadan.nail.tech" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-rose rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all">
                        <FaTiktok size={18} />
                      </a>
                      <a href="https://wa.me/2349021227325" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all">
                        <FaWhatsapp size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Naildby_bola
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="card-gradient p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Studio Story */}
      <section className="py-16 bg-gradient-blush">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-8">
              Our Studio Story
            </h2>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <FaQuoteLeft className="text-pink-400 text-3xl mx-auto mb-4" />
              </div>
              
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "Naildby_bola was born from a simple dream: to create a space where 
                every client feels pampered, beautiful, and confident. We believe that beauty 
                services should be more than just treatments – they should be experiences that 
                uplift and inspire."
              </blockquote>
              
              <div className="text-gray-600">
                <p className="mb-4">
                  Our studio is designed with your comfort in mind, featuring modern amenities, 
                  relaxing ambiance, and a welcoming atmosphere. We use only premium products 
                  and the latest techniques to ensure you receive the best possible service.
                </p>
                <p>
                  Whether you're here for a quick manicure or a full lash transformation, 
                  we're committed to making your visit memorable and leaving you feeling 
                  absolutely beautiful.
                </p>
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-semibold text-gray-700">Monday - Saturday</p>
                    <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Sunday</p>
                    <p className="text-gray-600">10:00 AM - 5:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Location</p>
                    <p className="text-gray-600">Ikolaba Main Estate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-responsive-lg font-bold text-gray-800 mb-4">
              Why Choose Naildby_bola?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes us the preferred choice for beauty services in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Award-Winning Service
              </h3>
              <p className="text-gray-600 text-sm">
                Recognized for excellence in customer service and quality
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Premium Products
              </h3>
              <p className="text-gray-600 text-sm">
                We use only the highest quality, professional-grade products
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Personalized Care
              </h3>
              <p className="text-gray-600 text-sm">
                Every service is tailored to your unique needs and preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🕒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Flexible Scheduling
              </h3>
              <p className="text-gray-600 text-sm">
                Convenient appointment times to fit your busy lifestyle
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
