from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
import threading
import logging
from .models import BookingRequest
from .serializers import BookingRequestSerializer

logger = logging.getLogger(__name__)


class BookingRequestViewSet(viewsets.ModelViewSet):
    """ViewSet for BookingRequest model."""
    
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
    
    def create(self, request, *args, **kwargs):
        """Create a new booking request and send email notification."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create the booking request
        booking = serializer.save()
        
        # Send email notification in background (don't block response)
        email_thread = threading.Thread(
            target=self.send_booking_notification,
            args=(booking,),
            daemon=True
        )
        email_thread.start()
        
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
    
    def send_booking_notification(self, booking):
        """Send email notification about new booking request (runs in background)."""
        # Ensure Django is set up in this thread
        import django
        django.setup()
        
        try:
            subject = f"New Booking Request - {booking.customer_name}"
            
            # Create email content
            context = {
                'booking': booking,
                'service': booking.service,
            }
            
            html_message = render_to_string('emails/booking_notification.html', context)
            plain_message = f"""
            New booking request received:
            
            Customer: {booking.customer_name}
            Email: {booking.customer_email}
            Phone: {booking.customer_phone}
            Service: {booking.service.name}
            Date: {booking.preferred_date}
            Time: {booking.preferred_time}
            Notes: {booking.notes or 'None'}
            
            Please confirm this appointment.
            """
            
            logger.info(f"Attempting to send booking notification email to {settings.EMAIL_HOST_USER}")
            result = send_mail(
                subject=subject,
                message=plain_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.EMAIL_HOST_USER],  # Business owner email
                fail_silently=False,  # Raise exception so we can log it
            )
            logger.info(f"Booking notification email sent successfully. Result: {result}")
        except Exception as e:
            # Log error but don't fail (already saved to database)
            logger.error(f"Failed to send booking notification: {e}", exc_info=True)
    
    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """Confirm a booking request (admin action)."""
        booking = self.get_object()
        booking.status = 'confirmed'
        booking.save()
        
        # Send confirmation email in background (don't block response)
        email_thread = threading.Thread(
            target=self.send_confirmation_email,
            args=(booking,),
            daemon=True
        )
        email_thread.start()
        
        return Response({'status': 'Booking confirmed'})
    
    def send_confirmation_email(self, booking):
        """Send confirmation email to customer (runs in background)."""
        # Ensure Django is set up in this thread
        import django
        django.setup()
        
        try:
            subject = f"Appointment Confirmed - {booking.service.name}"
            
            context = {
                'booking': booking,
                'service': booking.service,
            }
            
            html_message = render_to_string('emails/booking_confirmation.html', context)
            plain_message = f"""
            Your appointment has been confirmed!
            
            Service: {booking.service.name}
            Date: {booking.preferred_date}
            Time: {booking.preferred_time}
            Duration: {booking.service.duration_display}
            
            We look forward to seeing you!
            """
            
            logger.info(f"Attempting to send confirmation email to {booking.customer_email}")
            result = send_mail(
                subject=subject,
                message=plain_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[booking.customer_email],
                fail_silently=False,  # Raise exception so we can log it
            )
            logger.info(f"Confirmation email sent successfully. Result: {result}")
        except Exception as e:
            # Log error but don't fail (booking already confirmed)
            logger.error(f"Failed to send confirmation email: {e}", exc_info=True)
