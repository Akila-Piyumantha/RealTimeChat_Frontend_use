# Use the official Node.js image as the builder
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the entire project and build
COPY . .
RUN npm run build

# Use a lightweight Nginx image for serving static files
FROM nginx:alpine

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the correct port for production
EXPOSE 5174

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
