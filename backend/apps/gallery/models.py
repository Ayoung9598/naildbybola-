from django.db import models
from django.conf import settings


class GalleryImage(models.Model):
    """Model for gallery images showcasing work."""
    
    CATEGORIES = [
        ('nails', 'Nails'),
        ('lashes', 'Lashes'),
        ('before_after', 'Before & After'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200, help_text="Image title")
    description = models.TextField(blank=True, help_text="Image description")
    category = models.CharField(max_length=20, choices=CATEGORIES, help_text="Image category")
    image = models.ImageField(upload_to='gallery/', help_text="Gallery image")
    comparison_image = models.ImageField(
        upload_to='gallery/', 
        blank=True, 
        null=True,
        help_text="Comparison image (for 'Before & After' category - displays side by side)"
    )
    thumbnail = models.ImageField(
        upload_to='gallery/thumbnails/', 
        blank=True, 
        null=True,
        help_text="Thumbnail image (auto-generated if not provided)"
    )
    is_featured = models.BooleanField(default=False, help_text="Show on homepage")
    is_active = models.BooleanField(default=True, help_text="Visible in gallery")
    sort_order = models.PositiveIntegerField(default=0, help_text="Sort order (higher = first)")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-sort_order', '-is_featured', '-created_at']
        verbose_name = "Gallery Image"
        verbose_name_plural = "Gallery Images"
    
    def __str__(self):
        return f"{self.title} ({self.category})"
    
    def save(self, *args, **kwargs):
        """Override save to auto-generate thumbnail if not provided."""
        super().save(*args, **kwargs)
        
        # Auto-generate thumbnail if not provided and using local storage
        # Note: With Cloudinary, thumbnails can be generated on-the-fly via URL transformations
        # So we skip auto-generation when using Cloudinary
        if not self.thumbnail and self.image:
            # Check if using Cloudinary (Cloudinary URLs don't have .path attribute)
            try:
                # If image has .path, it's local storage
                if hasattr(self.image, 'path'):
                    from PIL import Image
                    import os
                    
                    # Create thumbnail
                    img = Image.open(self.image.path)
                    img.thumbnail((300, 300), Image.Resampling.LANCZOS)
                    
                    # Save thumbnail
                    thumb_path = self.image.path.replace('gallery/', 'gallery/thumbnails/')
                    thumb_dir = os.path.dirname(thumb_path)
                    os.makedirs(thumb_dir, exist_ok=True)
                    
                    img.save(thumb_path)
                    self.thumbnail.name = thumb_path.replace(settings.MEDIA_ROOT + '/', '')
                    super().save(*args, **kwargs)
                # else: Using Cloudinary - thumbnails generated via URL transformations
            except (AttributeError, OSError):
                # Cloudinary storage - skip thumbnail generation
                # Thumbnails can be generated via Cloudinary URL transformations instead
                pass
