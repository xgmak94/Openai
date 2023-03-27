# Use the official Node.js image as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's files to the container
COPY . .

# Build the app
RUN npm run build

# Expose the app's port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
