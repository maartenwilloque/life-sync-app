# Building Life Sync Android APK with Capacitor

Your app is now ready to be built as an Android APK! Here's how to complete the process.

## Prerequisites

You need to have installed:
- **Java Development Kit (JDK) 11 or newer** - https://www.oracle.com/java/technologies/downloads/
- **Android SDK** - via Android Studio: https://developer.android.com/studio
- **Gradle** - Usually installed with Android Studio

Verify installations:
```bash
java -version
```

## Option 1: Build via Android Studio (Recommended for Beginners)

### Step 1: Open the Android Project
```bash
npx cap open android
```
This opens Android Studio with your project ready to build.

### Step 2: Build the APK in Android Studio
1. In Android Studio, go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for the build to complete
3. Android Studio will show you where the APK was saved
4. The APK will be in: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 3: Transfer to Phone or Distribute
- Email the APK to yourself
- Use `adb` to install: `adb install app-debug.apk`
- Share directly with others to install

---

## Option 2: Build via Command Line (Advanced)

### Step 1: Sync Latest Changes
```bash
npx cap sync android
```
Run this whenever you update your React code.

### Step 2: Build Debug APK
```bash
cd android
./gradlew assembleDebug
cd ..
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 3: Build Release APK (for Distribution)
For Google Play Store or public distribution, create a signed release APK:

```bash
cd android
./gradlew assembleRelease
cd ..
```

You'll need to create a keystore file for signing:
```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

Then sign the APK:
```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk my-key-alias
```

---

## Development Workflow

After making changes to your React app:

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Sync to Android:**
   ```bash
   npx cap sync android
   ```

3. **Rebuild APK** using one of the methods above

---

## Installation on Android Phone

### Method 1: Direct APK Installation
1. Transfer the APK to your phone
2. Open file manager
3. Tap the APK file
4. Tap "Install"
5. Allow unknown sources if prompted

### Method 2: Using ADB (Advanced)
```bash
adb install app-debug.apk
```

### Method 3: Android Studio
- Connect your phone with USB debugging enabled
- In Android Studio, click **Run** → Select your device

---

## Troubleshooting

**"gradle command not found"**
- Add Android SDK to your PATH
- Or use: `./gradlew` instead of `gradle`

**"Java not found"**
- Install JDK 11+
- Add JAVA_HOME to environment variables

**"Build fails"**
- Run: `npx cap sync android`
- Clean gradle: `cd android && ./gradlew clean && cd ..`
- Rebuild

---

## Next Steps: Google Play Store

To publish on Google Play Store:
1. Create Google Play Developer account ($25 one-time)
2. Generate signed release APK (see above)
3. Create app listing on Google Play Console
4. Upload APK and complete store listing
5. Submit for review

---

## Important Notes

- **Data Privacy**: All data stays on the user's phone (localStorage)
- **Offline**: App works completely offline - no server required
- **Updates**: Users can manually update by installing new APK
- **Size**: Debug APK ~50MB, Release APK ~35MB (normal for React apps)

Happy building! 🚀
