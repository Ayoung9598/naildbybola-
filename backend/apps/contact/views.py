from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils import timezone
import threading
import logging
from .models import ContactMessage, NewsletterSubscriber
from .serializers import ContactMessageSerializer, NewsletterSubscriberSerializer

logger = logging.getLogger(__name__)


class ContactMessageViewSet(viewsets.ModelViewSet):
    """ViewSet for ContactMessage model."""
    
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def create(self, request, *args, **kwargs):
        """Create a new contact message and send email notification."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create the contact message
        message = serializer.save()
        
        # Send email notification in background (don't block response)
        email_thread = threading.Thread(
            target=self.send_contact_notification,
            args=(message,),
            daemon=True
        )
        email_thread.start()
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
    
    def send_contact_notification(self, message):
        """Send email notification about new contact message (runs in background)."""
        # Ensure Django is set up in this thread
        import django
        django.setup()
        
        try:
            subject = f"New Contact Message - {message.subject}"
            
            # Create email content
            context = {
                'message': message,
            }
            
            html_message = render_to_string('emails/contact_notification.html', context)
            plain_message = f"""
            New contact message received:
            
            From: {message.name}
            Email: {message.email}
            Phone: {message.phone or 'Not provided'}
            Subject: {message.subject}
            Type: {message.get_subject_type_display()}
            
            Message:
            {message.message}
            """
            
            logger.info(f"Attempting to send contact notification email to {settings.EMAIL_HOST_USER}")
            result = send_mail(
                subject=subject,
                message=plain_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.EMAIL_HOST_USER],  # Business owner email
                fail_silently=False,  # Raise exception so we can log it
            )
            logger.info(f"Contact notification email sent successfully. Result: {result}")
        except Exception as e:
            # Log error but don't fail (already saved to database)
            logger.error(f"Failed to send contact notification: {e}", exc_info=True)
    
    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        """Mark a contact message as read."""
        message = self.get_object()
        message.is_read = True
        message.save()
        return Response({'status': 'Message marked as read'})


class NewsletterSubscriberViewSet(viewsets.ModelViewSet):
    """ViewSet for NewsletterSubscriber model."""
    
    queryset = NewsletterSubscriber.objects.filter(is_active=True)
    serializer_class = NewsletterSubscriberSerializer
    
    def create(self, request, *args, **kwargs):
        """Subscribe to newsletter."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        subscriber = serializer.save()
        
        # Send welcome email in background (don't block response)
        email_thread = threading.Thread(
            target=self.send_welcome_email,
            args=(subscriber,),
            daemon=True
        )
        email_thread.start()
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
    
    def send_welcome_email(self, subscriber):
        """Send welcome email to new subscriber (runs in background)."""
        # Ensure Django is set up in this thread
        import django
        django.setup()
        
        try:
            subject = "Welcome to our newsletter!"
            
            context = {
                'subscriber': subscriber,
            }
            
            html_message = render_to_string('emails/newsletter_welcome.html', context)
            plain_message = f"""
            Welcome to our newsletter, {subscriber.name or 'there'}!
            
            Thank you for subscribing. You'll receive updates about our latest services, 
            special offers, and beauty tips.
            
            Best regards,
            The Nail & Lash Team
            """
            
            logger.info(f"Attempting to send welcome email to {subscriber.email}")
            result = send_mail(
                subject=subject,
                message=plain_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[subscriber.email],
                fail_silently=False,  # Raise exception so we can log it
            )
            logger.info(f"Welcome email sent successfully. Result: {result}")
        except Exception as e:
            # Log error but don't fail (already saved to database)
            logger.error(f"Failed to send welcome email: {e}", exc_info=True)
    
    @action(detail=True, methods=['post'])
    def unsubscribe(self, request, pk=None):
        """Unsubscribe from newsletter."""
        subscriber = self.get_object()
        subscriber.is_active = False
        subscriber.unsubscribed_at = timezone.now()
        subscriber.save()
        return Response({'status': 'Successfully unsubscribed'})
