from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for Service model."""
    
    duration_display = serializers.ReadOnlyField()
    
    class Meta:
        model = Service
        fields = [
            'id', 'name', 'category', 'description', 'price', 
            'duration_minutes', 'duration_display', 'is_featured', 
            'is_active', 'image', 'second_image', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
