# Life Sync Android Build Helper - PowerShell Version
# Run this script to build your Android APK

Write-Host "🚀 Life Sync Android Build Helper" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Function to check if command exists
function Test-CommandExists {
    param($command)
    try {
        if (Get-Command $command -ErrorAction Stop) {
            return $true
        }
    }
    catch {
        return $false
    }
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

if (Test-CommandExists java) {
    $javaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "✅ Java installed: $javaVersion" -ForegroundColor Green
}
else {
    Write-Host "❌ Java not found. Please install JDK 11 or newer" -ForegroundColor Red
    exit 1
}

if ($env:ANDROID_HOME) {
    Write-Host "✅ Android SDK found at: $env:ANDROID_HOME" -ForegroundColor Green
}
else {
    Write-Host "⚠️  ANDROID_HOME not set. Make sure Android Studio is installed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Select an option:" -ForegroundColor Cyan
Write-Host "1. Build React app for production"
Write-Host "2. Sync changes to Android"
Write-Host "3. Open Android Studio"
Write-Host "4. Build debug APK (via command line)"
Write-Host "5. Full build workflow (1 + 2 + 4)"
Write-Host "6. Exit"
Write-Host ""

$choice = Read-Host "Enter your choice (1-6)"

switch ($choice) {
    "1" {
        Write-Host "Building React app..." -ForegroundColor Yellow
        npm run build
        Write-Host "✅ Build complete! Files in: ./dist" -ForegroundColor Green
    }
    "2" {
        Write-Host "Syncing to Android..." -ForegroundColor Yellow
        npx cap sync android
        Write-Host "✅ Sync complete!" -ForegroundColor Green
    }
    "3" {
        Write-Host "Opening Android Studio..." -ForegroundColor Yellow
        npx cap open android
    }
    "4" {
        Write-Host "Building debug APK..." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Step 1: Building React app..." -ForegroundColor Yellow
        npm run build
        Write-Host ""
        Write-Host "Step 2: Syncing to Android..." -ForegroundColor Yellow
        npx cap sync android
        Write-Host ""
        Write-Host "Step 3: Building APK with Gradle..." -ForegroundColor Yellow
        Push-Location android
        .\gradlew assembleDebug
        Pop-Location
        Write-Host ""
        Write-Host "✅ APK built at: android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor Green
    }
    "5" {
        Write-Host "Running full build workflow..." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Step 1: Building React app..." -ForegroundColor Yellow
        npm run build
        Write-Host ""
        Write-Host "Step 2: Syncing to Android..." -ForegroundColor Yellow
        npx cap sync android
        Write-Host ""
        Write-Host "Step 3: Building APK with Gradle..." -ForegroundColor Yellow
        Push-Location android
        .\gradlew assembleDebug
        Pop-Location
        Write-Host ""
        Write-Host "✅ APK built successfully!" -ForegroundColor Green
        Write-Host "   Location: android\app\build\outputs\apk\debug\app-debug.apk" -ForegroundColor Green
    }
    "6" {
        Write-Host "Goodbye!" -ForegroundColor Cyan
    }
    default {
        Write-Host "Invalid choice" -ForegroundColor Red
        exit 1
    }
}
