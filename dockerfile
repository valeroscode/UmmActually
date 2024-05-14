# Use the official Node.js image as a base
FROM node:18.15.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port on which your React app will run
EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]