#!/bin/bash

# Nail & Lash Website Setup Script

echo "🚀 Starting Nail & Lash Website Setup..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "✅ Docker is running"

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up --build -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run migrations
echo "📊 Running database migrations..."
docker-compose exec backend python manage.py migrate

# Create superuser (optional)
echo "👤 Creating admin user..."
echo "You can create an admin user by running:"
echo "docker-compose exec backend python manage.py createsuperuser"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   Admin Panel: http://localhost:8000/admin"
echo ""
echo "📝 To create an admin user:"
echo "   docker-compose exec backend python manage.py createsuperuser"
echo ""
echo "🛑 To stop the application:"
echo "   docker-compose down"
