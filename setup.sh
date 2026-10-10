#!/bin/bash
# CTF Labs Setup Script
# Bash script to install all dependencies

echo "🚩 CTF Labs Setup Script"
echo "========================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓ Node.js $NODE_VERSION found${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install Node.js from https://nodejs.org/${NC}"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓ npm $NPM_VERSION found${NC}"
else
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Installing dependencies for all labs...${NC}"
echo ""

# Install dependencies for each lab
labs=(
    "auth_misconfiguration_lab"
    "idor_ctf_lab"
    "weak_jwt_auth_lab"
    "image_stegnography_lab"
)

success_count=0
fail_count=0

for lab in "${labs[@]}"; do
    echo -e "${CYAN}Installing $lab...${NC}"
    
    if [ -d "$lab" ]; then
        cd "$lab"
        
        if npm install --silent; then
            echo -e "${GREEN}✓ $lab installed successfully${NC}"
            ((success_count++))
        else
            echo -e "${RED}✗ Failed to install $lab${NC}"
            ((fail_count++))
        fi
        
        cd ..
    else
        echo -e "${RED}✗ Directory $lab not found${NC}"
        ((fail_count++))
    fi
    
    echo ""
done

# Generate steganography challenge
echo -e "${CYAN}Generating Image Steganography challenge...${NC}"
cd image_stegnography_lab
if npm run generate; then
    echo -e "${GREEN}✓ Challenge image generated${NC}"
else
    echo -e "${RED}✗ Failed to generate challenge image${NC}"
fi
cd ..

echo ""
echo "========================="
echo -e "${GREEN}Setup Complete!${NC}"
echo "========================="
echo ""
echo -e "${GREEN}Successfully installed: $success_count labs${NC}"
if [ $fail_count -gt 0 ]; then
    echo -e "${RED}Failed: $fail_count labs${NC}"
fi

echo ""
echo -e "${YELLOW}To start a lab, run:${NC}"
echo "  cd <lab_name>"
echo "  npm start"
echo ""
echo -e "${YELLOW}Available labs:${NC}"
echo "  - auth_misconfiguration_lab (Port 4000)"
echo "  - idor_ctf_lab (Port 3001)"
echo "  - weak_jwt_auth_lab (Port 6000)"
echo "  - image_stegnography_lab (Port 7000)"
echo ""
echo -e "${CYAN}Happy Hacking! 🚩${NC}"
