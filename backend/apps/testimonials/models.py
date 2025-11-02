from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Testimonial(models.Model):
    """Model for client testimonials and reviews."""
    
    SERVICE_CATEGORIES = [
        ('nails', 'Nails'),
        ('lashes', 'Lashes'),
        ('both', 'Both'),
    ]
    
    client_name = models.CharField(max_length=100, help_text="Client's name (can be first name only)")
    client_photo = models.ImageField(
        upload_to='testimonials/', 
        blank=True, 
        null=True, 
        help_text="Client photo (optional)"
    )
    service_category = models.CharField(
        max_length=10, 
        choices=SERVICE_CATEGORIES, 
        help_text="Service category reviewed"
    )
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Rating from 1 to 5 stars"
    )
    review_text = models.TextField(help_text="Client review text")
    is_featured = models.BooleanField(default=False, help_text="Show on homepage")
    is_approved = models.BooleanField(default=True, help_text="Approved for display")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', '-rating', '-created_at']
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"
    
    def __str__(self):
        return f"{self.client_name} - {self.rating} stars"
    
    @property
    def stars_display(self):
        """Return star rating as string."""
        if self.rating is None:
            return "☆☆☆☆☆"
        return "★" * self.rating + "☆" * (5 - self.rating)
