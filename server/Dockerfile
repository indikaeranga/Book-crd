# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Stage 2: Runtime stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./

# Expose the backend port
EXPOSE 3030

# Set environment variable for production
ENV NODE_ENV=production

# Start the backend
CMD ["node", "index.js"]
