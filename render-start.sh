#!/bin/bash

# Render.com start script
echo "Starting portfolio application..."

# Ensure database schema is up to date
echo "Pushing database schema..."
npm run db:push

# Start the production server
echo "Starting server..."
npm start