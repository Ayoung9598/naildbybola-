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
# Upgrade pip first, then install dependencies
# Uninstall resend first if it exists (to avoid corrupted installs), then reinstall
RUN pip install --upgrade pip setuptools wheel && \
    pip uninstall -y resend || true && \
    pip install --no-cache-dir -r requirements.txt && \
    pip list | grep -i resend && \
    python -c "import resend; print('✅ Resend package imported successfully')" && \
    python -c "import resend; print(f'   Resend version: {getattr(resend, \"__version__\", \"unknown\")}')" || \
    (echo "❌ Failed to import resend package - trying to reinstall" && \
     pip uninstall -y resend && \
     pip install --no-cache-dir --force-reinstall resend && \
     python -c "import resend; print('✅ Resend package reinstalled and imported successfully')")

# Copy project
COPY . /app/

# Copy entrypoint script and make it executable
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Create directories for media and static files
RUN mkdir -p /app/media /app/staticfiles

# Expose port
EXPOSE 8000

# Set entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]

# Run the application
# For production, use gunicorn (Render sets PORT environment variable)
# The entrypoint script will run migrations before starting gunicorn
CMD ["sh", "-c", "gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 2 --threads 2 --timeout 60"]
