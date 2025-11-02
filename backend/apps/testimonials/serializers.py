from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    """Serializer for Testimonial model."""
    
    stars_display = serializers.ReadOnlyField()
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_photo', 'service_category', 
            'rating', 'stars_display', 'review_text', 'is_featured', 
            'is_approved', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
