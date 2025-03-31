# Use an official Node.js image for building the React app
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies, including devDependencies required for build
RUN npm install

# Copy the entire project files
COPY . .

# Ensure Vite is accessible
ENV PATH="/app/node_modules/.bin:$PATH"

# Build the React app
RUN npm run build

# Use a lightweight Nginx image for serving the static files
FROM nginx:alpine AS runner

# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 5174
EXPOSE 5174

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
