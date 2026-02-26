# Build stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["node", "server.js"]
