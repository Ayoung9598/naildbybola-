"""
URL configuration for nail lash website project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root(request):
    """API root endpoint."""
    return JsonResponse({
        'message': 'Naildby_bola API',
        'version': '1.0',
        'endpoints': {
            'services': '/api/services/',
            'booking': '/api/booking/',
            'contact': '/api/contact/',
            'newsletter': '/api/newsletter/',
            'testimonials': '/api/testimonials/',
            'gallery': '/api/gallery/',
            'admin': '/admin/',
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include('apps.services.urls')),
    path('api/', include('apps.booking.urls')),
    path('api/', include('apps.contact.urls')),
    path('api/', include('apps.testimonials.urls')),
    path('api/', include('apps.gallery.urls')),
]

# Serve media files
# In development, serve locally
# In production with Cloudinary: files are served from Cloudinary CDN (no local serving needed)
# In production without Cloudinary: serve locally (files won't persist on Render free tier)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    # Only serve media files locally if Cloudinary is not configured
    # When Cloudinary is configured, images are served from Cloudinary CDN automatically
    from django.views.static import serve
    from django.urls import re_path
    
    # Fallback: serve media files locally (only if Cloudinary not configured)
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]
