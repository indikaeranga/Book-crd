# Stage 1: build dependencies
FROM node:18-alpine AS builder
WORKDIR /app

# Copy and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Stage 2: smaller runtime image
FROM node:18-alpine
WORKDIR /app

# Copy built app and production node_modules
COPY --from=builder /app ./

# Expose the backend port
EXPOSE 3030

# Set environment variable for production
ENV NODE_ENV=production

# Run app in production mode
CMD ["npm", "start"]
