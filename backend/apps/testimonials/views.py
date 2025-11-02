from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ModelViewSet):
    """ViewSet for Testimonial model - allows public submissions."""
    
    queryset = Testimonial.objects.filter(is_approved=True)
    serializer_class = TestimonialSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['service_category', 'is_featured', 'rating']
    search_fields = ['client_name', 'review_text']
    ordering_fields = ['rating', 'created_at']
    ordering = ['-is_featured', '-rating', '-created_at']
    
    def get_queryset(self):
        """Return approved testimonials for GET requests, all for POST requests."""
        if self.action == 'list':
            return Testimonial.objects.filter(is_approved=True)
        return Testimonial.objects.all()
    
    def perform_create(self, serializer):
        """Set default values for new testimonials."""
        serializer.save(is_approved=False)  # Require admin approval
