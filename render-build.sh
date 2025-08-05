#!/bin/bash

# Render.com build script for portfolio deployment
echo "Starting Render build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the frontend
echo "Building frontend..."
npm run build

# Ensure SwarnavaCV.pdf is accessible
echo "Setting up static CV file..."
cp SwarnavaCV.pdf dist/ 2>/dev/null || echo "SwarnavaCV.pdf already in place"

# Create uploads directory for runtime (even though we don't use it)
mkdir -p server/uploads

echo "Build completed successfully!"