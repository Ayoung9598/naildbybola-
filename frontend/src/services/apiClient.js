import axios from 'axios';
import API_ENDPOINTS from './api';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// Services API
export const servicesAPI = {
  getAll: () => api.get(API_ENDPOINTS.SERVICES),
  getByCategory: (category) => api.get(`${API_ENDPOINTS.SERVICES}?category=${category}`),
  getFeatured: () => api.get(`${API_ENDPOINTS.SERVICES}?is_featured=true`),
};

// Booking API
export const bookingAPI = {
  create: (bookingData) => api.post(API_ENDPOINTS.BOOKING, bookingData),
  getAll: () => api.get(API_ENDPOINTS.BOOKING),
  confirm: (id) => api.post(`${API_ENDPOINTS.BOOKING}${id}/confirm/`),
};

// Contact API
export const contactAPI = {
  sendMessage: (messageData) => api.post(API_ENDPOINTS.CONTACT, messageData),
  subscribeNewsletter: (subscriberData) => api.post(API_ENDPOINTS.NEWSLETTER, subscriberData),
  submitNewsletter: (subscriberData) => api.post(API_ENDPOINTS.NEWSLETTER, subscriberData),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get(API_ENDPOINTS.TESTIMONIALS),
  getFeatured: () => api.get(`${API_ENDPOINTS.TESTIMONIALS}?is_featured=true`),
  getByCategory: (category) => api.get(`${API_ENDPOINTS.TESTIMONIALS}?service_category=${category}`),
  create: (testimonialData) => api.post(API_ENDPOINTS.TESTIMONIALS, testimonialData),
};

// Gallery API
export const galleryAPI = {
  getAll: () => api.get(API_ENDPOINTS.GALLERY),
  getByCategory: (category) => api.get(`${API_ENDPOINTS.GALLERY}?category=${category}`),
  getFeatured: () => api.get(`${API_ENDPOINTS.GALLERY}?is_featured=true`),
};

export default api;
