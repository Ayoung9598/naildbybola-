"""
Django management command to test email sending via Resend.
Usage: python manage.py test_email recipient@example.com
"""
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Test email sending via Resend API'

    def add_arguments(self, parser):
        parser.add_argument(
            'recipient',
            type=str,
            help='Email address to send test email to'
        )

    def handle(self, *args, **options):
        recipient = options['recipient']
        
        self.stdout.write(f"📧 Testing email sending to {recipient}...")
        self.stdout.write(f"   Email backend: {settings.EMAIL_BACKEND}")
        self.stdout.write(f"   From email: {settings.DEFAULT_FROM_EMAIL}")
        
        # Check Resend configuration
        if hasattr(settings, 'RESEND_API_KEY'):
            api_key = settings.RESEND_API_KEY
            if api_key:
                self.stdout.write(f"   Resend API key: {'*' * (len(api_key) - 4)}{api_key[-4:]}")
            else:
                self.stdout.write(self.style.WARNING("   ⚠️  RESEND_API_KEY is not set!"))
        else:
            self.stdout.write(self.style.WARNING("   ⚠️  RESEND_API_KEY not found in settings!"))
        
        # Check admin email
        if hasattr(settings, 'ADMIN_EMAIL'):
            self.stdout.write(f"   Admin email: {settings.ADMIN_EMAIL or 'Not set'}")
        
        try:
            # Send test email
            self.stdout.write("\n📤 Sending test email...")
            result = send_mail(
                subject='Test Email from NaildbyBola',
                message='This is a test email to verify email functionality.',
                html_message='<h1>Test Email</h1><p>This is a <strong>test email</strong> to verify email functionality.</p>',
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
                fail_silently=False,
            )
            
            self.stdout.write(self.style.SUCCESS(f"\n✅ Email sent successfully! Result: {result}"))
            self.stdout.write(f"   Check {recipient} inbox (and spam folder) for the test email.")
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"\n❌ Failed to send email: {e}"))
            self.stdout.write(self.style.ERROR(f"   Error type: {type(e).__name__}"))
            import traceback
            self.stdout.write(self.style.ERROR(f"   Traceback:\n{traceback.format_exc()}"))

