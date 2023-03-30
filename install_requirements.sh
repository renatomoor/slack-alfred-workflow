#!/bin/bash
# Check if Homebrew is installed
if ! command -v brew &> /dev/null
then
    echo "Homebrew is not installed. Please install homebrew and run again this command"
    exit 1
else
    echo "Homebrew is already installed"
fi

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Installing..."
  # Install Node.js using Homebrew
  brew install node
else
  echo "Node.js is already installed."
fi

# Check if npm is installed
if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed. Installing..."
  # Install npm using Homebrew
  brew install npm
else
  echo "npm is already installed."
fi

# Check if pnpm is installed
if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is not installed. Installing..."
  # Install pnpm using npm
  npm install -g pnpm
else
  echo "pnpm is already installed."
fi

# Install packages
if [ ! -d "node_modules" ]; then
  echo "Node modules not found. Installing packages with pnpm..."
  NODE_ENV=production pnpm install
  if [ $? -eq 0 ]; then
    echo "Packages successfully installed."
  else
    echo "Error occurred while installing packages."
  fi
else
  echo "Packages are already installed."
fi
