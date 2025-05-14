# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy server package files and install dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy server source code and env
COPY server/ ./server/

# Copy pre-built React build folder
COPY client/build ./client/build



# Set environment variables
ENV NODE_ENV=production
ENV PORT=5001

# Expose port
EXPOSE 5001

# Start the app
CMD ["node", "server/server.js"]
