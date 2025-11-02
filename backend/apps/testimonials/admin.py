from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'service_category', 'rating', 'stars_display', 'is_featured', 'is_approved']
    list_filter = ['service_category', 'rating', 'is_featured', 'is_approved', 'created_at']
    search_fields = ['client_name', 'review_text']
    list_editable = ['is_featured', 'is_approved']
    ordering = ['-is_featured', '-rating', '-created_at']
    readonly_fields = ['stars_display', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Client Information', {
            'fields': ('client_name', 'client_photo')
        }),
        ('Review Details', {
            'fields': ('service_category', 'rating', 'stars_display', 'review_text')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'is_approved')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['approve_testimonials', 'feature_testimonials']
    
    def approve_testimonials(self, request, queryset):
        queryset.update(is_approved=True)
        self.message_user(request, f'{queryset.count()} testimonials approved.')
    approve_testimonials.short_description = "Approve selected testimonials"
    
    def feature_testimonials(self, request, queryset):
        queryset.update(is_featured=True)
        self.message_user(request, f'{queryset.count()} testimonials featured.')
    feature_testimonials.short_description = "Feature selected testimonials"
