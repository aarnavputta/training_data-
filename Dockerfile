# Use Node.js image for building the app
FROM node:20-slim AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the React app
COPY . . 
RUN npm run build

# Use a lightweight web server for production
FROM node:20-slim

WORKDIR /app

# Install serve package globally
RUN npm install -g serve

# Copy the build folder from the previous stage
COPY --from=build /app/dist /app/dist

# Serve the application
CMD ["serve", "-s", "dist", "-l", "8080"]
