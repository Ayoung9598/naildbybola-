import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Zoom } from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { FaFilter } from 'react-icons/fa';
import { galleryAPI } from '../services/apiClient';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [loading, setLoading] = useState(true);

  const categories = [
    { value: 'all', label: 'All Work' },
    { value: 'nails', label: 'Nails' },
    { value: 'lashes', label: 'Lashes' },
    { value: 'before_after', label: 'Before & After' }
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await galleryAPI.getAll();
        const imageData = response.data.results || response.data;
        setImages(imageData);
        setFilteredImages(imageData);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Mock data for development
        const mockImages = [
          {
            id: 1,
            title: 'Beautiful Nail Art',
            category: 'nails',
            image: '/api/placeholder/400/500',
            description: 'Custom nail art design'
          },
          {
            id: 2,
            title: 'Volume Lash Extensions',
            category: 'lashes',
            image: '/api/placeholder/400/500',
            description: 'Full volume lash set'
          },
          {
            id: 3,
            title: 'Before & After - Nails',
            category: 'before_after',
            image: '/api/placeholder/400/500',
            description: 'Amazing transformation'
          }
        ];
        setImages(mockImages);
        setFilteredImages(mockImages);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory, images]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(-1);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'nails':
        return 'bg-pink-100 text-pink-800';
      case 'lashes':
        return 'bg-purple-100 text-purple-800';
      case 'before_after':
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
            Our Gallery
          </h1>
          <p className="text-responsive-md opacity-90 max-w-2xl mx-auto">
            Explore our beautiful work and see the transformations we create for our clients
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

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="masonry">
              {filteredImages.map((image, index) => (
                <div key={image.id} className="masonry-item slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="card overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => openLightbox(index)}>
                    <div className="aspect-w-4 aspect-h-5 bg-gray-200">
                      {image.category === 'before_after' && image.comparison_image ? (
                        // Before & After: Show both images side by side
                        <div className="flex h-64">
                          <div className="flex-1 relative">
                            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-semibold">Before</div>
                            <img
                              src={image.image || '/api/placeholder/400/500'}
                              alt={`${image.title} - Before`}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/400/500';
                              }}
                            />
                          </div>
                          <div className="w-1 bg-gray-300"></div>
                          <div className="flex-1 relative">
                            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-semibold">After</div>
                            <img
                              src={image.comparison_image || '/api/placeholder/400/500'}
                              alt={`${image.title} - After`}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = '/api/placeholder/400/500';
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        // Regular single image
                        <img
                          src={image.image || '/api/placeholder/400/500'}
                          alt={image.title}
                          loading="lazy"
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/400/500';
                          }}
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800">
                          {image.title}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(image.category)}`}>
                          {image.category.replace('_', ' ')}
                        </span>
                      </div>
                      {image.description && (
                        <p className="text-sm text-gray-600">
                          {image.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Images Message */}
          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No images found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category or check back later for new content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <Lightbox
          open={lightboxIndex >= 0}
          close={closeLightbox}
          index={lightboxIndex}
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomInMultiplier: 2,
            doubleTapDelay: 300,
            doubleClickDelay: 300,
            doubleClickMaxStops: 2,
            keyboardMoveDistance: 50,
            wheelZoomDistanceFactor: 100,
            pinchZoomDistanceFactor: 100,
            scrollToZoom: true
          }}
          slides={filteredImages.flatMap(img => {
            // For before_after with comparison_image, show both images
            if (img.category === 'before_after' && img.comparison_image) {
              return [
                {
                  src: img.image || '/api/placeholder/800/600',
                  title: `${img.title} - Before`,
                  description: img.description
                },
                {
                  src: img.comparison_image || '/api/placeholder/800/600',
                  title: `${img.title} - After`,
                  description: img.description
                }
              ];
            }
            return [{
              src: img.image || '/api/placeholder/800/600',
              title: img.title,
              description: img.description
            }];
          })}
        />
      )}
    </div>
  );
};

export default Gallery;
