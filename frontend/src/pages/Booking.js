import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from 'react-calendar';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaCheck } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { bookingAPI, servicesAPI } from '../services/apiClient';

const Booking = () => {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        setServices(response.data.results || response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Mock data for development
        setServices([
          {
            id: 1,
            name: 'Classic Manicure',
            price: '35.00',
            duration_minutes: 60,
            category: 'nails'
          },
          {
            id: 2,
            name: 'Volume Lash Extensions',
            price: '120.00',
            duration_minutes: 120,
            category: 'lashes'
          }
        ]);
      }
    };

    fetchServices();

    // Set preselected service if coming from services page
    if (location.state?.selectedService) {
      setSelectedService(location.state.selectedService);
      setStep(2);
    }
  }, [location.state]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep(3);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(4);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        service_id: selectedService.id,
        preferred_date: selectedDate.toISOString().split('T')[0],
        preferred_time: selectedTime,
        ...formData
      };

      await bookingAPI.create(bookingData);
      toast.success('Booking request submitted successfully! We\'ll contact you soon to confirm.');
      setStep(5);
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-rose text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-responsive-xl font-bold mb-4">
            Book Your Appointment
          </h1>
          <p className="text-responsive-md opacity-90 max-w-2xl mx-auto">
            Schedule your nail and lash services with our professional team. 
            Choose your service, pick a date and time, and we'll take care of the rest.
          </p>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= stepNumber 
                      ? 'bg-pink-600 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-20 h-1 mx-2 ${
                      step > stepNumber ? 'bg-pink-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <span>Service</span>
              <span>Date</span>
              <span>Time</span>
              <span>Details</span>
            </div>
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Choose Your Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-pink-500 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-center">
                      {service.image ? (
                        service.category === 'both' && service.second_image ? (
                          // Combined service with 2 images side by side
                          <div className="flex justify-center gap-2 mb-4">
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
                              <span className="text-white text-2xl">
                                {service.category === 'nails' ? '💅' : service.category === 'lashes' ? '👁️' : '✨'}
                              </span>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="w-16 h-16 bg-gradient-rose rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">
                            {service.category === 'nails' ? '💅' : service.category === 'lashes' ? '👁️' : '✨'}
                          </span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        {service.duration_minutes} minutes
                      </p>
                      <div className="text-2xl font-bold text-pink-600 mb-4">
                        ₦{parseFloat(service.price).toLocaleString('en-NG')}
                      </div>
                      <button className="btn-primary w-full">
                        Select This Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date Selection */}
          {step === 2 && selectedService && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Select Date
                </h2>
                <p className="text-gray-600">
                  You selected: <span className="font-semibold text-pink-600">{selectedService.name}</span>
                </p>
              </div>
              
              <div className="flex justify-center">
                <Calendar
                  onChange={handleDateSelect}
                  value={selectedDate}
                  minDate={new Date()}
                  className="react-calendar"
                />
              </div>
              
              <div className="text-center mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary mr-4"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary"
                  disabled={!selectedDate}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Time Selection */}
          {step === 3 && selectedService && selectedDate && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Select Time
                </h2>
                <p className="text-gray-600">
                  {formatDate(selectedDate)}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedTime === time
                        ? 'border-pink-500 bg-pink-50 text-pink-600'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FaClock className="text-sm" />
                      <span className="font-medium">{formatTime(time)}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary mr-4"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="btn-primary"
                  disabled={!selectedTime}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact Information */}
          {step === 4 && selectedService && selectedDate && selectedTime && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Your Information
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Service:</span> {selectedService.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Date:</span> {formatDate(selectedDate)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Time:</span> {formatTime(selectedTime)}
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPhone className="inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests or Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-textarea"
                    placeholder="Any special requests, allergies, or additional information..."
                  />
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => setStep(3)}
                    className="btn-secondary mr-4"
                    type="button"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="spinner"></div>
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit Booking Request'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {step === 5 && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-green-600 text-3xl" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Booking Request Submitted!
              </h2>
              
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Thank you for choosing our services! We've received your booking request and will contact you within 24 hours to confirm your appointment.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Booking Summary</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">Service:</span> {selectedService?.name}</p>
                  <p><span className="font-medium">Date:</span> {formatDate(selectedDate)}</p>
                  <p><span className="font-medium">Time:</span> {formatTime(selectedTime)}</p>
                  <p><span className="font-medium">Duration:</span> {selectedService?.duration_minutes} minutes</p>
                  <p><span className="font-medium">Price:</span> ₦{selectedService?.price ? parseFloat(selectedService.price).toLocaleString('en-NG') : ''}</p>
                </div>
              </div>
              
              <div className="space-x-4">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Book Another Appointment
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="btn-secondary"
                >
                  Return Home
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Booking;
