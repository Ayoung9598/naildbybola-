# Stage 1: Build React application
FROM node:18-alpine AS build

# Accept build argument for API URL (defaults to production URL)
ARG REACT_APP_API_URL=https://naildbybola-backend.onrender.com/api
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
# Using npm install instead of npm ci to handle missing package-lock.json
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy source code
COPY . .

# Build the React app (with environment variable available)
# React will replace process.env.REACT_APP_API_URL at build time
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
