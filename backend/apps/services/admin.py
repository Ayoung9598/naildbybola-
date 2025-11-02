from django.contrib import admin
from .models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'duration_display', 'is_featured', 'is_active']
    list_filter = ['category', 'is_featured', 'is_active', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['is_featured', 'is_active']
    ordering = ['category', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'description', 'image', 'second_image')
        }),
        ('Pricing & Duration', {
            'fields': ('price', 'duration_minutes')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'is_active')
        }),
    )
