from django.db import models
from django.core.validators import RegexValidator


class ContactMessage(models.Model):
    """Model for contact form submissions."""
    
    SUBJECT_CHOICES = [
        ('general', 'General Inquiry'),
        ('booking', 'Booking Question'),
        ('pricing', 'Pricing Information'),
        ('complaint', 'Complaint'),
        ('compliment', 'Compliment'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100, help_text="Contact person's name")
    email = models.EmailField(help_text="Contact email address")
    phone = models.CharField(
        max_length=20,
        validators=[RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
        )],
        blank=True,
        help_text="Contact phone number (optional)"
    )
    subject_type = models.CharField(
        max_length=20, 
        choices=SUBJECT_CHOICES, 
        default='general',
        help_text="Type of inquiry"
    )
    subject = models.CharField(max_length=200, help_text="Message subject")
    message = models.TextField(help_text="Message content")
    is_read = models.BooleanField(default=False, help_text="Message has been read")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
    
    def __str__(self):
        return f"{self.name} - {self.subject} ({self.created_at.strftime('%Y-%m-%d')})"


class NewsletterSubscriber(models.Model):
    """Model for newsletter subscribers."""
    
    email = models.EmailField(unique=True, help_text="Subscriber email address")
    name = models.CharField(max_length=100, blank=True, help_text="Subscriber name (optional)")
    is_active = models.BooleanField(default=True, help_text="Subscriber is active")
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        ordering = ['-subscribed_at']
        verbose_name = "Newsletter Subscriber"
        verbose_name_plural = "Newsletter Subscribers"
    
    def __str__(self):
        return f"{self.email} ({'Active' if self.is_active else 'Inactive'})"
