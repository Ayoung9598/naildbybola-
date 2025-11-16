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
# Use DATABASE_URL if available (Supabase, Neon, etc.), otherwise use individual variables
database_url = env('DATABASE_URL', default=None)
if database_url:
    # Supabase and other cloud providers require SSL
    # Append sslmode=require to connection string if it's a Supabase URL and doesn't already have SSL params
    import os
    if 'supabase.co' in database_url.lower() and 'sslmode' not in database_url.lower():
        # Append SSL mode to connection string
        separator = '&' if '?' in database_url else '?'
        database_url = f"{database_url}{separator}sslmode=require"
        # Update the environment variable for django-environ to use
        os.environ['DATABASE_URL'] = database_url
    
    # Parse DATABASE_URL and configure database
    # Use env.db() which will read from the (potentially modified) DATABASE_URL
    DATABASES = {
        'default': env.db()
    }
    
    # Ensure OPTIONS dict exists and add timeout
    DATABASES['default'].setdefault('OPTIONS', {})
    DATABASES['default']['OPTIONS']['connect_timeout'] = 15
    
    # For Supabase, add additional connection options to improve reliability
    if 'supabase.co' in database_url.lower():
        # Force IPv4 if possible (helps with network issues)
        # Add keepalive settings for better connection stability
        DATABASES['default']['OPTIONS'].update({
            'keepalives': 1,
            'keepalives_idle': 30,
            'keepalives_interval': 10,
            'keepalives_count': 5,
        })
        # Check if using pooler (recommended for serverless/containers)
        if 'pooler.supabase.com' in database_url.lower():
            print(f"✅ Database configured from DATABASE_URL")
            print(f"   Using Supabase Connection Pooler (recommended for containers)")
        else:
            print(f"✅ Database configured from DATABASE_URL")
            print(f"   Using Supabase Direct Connection")
            print(f"   💡 Tip: Consider using Connection Pooler URL for better reliability")
            print(f"      Get it from: Supabase Dashboard → Settings → Database → Connection Pooling")
    else:
        print(f"✅ Database configured from DATABASE_URL")
else:
    # Fall back to individual database variables (legacy support)
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
    print(f"⚠️  Using individual database variables (legacy mode). Consider using DATABASE_URL for cloud providers.")

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

# Always set RESEND_API_KEY in settings (even if empty) so email backend can check it
RESEND_API_KEY = resend_api_key

if resend_api_key:
    # Use Resend API (works with Render free tier - no SMTP needed)
    EMAIL_BACKEND = 'config.email_backends.ResendEmailBackend'
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
    print(f"   RESEND_API_KEY is set (length: {len(resend_api_key)})")
else:
    print(f"⚠️  RESEND_API_KEY not set or empty. Email sending will not work.")
    print(f"   Set RESEND_API_KEY in Render Dashboard → Environment variables")
    # Fallback to SMTP or console if Resend not configured
    if env('EMAIL_HOST_USER', default='').strip():
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
