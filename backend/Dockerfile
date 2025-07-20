# Use Node.js 18 Alpine as a base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package files first for faster builds
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port (match your backend .env PORT)
EXPOSE 5000

# Run the app
CMD ["node", "server.js"]
