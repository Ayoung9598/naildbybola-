from django.db import models
from django.core.validators import RegexValidator
from apps.services.models import Service


class BookingRequest(models.Model):
    """Model for appointment booking requests."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    TIME_SLOTS = [
        ('09:00', '9:00 AM'),
        ('10:00', '10:00 AM'),
        ('11:00', '11:00 AM'),
        ('12:00', '12:00 PM'),
        ('13:00', '1:00 PM'),
        ('14:00', '2:00 PM'),
        ('15:00', '3:00 PM'),
        ('16:00', '4:00 PM'),
        ('17:00', '5:00 PM'),
        ('18:00', '6:00 PM'),
    ]
    
    # Customer information
    customer_name = models.CharField(max_length=100, help_text="Customer's full name")
    customer_email = models.EmailField(help_text="Customer's email address")
    customer_phone = models.CharField(
        max_length=20,
        validators=[RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
        )],
        help_text="Customer's phone number"
    )
    
    # Booking details
    service = models.ForeignKey(Service, on_delete=models.CASCADE, help_text="Requested service")
    preferred_date = models.DateField(help_text="Preferred appointment date")
    preferred_time = models.CharField(max_length=5, choices=TIME_SLOTS, help_text="Preferred time slot")
    notes = models.TextField(blank=True, help_text="Additional notes or special requests")
    
    # Status tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Booking Request"
        verbose_name_plural = "Booking Requests"
    
    def __str__(self):
        return f"{self.customer_name} - {self.service.name} on {self.preferred_date}"
    
    @property
    def total_duration(self):
        """Calculate total appointment duration including buffer time."""
        return self.service.duration_minutes + 15  # 15 min buffer
    
    @property
    def estimated_end_time(self):
        """Calculate estimated end time."""
        from datetime import datetime, timedelta
        
        start_time = datetime.strptime(self.preferred_time, '%H:%M').time()
        start_datetime = datetime.combine(self.preferred_date, start_time)
        end_datetime = start_datetime + timedelta(minutes=self.total_duration)
        
        return end_datetime.time()
