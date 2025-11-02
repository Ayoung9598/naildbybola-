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
# Note: In production, media files should ideally be served via a CDN or cloud storage
# For Render free tier (no persistent storage), files uploaded via admin will be lost on restart
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    # Serve media files in production (not ideal, but necessary for free tier)
    # TODO: Migrate to cloud storage (AWS S3, Cloudinary, etc.) for production
    from django.views.static import serve
    from django.urls import re_path
    
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    ]
