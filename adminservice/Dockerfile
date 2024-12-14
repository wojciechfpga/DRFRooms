# Start from a Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose the port for Daphne
EXPOSE 8000

# Default command to run Daphne
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "adminservice.asgi:application"]

