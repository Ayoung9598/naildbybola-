from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import GalleryImage
from .serializers import GalleryImageSerializer


class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for GalleryImage model - read-only for public API."""
    
    queryset = GalleryImage.objects.filter(is_active=True)
    serializer_class = GalleryImageSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured']
    search_fields = ['title', 'description']
    ordering_fields = ['sort_order', 'created_at']
    ordering = ['-sort_order', '-is_featured', '-created_at']
