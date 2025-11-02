from django.contrib import admin
from .models import GalleryImage


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_featured', 'is_active', 'sort_order', 'created_at']
    list_filter = ['category', 'is_featured', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    list_editable = ['is_featured', 'is_active', 'sort_order']
    ordering = ['-sort_order', '-is_featured', '-created_at']
    readonly_fields = ['thumbnail', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Image Information', {
            'fields': ('title', 'description', 'category')
        }),
        ('Image Files', {
            'fields': ('image', 'comparison_image', 'thumbnail'),
            'description': 'For "Before & After" category, upload both images. comparison_image displays as "After" side by side.'
        }),
        ('Display Options', {
            'fields': ('is_featured', 'is_active', 'sort_order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['feature_images', 'activate_images']
    
    def feature_images(self, request, queryset):
        queryset.update(is_featured=True)
        self.message_user(request, f'{queryset.count()} images featured.')
    feature_images.short_description = "Feature selected images"
    
    def activate_images(self, request, queryset):
        queryset.update(is_active=True)
        self.message_user(request, f'{queryset.count()} images activated.')
    activate_images.short_description = "Activate selected images"
