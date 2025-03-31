# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package*.json ./

# Install dependencies (including devDependencies for the build process)
RUN npm install

# Copy the entire project files
COPY . .

# Ensure vite is available in PATH
ENV PATH="/app/node_modules/.bin:$PATH"

# Build the React app
RUN npm run build

# Remove devDependencies to keep the final image light
RUN npm prune --production

# Install serve globally to serve the static files
RUN npm install -g serve

# Expose the correct port for production (5174)
EXPOSE 5174

# Start the server to serve the built frontend
CMD ["serve", "-s", "dist", "-l", "5174"]
