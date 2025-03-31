# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project files
COPY . .

# Build the React app
RUN npm run build

# Install serve globally to serve the static files
RUN npm install -g serve

# Expose the correct port for production (5174)
EXPOSE 5174

# Start the server to serve the built frontend
CMD ["serve", "-s", "dist", "-l", "5174"]