from .base import *

DEBUG = True

# Development-specific settings
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# Development database
# Uses environment variables if set, otherwise defaults to Docker setup
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME', default='naillash_db'),
        'USER': env('DB_USER', default='admin'),
        'PASSWORD': env('DB_PASSWORD', default='password'),
        'HOST': env('DB_HOST', default='localhost'),  # 'db' for Docker, 'localhost' for local
        'PORT': env('DB_PORT', default='5432'),
    }
}

# CORS settings for development
CORS_ALLOW_ALL_ORIGINS = True

# Email backend for development
# If email credentials are provided, use SMTP; otherwise, use console for testing
if env('EMAIL_HOST_USER', default=''):
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
else:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
    print("⚠️  Email credentials not set. Emails will be printed to console instead of being sent.")
