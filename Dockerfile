# Build stage
FROM node:20.15-alpine AS build

WORKDIR /packages/solv

# Enable pnpm using Corepack and prepare the environment
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install necessary packages including openssh
RUN apk add --no-cache openssh

# Copy the package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json ./
COPY packages/solv /packages/solv/

# Install dependencies including devDependencies
RUN pnpm install

# Run the build command
RUN pnpm -F solv build

RUN echo $(ls -la)

# Command to start the application
CMD ["./dist/index.js"]