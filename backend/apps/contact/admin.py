from django.contrib import admin
from .models import ContactMessage, NewsletterSubscriber


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject_type', 'subject', 'is_read', 'created_at']
    list_filter = ['subject_type', 'is_read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    list_editable = ['is_read']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Message Details', {
            'fields': ('subject_type', 'subject', 'message')
        }),
        ('Status', {
            'fields': ('is_read',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_read', 'mark_unread']
    
    def mark_read(self, request, queryset):
        queryset.update(is_read=True)
        self.message_user(request, f'{queryset.count()} messages marked as read.')
    mark_read.short_description = "Mark selected messages as read"
    
    def mark_unread(self, request, queryset):
        queryset.update(is_read=False)
        self.message_user(request, f'{queryset.count()} messages marked as unread.')
    mark_unread.short_description = "Mark selected messages as unread"


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'is_active', 'subscribed_at']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email', 'name']
    list_editable = ['is_active']
    ordering = ['-subscribed_at']
    readonly_fields = ['subscribed_at', 'unsubscribed_at']
    
    fieldsets = (
        ('Subscriber Information', {
            'fields': ('email', 'name')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('subscribed_at', 'unsubscribed_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['activate_subscribers', 'deactivate_subscribers']
    
    def activate_subscribers(self, request, queryset):
        queryset.update(is_active=True, unsubscribed_at=None)
        self.message_user(request, f'{queryset.count()} subscribers activated.')
    activate_subscribers.short_description = "Activate selected subscribers"
    
    def deactivate_subscribers(self, request, queryset):
        from django.utils import timezone
        queryset.update(is_active=False, unsubscribed_at=timezone.now())
        self.message_user(request, f'{queryset.count()} subscribers deactivated.')
    deactivate_subscribers.short_description = "Deactivate selected subscribers"
