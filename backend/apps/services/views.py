from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Service model - read-only for public API."""
    
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_featured']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'duration_minutes']
    ordering = ['category', 'name']
