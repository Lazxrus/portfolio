# Use the official Nginx image as the base image
FROM node:alpine AS build

# Set a working directory
WORKDIR /app

# Copy the configuration file
COPY client/package*.json ./

# Install dependencies ci is used to install the exact versions of dependencies specified in package-lock.json
RUN npm ci

# Copy source code
COPY client/ ./

# Run npm build to create the production build
RUN npm run build

# Production stage
FROM nginx:alpine

# Set a working directory
WORKDIR /usr/share/nginx/html

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that Nginx will listen on
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]