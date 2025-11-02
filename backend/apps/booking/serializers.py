from rest_framework import serializers
from .models import BookingRequest
from apps.services.serializers import ServiceSerializer


class BookingRequestSerializer(serializers.ModelSerializer):
    """Serializer for BookingRequest model."""
    
    service = ServiceSerializer(read_only=True)
    service_id = serializers.IntegerField(write_only=True)
    total_duration = serializers.ReadOnlyField()
    estimated_end_time = serializers.ReadOnlyField()
    
    class Meta:
        model = BookingRequest
        fields = [
            'id', 'customer_name', 'customer_email', 'customer_phone',
            'service', 'service_id', 'preferred_date', 'preferred_time',
            'notes', 'status', 'total_duration', 'estimated_end_time',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'updated_at']
    
    def validate_preferred_date(self, value):
        """Validate that the preferred date is not in the past."""
        from django.utils import timezone
        from datetime import date
        
        if value < date.today():
            raise serializers.ValidationError("Cannot book appointments in the past.")
        return value
    
    def validate(self, data):
        """Validate booking request data."""
        # Check if service exists and is active
        service_id = data.get('service_id')
        if service_id:
            from apps.services.models import Service
            try:
                service = Service.objects.get(id=service_id, is_active=True)
            except Service.DoesNotExist:
                raise serializers.ValidationError("Selected service is not available.")
        
        return data
