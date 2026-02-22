# Android APK Build - Quick Reference

## 📱 Your App is Ready to Build!

### Fastest Way to Build APK (5 minutes)

```powershell
# In PowerShell, from your project folder:
.\build-android.ps1
```

Select option **5** and it will:
1. ✅ Build React app
2. ✅ Sync to Android
3. ✅ Build debug APK

APK location: `android\app\build\outputs\apk\debug\app-debug.apk`

---

## 🔧 What You Need First

- **Java**: Download JDK 11+ (https://www.oracle.com/java/technologies/downloads/)
- **Android Studio**: Download (https://developer.android.com/studio)
- **~5 GB disk space** for Android SDK

---

## 📋 Manual Steps (No Script)

```powershell
# 1. Build React production version
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Open Android Studio
npx cap open android

# 4. In Android Studio: Build > Build APK(s)
```

---

## 📲 Installation Methods

**Method 1: Direct APK (Easiest)**
- Email yourself the APK from `android\app\build\outputs\apk\debug\app-debug.apk`
- Download on phone, tap to install

**Method 2: Android Studio**
- Connect phone via USB (enable Developer Options)
- Click Run button in Android Studio
- App installs automatically

**Method 3: Command Line**
```powershell
adb install android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🚀 After You Update Your App

Every time you change the React code:

```powershell
npm run build          # Build React
npx cap sync android   # Copy to Android
# Then rebuild APK using Android Studio or gradlew
```

---

## 🎯 For Google Play Store

1. Create release APK (signed)
2. Pay $25 for developer account
3. Upload to Google Play Console
4. Submit for review

See **ANDROID_BUILD_GUIDE.md** for detailed steps.

---

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| "gradle not found" | Use Android Studio GUI or check PATH |
| "Java not found" | Install JDK 11+, set JAVA_HOME |
| "Build fails" | Run `npx cap sync android` first |
| "Phone not recognized" | Enable USB Debugging in phone settings |

---

## 📚 More Info

- **Full Guide**: See `ANDROID_BUILD_GUIDE.md`
- **Setup Details**: See `ANDROID_SETUP_READY.md`
- **Capacitor Docs**: https://capacitorjs.com/docs

---

**You're ready!** Build your first APK now. 🎉
