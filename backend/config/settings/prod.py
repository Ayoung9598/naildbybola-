from .base import *

DEBUG = False

# Production-specific settings
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

# Security settings for production
SECURE_SSL_REDIRECT = env.bool('SECURE_SSL_REDIRECT', default=True)
SECURE_HSTS_SECONDS = env.int('SECURE_HSTS_SECONDS', default=31536000)
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Database configuration for production
# Use DATABASE_URL if available (from Render connectionString), otherwise use individual variables
if env('DATABASE_URL', default=None):
    DATABASES = {
        'default': env.db()
    }
else:
    # Fall back to individual database variables from Render
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('DB_NAME', default=''),
            'USER': env('DB_USER', default=''),
            'PASSWORD': env('DB_PASSWORD', default=''),
            'HOST': env('DB_HOST', default=''),
            'PORT': env('DB_PORT', default='5432'),
            'OPTIONS': {
                'connect_timeout': 10,
            },
        }
    }

# Static files for production
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Cloudinary configuration for media files (images, etc.)
# Use Cloudinary if credentials are provided, otherwise fall back to local storage
cloudinary_cloud_name = env('CLOUDINARY_CLOUD_NAME', default='').strip()
cloudinary_api_key = env('CLOUDINARY_API_KEY', default='').strip()
cloudinary_api_secret = env('CLOUDINARY_API_SECRET', default='').strip()

if cloudinary_cloud_name and cloudinary_api_key and cloudinary_api_secret:
    import cloudinary
    import cloudinary.uploader
    import cloudinary.api
    
    CLOUDINARY_STORAGE = {
        'CLOUD_NAME': cloudinary_cloud_name,
        'API_KEY': cloudinary_api_key,
        'API_SECRET': cloudinary_api_secret,
    }
    
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
    
    # Configure Cloudinary
    cloudinary.config(
        cloud_name=CLOUDINARY_STORAGE['CLOUD_NAME'],
        api_key=CLOUDINARY_STORAGE['API_KEY'],
        api_secret=CLOUDINARY_STORAGE['API_SECRET'],
    )
    
    # Media files will be served from Cloudinary CDN
    MEDIA_URL = '/media/'  # This will be overridden by Cloudinary URLs
    print(f"✅ Cloudinary configured successfully. Cloud Name: {cloudinary_cloud_name[:10]}...")
else:
    # Fallback to local storage if Cloudinary not configured
    missing = []
    if not cloudinary_cloud_name:
        missing.append('CLOUDINARY_CLOUD_NAME')
    if not cloudinary_api_key:
        missing.append('CLOUDINARY_API_KEY')
    if not cloudinary_api_secret:
        missing.append('CLOUDINARY_API_SECRET')
    print(f"⚠️  Cloudinary credentials not set. Missing: {', '.join(missing)}. Using local media storage (files won't persist on Render free tier).")

# Email configuration for production
# Render free tier blocks outbound SMTP, so we use Resend API (HTTP-based, works on free tier)
resend_api_key = env('RESEND_API_KEY', default='').strip()

if resend_api_key:
    # Use Resend API (works with Render free tier - no SMTP needed)
    EMAIL_BACKEND = 'config.email_backends.ResendEmailBackend'
    RESEND_API_KEY = resend_api_key
    DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='onboarding@resend.dev')
    # Admin email for notifications (separate from SMTP user)
    ADMIN_EMAIL = env('ADMIN_EMAIL', default='')
    # These are not used with Resend but kept for compatibility
    EMAIL_HOST = 'api.resend.com'
    EMAIL_PORT = 443
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = ADMIN_EMAIL or DEFAULT_FROM_EMAIL  # For backward compatibility
    EMAIL_HOST_PASSWORD = ''
    print(f"✅ Email configured with Resend API. From: {DEFAULT_FROM_EMAIL}, Admin: {ADMIN_EMAIL or 'Not set'}")
elif env('EMAIL_HOST_USER', default='').strip():
    # Fallback to SMTP (won't work on Render free tier, but useful for other deployments)
    email_host_user = env('EMAIL_HOST_USER', default='').strip()
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = env('EMAIL_HOST', default='smtp.gmail.com')
    EMAIL_PORT = env.int('EMAIL_PORT', default=587)
    EMAIL_USE_TLS = env.bool('EMAIL_USE_TLS', default=True)
    EMAIL_HOST_USER = email_host_user
    EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD', default='').strip()
    DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default=email_host_user)
    print(f"⚠️  Using SMTP backend (may not work on Render free tier): {EMAIL_HOST}:{EMAIL_PORT}")
else:
    # Fallback to console backend if no credentials configured
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
    EMAIL_HOST = 'localhost'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = ''
    EMAIL_HOST_PASSWORD = ''
    DEFAULT_FROM_EMAIL = 'noreply@naildbybola.com'
    print("⚠️  Email credentials not set. Emails will be printed to console.")
