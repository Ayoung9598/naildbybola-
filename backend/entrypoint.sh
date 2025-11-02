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

# Create superuser from environment variables (if set)
# This works on Render free tier without shell access
echo "👤 Checking for superuser creation..."
python manage.py create_superuser_from_env || echo "⚠️  Superuser creation skipped (env vars not set or already exists)"

echo "🎯 Starting Gunicorn..."
exec "$@"

