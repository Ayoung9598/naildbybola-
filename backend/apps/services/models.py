from django.db import models
from django.core.validators import MinValueValidator


class Service(models.Model):
    """Model for nail and lash services offered by the technician."""
    
    SERVICE_CATEGORIES = [
        ('nails', 'Nails'),
        ('lashes', 'Lashes'),
        ('both', 'Both'),
    ]
    
    name = models.CharField(max_length=100, help_text="Service name (e.g., 'Classic Manicure')")
    category = models.CharField(max_length=10, choices=SERVICE_CATEGORIES, help_text="Service category")
    description = models.TextField(help_text="Detailed service description")
    price = models.DecimalField(
        max_digits=8, 
        decimal_places=2, 
        validators=[MinValueValidator(0.01)],
        help_text="Service price"
    )
    duration_minutes = models.PositiveIntegerField(help_text="Service duration in minutes")
    is_featured = models.BooleanField(default=False, help_text="Show on homepage")
    is_active = models.BooleanField(default=True, help_text="Available for booking")
    image = models.ImageField(upload_to='services/', blank=True, null=True, help_text="Service image")
    second_image = models.ImageField(
        upload_to='services/', 
        blank=True, 
        null=True, 
        help_text="Second image (for combined services - displays side by side with main image)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['category', 'name']
        verbose_name = "Service"
        verbose_name_plural = "Services"
    
    def __str__(self):
        return f"{self.name} - ₦{self.price}"
    
    @property
    def duration_display(self):
        """Return duration in hours and minutes format."""
        hours = self.duration_minutes // 60
        minutes = self.duration_minutes % 60
        
        if hours > 0 and minutes > 0:
            return f"{hours}h {minutes}m"
        elif hours > 0:
            return f"{hours}h"
        else:
            return f"{minutes}m"
