"""
Django management command to create a superuser from environment variables.

This allows creating a superuser on Render free tier without shell access.

Usage: Set these environment variables in Render Dashboard:
- DJANGO_SUPERUSER_USERNAME
- DJANGO_SUPERUSER_EMAIL
- DJANGO_SUPERUSER_PASSWORD

Then the entrypoint script will automatically create the superuser on startup.
"""

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os


class Command(BaseCommand):
    help = 'Creates a superuser from environment variables (for Render free tier)'

    def handle(self, *args, **options):
        User = get_user_model()
        
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        
        if not all([username, email, password]):
            self.stdout.write(
                self.style.WARNING(
                    '⚠️  Superuser environment variables not set. Skipping superuser creation.\n'
                    'To create a superuser, set these in Render Dashboard:\n'
                    '  - DJANGO_SUPERUSER_USERNAME\n'
                    '  - DJANGO_SUPERUSER_EMAIL\n'
                    '  - DJANGO_SUPERUSER_PASSWORD'
                )
            )
            return
        
        # Check if superuser already exists
        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.SUCCESS(f'✅ Superuser "{username}" already exists. Skipping.')
            )
            return
        
        # Check if any superuser exists with this email
        if User.objects.filter(email=email).exists():
            self.stdout.write(
                self.style.WARNING(f'⚠️  User with email "{email}" already exists. Skipping.')
            )
            return
        
        # Create superuser
        try:
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'✅ Successfully created superuser "{username}" with email "{email}"'
                )
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Error creating superuser: {str(e)}')
            )

