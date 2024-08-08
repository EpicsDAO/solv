# Use the official Ubuntu 22.04 (Jammy) image
FROM node:20-bullseye-slim AS build

# Set the working directory
WORKDIR /home/solv

# Enable pnpm using Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install necessary packages for managing GPG keys and other build essentials
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    ca-certificates \
    apt-transport-https \
    build-essential \
    python3 \
    openssh-client \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY packages/solv /home/solv/

# Install dependencies including devDependencies
RUN pnpm install

# Rebuild native modules if necessary
RUN pnpm rebuild

# Run the build command
RUN pnpm -F solv build

# Command to start the application
CMD ["node", "./dist/index.js"]
