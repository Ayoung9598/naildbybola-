FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Set work directory
WORKDIR /app

# Install system dependencies with retry logic
# Retry up to 3 times with exponential backoff
RUN for i in 1 2 3; do \
        apt-get update --fix-missing && \
        apt-get install -y --no-install-recommends \
            postgresql-client \
            build-essential \
            libpq-dev \
            curl \
        && rm -rf /var/lib/apt/lists/* \
        && break || sleep $((i * 10)); \
    done

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /app/

# Create directories for media and static files
RUN mkdir -p /app/media /app/staticfiles

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
