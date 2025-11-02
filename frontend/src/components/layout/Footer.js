import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTiktok } from 'react-icons/fa';
import NewsletterSignup from '../NewsletterSignup';

const Footer = () => {

  const quickLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Booking', href: '/booking' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    { name: 'Manicures', href: '/services#manicures' },
    { name: 'Pedicures', href: '/services#pedicures' },
    { name: 'Nail Art', href: '/services#nail-art' },
    { name: 'Classic Lashes', href: '/services#classic-lashes' },
    { name: 'Volume Lashes', href: '/services#volume-lashes' },
    { name: 'Lash Extensions', href: '/services#lash-extensions' },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: FaInstagram, href: 'https://www.instagram.com/ibadan_nailandlashtech' },
    { name: 'TikTok', icon: FaTiktok, href: 'https://www.tiktok.com/@ibadan.nail.tech' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-rose rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">💅</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Naildby_bola</h3>
                <p className="text-sm text-gray-400">Professional Nail & Lash Services</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional nail and lash services in a relaxing, modern environment. 
              We're dedicated to making you feel beautiful and confident.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-pink-400" />
                <a href="tel:+2349021227325" className="text-gray-300 text-sm hover:text-white">+234 902 122 7325</a>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-pink-400" />
                <a href="mailto:oladunnimariam32@gmail.com" className="text-gray-300 text-sm hover:text-white">oladunnimariam32@gmail.com</a>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-pink-400 mt-1" />
                <span className="text-gray-300 text-sm">
                  06, Akin Akinyemi Str<br />
                  Ikolaba Main Estate
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-pink-400 mb-4">Stay Updated</h5>
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-pink-400 mb-2">Business Hours</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <span className="font-medium">Monday - Saturday:</span> 9:00 AM - 7:00 PM
              </div>
              <div>
                <span className="font-medium">Sunday:</span> 10:00 AM - 5:00 PM
              </div>
              <div>
                <span className="font-medium">Location:</span> Ikolaba Main Estate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-4 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Naildby_bola. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
