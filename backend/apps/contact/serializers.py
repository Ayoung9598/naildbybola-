from rest_framework import serializers
from .models import ContactMessage, NewsletterSubscriber


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer for ContactMessage model."""
    
    class Meta:
        model = ContactMessage
        fields = [
            'id', 'name', 'email', 'phone', 'subject_type', 'subject', 
            'message', 'is_read', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'is_read', 'created_at', 'updated_at']


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    """Serializer for NewsletterSubscriber model."""
    
    class Meta:
        model = NewsletterSubscriber
        fields = ['id', 'email', 'name', 'is_active', 'subscribed_at']
        read_only_fields = ['id', 'is_active', 'subscribed_at']
    
    def create(self, validated_data):
        """Create or reactivate newsletter subscriber."""
        email = validated_data['email']
        
        # Check if subscriber already exists
        subscriber, created = NewsletterSubscriber.objects.get_or_create(
            email=email,
            defaults=validated_data
        )
        
        # If subscriber exists but is inactive, reactivate them
        is_reactivated = False
        if not created and not subscriber.is_active:
            subscriber.is_active = True
            subscriber.name = validated_data.get('name', subscriber.name)
            subscriber.unsubscribed_at = None
            subscriber.save()
            is_reactivated = True
        
        # Store flag to indicate if this is a new subscriber (for welcome email)
        subscriber._is_new_subscriber = created or is_reactivated
        
        return subscriber
