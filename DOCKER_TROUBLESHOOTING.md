# Docker Build Troubleshooting Guide

## Network Connectivity Issues

### Problem: `Could not resolve 'deb.debian.org'`

This error occurs when Docker cannot reach Debian package repositories during the build process.

### Solutions

#### Solution 1: Check Docker DNS Settings

1. **Windows (Docker Desktop):**
   - Open Docker Desktop
   - Go to Settings → Resources → Network
   - Ensure "Enable host networking" is enabled
   - Go to Docker Engine → Add this to JSON:
   ```json
   {
     "dns": ["8.8.8.8", "8.8.4.4"]
   }
   ```
   - Click "Apply & Restart"

2. **Check your internet connection:**
   ```bash
   ping deb.debian.org
   ping 8.8.8.8
   ```

#### Solution 2: Use Docker Build with Network Mode

```bash
docker-compose build --network=host
```

#### Solution 3: Clean Docker Cache and Retry

```bash
# Clean Docker cache
docker system prune -a

# Rebuild with no cache
docker-compose build --no-cache --pull

# Start services
docker-compose up
```

#### Solution 4: Manual Package Installation (Alternative Dockerfile)

If network issues persist, you can try building without some packages:

```dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install only essential packages first
RUN apt-get update && \
    apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

# PostgreSQL client might work if network is intermittent
RUN apt-get update && \
    apt-get install -y postgresql-client libpq-dev build-essential || echo "Some packages failed, continuing..." && \
    rm -rf /var/lib/apt/lists/*
```

#### Solution 5: Use Pre-built Base Images

Instead of installing packages during build, you could:
1. Use a base image that already has these packages
2. Build images when you have stable internet
3. Use Docker image caching more effectively

### Quick Fix: Try Building Again

Often network issues are temporary. Try:

```bash
# Stop any running containers
docker-compose down

# Clean build
docker-compose build --no-cache

# If still failing, try building services individually
docker-compose build backend
docker-compose build frontend
docker-compose build db
```

### Verify Docker Network

```bash
# Test Docker's network connectivity
docker run --rm alpine ping -c 3 8.8.8.8

# Test DNS resolution
docker run --rm alpine nslookup deb.debian.org
```

### Alternative: Build Without Docker (Development Only)

If Docker build keeps failing, you can run locally:

#### Backend (without Docker):
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend (without Docker):
```bash
cd frontend
npm install
npm start
```

#### Database (use Docker for just the DB):
```bash
# Start only PostgreSQL
docker-compose up db -d

# Then run backend locally as above
```

### Check Docker Desktop Settings

1. Open Docker Desktop
2. Go to Settings → General
3. Ensure "Use WSL 2 based engine" is checked (if on Windows)
4. Ensure "Virtualization" is enabled in BIOS
5. Restart Docker Desktop

### Contact Your Network Administrator

If you're on a corporate network:
- Firewall might be blocking Docker
- Proxy settings might need configuration
- VPN might interfere with Docker networking

### Summary

**Most likely fix:** Update Docker DNS settings to use Google DNS (8.8.8.8, 8.8.4.4) and restart Docker Desktop.

**Quick test:** Run `docker run --rm alpine ping -c 3 8.8.8.8` to verify Docker has internet access.

