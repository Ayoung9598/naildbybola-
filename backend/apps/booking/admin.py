from django.contrib import admin
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from .models import BookingRequest


@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    list_display = ['customer_name', 'service', 'preferred_date', 'preferred_time', 'status', 'created_at']
    list_filter = ['status', 'service__category', 'preferred_date', 'created_at']
    search_fields = ['customer_name', 'customer_email', 'customer_phone', 'service__name']
    list_editable = []
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Customer Information', {
            'fields': ('customer_name', 'customer_email', 'customer_phone')
        }),
        ('Booking Details', {
            'fields': ('service', 'preferred_date', 'preferred_time', 'notes')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_confirmed', 'mark_cancelled']
    
    def save_model(self, request, obj, form, change):
        """Override save to send confirmation email when status changes to confirmed."""
        if change and obj.pk:
            # Get old status before saving
            old_obj = BookingRequest.objects.get(pk=obj.pk)
            old_status = old_obj.status
            super().save_model(request, obj, form, change)
            # Send email if status changed from non-confirmed to confirmed
            if old_status != 'confirmed' and obj.status == 'confirmed':
                self.send_confirmation_email(obj)
        else:
            super().save_model(request, obj, form, change)
    
    def send_confirmation_email(self, booking):
        """Send confirmation email to customer."""
        try:
            from django.conf import settings
            from django.template.loader import render_to_string
            from django.core.mail import send_mail
            
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
            
            send_mail(
                subject=subject,
                message=plain_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[booking.customer_email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send confirmation email: {e}")
    
    def mark_confirmed(self, request, queryset):
        """Mark bookings as confirmed and send confirmation emails."""
        for booking in queryset:
            if booking.status != 'confirmed':
                booking.status = 'confirmed'
                booking.save()
                self.send_confirmation_email(booking)
        self.message_user(request, f'{queryset.count()} bookings marked as confirmed.')
    mark_confirmed.short_description = "Mark selected bookings as confirmed"
    
    def mark_cancelled(self, request, queryset):
        queryset.update(status='cancelled')
        self.message_user(request, f'{queryset.count()} bookings marked as cancelled.')
    mark_cancelled.short_description = "Mark selected bookings as cancelled"
