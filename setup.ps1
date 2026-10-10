# CTF Labs Setup Script
# PowerShell script to install all dependencies

Write-Host "🚩 CTF Labs Setup Script" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✓ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies for all labs..." -ForegroundColor Yellow
Write-Host ""

# Install dependencies for each lab
$labs = @(
    "auth_misconfiguration_lab",
    "idor_ctf_lab",
    "weak_jwt_auth_lab",
    "image_stegnography_lab"
)

$successCount = 0
$failCount = 0

foreach ($lab in $labs) {
    Write-Host "Installing $lab..." -ForegroundColor Cyan
    
    if (Test-Path $lab) {
        Push-Location $lab
        
        try {
            npm install --silent
            Write-Host "✓ $lab installed successfully" -ForegroundColor Green
            $successCount++
        } catch {
            Write-Host "✗ Failed to install $lab" -ForegroundColor Red
            $failCount++
        }
        
        Pop-Location
    } else {
        Write-Host "✗ Directory $lab not found" -ForegroundColor Red
        $failCount++
    }
    
    Write-Host ""
}

# Generate steganography challenge
Write-Host "Generating Image Steganography challenge..." -ForegroundColor Cyan
Push-Location image_stegnography_lab
try {
    npm run generate
    Write-Host "✓ Challenge image generated" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to generate challenge image" -ForegroundColor Red
}
Pop-Location

Write-Host ""
Write-Host "=========================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Successfully installed: $successCount labs" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "Failed: $failCount labs" -ForegroundColor Red
}

Write-Host ""
Write-Host "To start a lab, run:" -ForegroundColor Yellow
Write-Host "  cd <lab_name>" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "Available labs:" -ForegroundColor Yellow
Write-Host "  - auth_misconfiguration_lab (Port 4000)" -ForegroundColor White
Write-Host "  - idor_ctf_lab (Port 3001)" -ForegroundColor White
Write-Host "  - weak_jwt_auth_lab (Port 6000)" -ForegroundColor White
Write-Host "  - image_stegnography_lab (Port 7000)" -ForegroundColor White
Write-Host ""
Write-Host "Happy Hacking! 🚩" -ForegroundColor Cyan
