# EmberMate Mobile App

EmberMate is an Expo-based React Native app for caregivers. This repo is a clean, self-contained mobile project.

## Run Locally

```bash
git clone https://github.com/ysorallc-cloud/EmberMate-V3.git
cd EmberMate-V3
npm install
npx expo start
```

The Expo CLI will prompt you to open the app in Expo Go, an iOS simulator, or an Android emulator.

## EAS Build Commands

```bash
# one-time setup
npx expo login
npm install -g eas-cli
eas init

# build for iOS
eas build --platform ios

# build for Android
eas build --platform android
```

Refer to [Expo docs](https://docs.expo.dev) for store submission steps and advanced configuration.
