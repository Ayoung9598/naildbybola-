#!/bin/bash
set -e

echo "🚀 Starting Django application..."

# Wait for database to be ready (with better error handling)
echo "⏳ Waiting for database to be ready..."
max_attempts=30
attempt=0

# Check database connection
while [ $attempt -lt $max_attempts ]; do
  # Try to check database connection
  if python manage.py check --database default > /dev/null 2>&1; then
    echo "✅ Database is ready!"
    break
  fi
  
  # If check fails, try migrate --plan as fallback
  if python manage.py migrate --plan > /dev/null 2>&1; then
    echo "✅ Database is ready!"
    break
  fi
  
  attempt=$((attempt + 1))
  echo "   Attempt $attempt/$max_attempts: Database not ready yet, waiting..."
  
  # Show error on last few attempts for debugging
  if [ $attempt -gt $((max_attempts - 3)) ]; then
    echo "   Debug: Trying to connect..."
    python manage.py check --database default 2>&1 | head -5 || true
  fi
  
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "❌ Database connection failed after $max_attempts attempts"
  echo "   Please check:"
  echo "   - DATABASE_URL is set correctly in environment variables"
  echo "   - Database credentials are correct"
  echo "   - Database is accessible from Render (check firewall/network settings)"
  echo "   - For Supabase: Ensure SSL is enabled (should be automatic)"
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

