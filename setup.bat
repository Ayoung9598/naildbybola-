@echo off
REM Nail & Lash Website Setup Script for Windows

echo 🚀 Starting Nail ^& Lash Website Setup...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)

echo ✅ Docker is running

REM Build and start containers
echo 🔨 Building and starting containers...
docker-compose up --build -d

REM Wait for database to be ready
echo ⏳ Waiting for database to be ready...
timeout /t 10 /nobreak >nul

REM Run migrations
echo 📊 Running database migrations...
docker-compose exec backend python manage.py migrate

echo.
echo 🎉 Setup complete!
echo.
echo 🌐 Access your application:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8000
echo    Admin Panel: http://localhost:8000/admin
echo.
echo 📝 To create an admin user:
echo    docker-compose exec backend python manage.py createsuperuser
echo.
echo 🛑 To stop the application:
echo    docker-compose down
echo.
pause
