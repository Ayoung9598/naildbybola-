#!/bin/bash
set -e

echo "🚀 Starting Django application..."

# Wait for database to be ready (simple check)
echo "⏳ Waiting for database to be ready..."
max_attempts=30
attempt=0

# Check database connection
while [ $attempt -lt $max_attempts ]; do
  if python manage.py migrate --plan > /dev/null 2>&1; then
    echo "✅ Database is ready!"
    break
  fi
  attempt=$((attempt + 1))
  echo "   Attempt $attempt/$max_attempts: Database not ready yet, waiting..."
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "❌ Database connection failed after $max_attempts attempts"
  exit 1
fi

# Run migrations
echo "🔄 Running migrations..."
python manage.py migrate --noinput

# Collect static files (in case buildCommand didn't work)
echo "📦 Collecting static files..."
python manage.py collectstatic --noinput || echo "⚠️  Static files collection failed (may not be critical)"

# Create superuser if it doesn't exist (optional - you can remove this if not needed)
# echo "👤 Checking for superuser..."
# python manage.py shell << EOF
# from django.contrib.auth import get_user_model
# User = get_user_model()
# if not User.objects.filter(username='admin').exists():
#     print("Creating default superuser...")
#     User.objects.create_superuser('admin', 'admin@example.com', 'changeme123')
#     print("Superuser created: username=admin, password=changeme123")
# else:
#     print("Superuser already exists")
# EOF

echo "🎯 Starting Gunicorn..."
exec "$@"

