# Use Node.js LTS version as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]
