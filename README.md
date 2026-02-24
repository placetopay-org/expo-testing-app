# Expo Testing App

Hybrid mobile app built with Expo to test web checkout integrations inside a mobile-like environment.

The app allows you to:

- Open a URL inside an in-app WebView
- Open a URL in the device's external Browser
- Test mobile web flows quickly using a real device

---

## Requirements

- Node.js (LTS recommended)
- npm installed
- Expo Go installed on your phone (Android or iOS)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/placetopay-org/expo-testing-app.git
cd expo-testing-app
```

Install dependencies:

```bash
npm install
```

---

## Run the Project

Start the development server:

```bash
npx expo start
```

This will generate a QR code in the terminal and browser.

---

## Run on a Physical Device

1. Open **Expo Go** on your phone.
2. Scan the QR code shown after running:

```bash
npx expo start
```

The app will load automatically.

---

## Run on Emulator

After starting the project:

- Press `a` → Android emulator
- Press `i` → iOS simulator _(Mac only)_

---

## Optional: Run in Snack

This project can also be adapted to run in [Snack](https://snack.expo.dev) for quick demos.

> **Note:** Snack may not support the latest Expo SDK versions. For consistent results, use `npx expo start`.
