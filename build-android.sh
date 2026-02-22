#!/bin/bash
# Life Sync Android Build Helper Script

echo "🚀 Life Sync Android Build Helper"
echo "=================================="
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."
echo ""

if command_exists java; then
    java_version=$(java -version 2>&1 | head -1)
    echo "✅ Java installed: $java_version"
else
    echo "❌ Java not found. Please install JDK 11 or newer"
    exit 1
fi

if [ -d "$ANDROID_HOME" ]; then
    echo "✅ Android SDK found at: $ANDROID_HOME"
else
    echo "⚠️  ANDROID_HOME not set. Make sure Android Studio is installed"
fi

echo ""
echo "Select an option:"
echo "1. Build React app for production"
echo "2. Sync changes to Android"
echo "3. Open Android Studio"
echo "4. Build debug APK (via command line)"
echo "5. Full build workflow (1 + 2)"
echo "6. Exit"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo "Building React app..."
        npm run build
        echo "✅ Build complete! Files in: ./dist"
        ;;
    2)
        echo "Syncing to Android..."
        npx cap sync android
        echo "✅ Sync complete!"
        ;;
    3)
        echo "Opening Android Studio..."
        npx cap open android
        ;;
    4)
        echo "Building debug APK..."
        npm run build
        npx cap sync android
        cd android
        ./gradlew assembleDebug
        cd ..
        echo "✅ APK built at: android/app/build/outputs/apk/debug/app-debug.apk"
        ;;
    5)
        echo "Running full build workflow..."
        npm run build
        npx cap sync android
        echo "✅ Ready to build APK in Android Studio or via gradlew"
        ;;
    6)
        echo "Goodbye!"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
