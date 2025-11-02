const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Services
  SERVICES: `${API_BASE_URL}/services/`,
  
  // Booking
  BOOKING: `${API_BASE_URL}/booking/`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/contact/`,
  NEWSLETTER: `${API_BASE_URL}/newsletter/`,
  
  // Testimonials
  TESTIMONIALS: `${API_BASE_URL}/testimonials/`,
  
  // Gallery
  GALLERY: `${API_BASE_URL}/gallery/`,
};

export default API_ENDPOINTS;
