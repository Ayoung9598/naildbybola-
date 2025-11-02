from rest_framework import serializers
from .models import GalleryImage


class GalleryImageSerializer(serializers.ModelSerializer):
    """Serializer for GalleryImage model."""
    
    class Meta:
        model = GalleryImage
        fields = [
            'id', 'title', 'description', 'category', 'image', 'comparison_image', 'thumbnail',
            'is_featured', 'is_active', 'sort_order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'thumbnail', 'created_at', 'updated_at']
