# (Unofficial) NextJS + Material UI + Firebase Boilerplate


<a href="https://nextjs.org">
  <img src="https://firebasestorage.googleapis.com/v0/b/nextjs-mui-firebase-2022.appspot.com/o/assets%2Fnextjs.png?alt=media&token=7663c442-45d0-43a8-a9e0-a9908181acf9">
</a>
<a href="https://mui.com">
  <img src="https://firebasestorage.googleapis.com/v0/b/nextjs-mui-firebase-2022.appspot.com/o/assets%2Fmaterialui.png?alt=media&token=cab4d3a4-72f4-4ce0-8833-f267dd72ebeb">
</a>
<a href="https://firebase.com">
  <img src="https://firebasestorage.googleapis.com/v0/b/nextjs-mui-firebase-2022.appspot.com/o/assets%2Ffirebase.png?alt=media&token=e84c9be1-02c4-4168-b9db-7e223e57af3a">
</a>

Go to the [NextJS](https://nextjs.org/docs), [Material UI](https://mui.com/material-ui/getting-started/overview/), and [Firebase](https://firebase.google.com/docs) documentation to learn more.

**Please, keep in mind this is configured to be a static website (non-SSR), thus no server auth and Firebase Clould Functions is needed.**

## Live Demo
https://nextjs-mui-firebase-2022.firebaseapp.com/

## Install

Make sure to install the dependencies:

```bash
# yarn
yarn install

or

# npm
npm install
```

## Create Firebase Project

Create a firebase project at [Firebase Console](https://console.firebase.google.com/).

After the project is created, on firebase console, go to **Project settings** (gear icon on the top left).

Go to **Your apps** and create a web app.

After created, you should see a block of code with your firebase configuration (apiKey, authDomain, etc).

Create a `.env.local` file on the root directory of the project and add your config as the example below:

```javascript
FIREBASE_API_KEY='XXxxxxxxXXXXxxxxXXXXXXxxxxXXXXXXxxxx'
FIREBASE_AUTH_DOMAIN="XXXXXXXXXXXX.firebaseapp.com"
FIREBASE_PROJECT_ID="XXXXXXXXXXXXX"
FIREBASE_STORAGE_BUCKET="XXXXXXXXXXXXX.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="00000000000"
FIREBASE_APP_ID="1:000000000000:web:XXXxxxxxxXXXXXxxxXXXxx"

// Name of docs in firebase
NEXT_PUBLIC_DOC_NAME="quote"

// Name of the profile photos (avatar) folder in Fire Storage
NEXT_PUBLIC_PHOTOS_FOLDER="profilePhotos"
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Initialize firebase-tools
```
firebase login
firebase init
```

Type Y for yes.
```
Are you ready to proceed? (Y/n) Y
```

Select Firestore, Hosting, and Storage.
```
Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 ( ) Remote Config: Configure a template file for Remote Config
 ( ) Realtime Database: Configure a security rules file for Realtime Database and (optionally) provision default instance
 (*) Firestore: Configure security rules and indexes files for Firestore
 ( ) Functions: Configure a Cloud Functions directory and its files
 (*) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ( ) Hosting: Set up GitHub Action deploys
 (*) Storage: Configure a security rules file for Cloud Storage
```

Press Enter and choose no if asks you to overwrite the existing file.
```
What file should be used for Firestore Rules? (firestore.rules)
```

Press Enter and choose no if asks you to overwrite the existing file.
```
What file should be used for Firestore indexes? (firestore.indexes.json)
```

This step is important to Hosting to work.
```
What do you want to use as your public directory? (public) out
```

This step is also important to Hosting to work.
```
Configure as a single-page app (rewrite all urls to /index.html)? (y/N) N
```

(Optional) I usually select No.
```
Set up automatic builds and deploys with GitHub? (y/N) N
```

(Optional)
```
File .output/public/404.html already exists. Overwrite? (y/N) N
```

(Optional)
```
File .output/public/index.html already exists. Overwrite? (y/N) N
```

Press Enter and choose no if asks you to overwrite the existing file.
```
What file should be used for Storage Rules? (storage.rules)
```

(Almost) DONE!

You now need to generate the Nuxt static files. For that, change the build script in package.json from `next build` to `next build && next export` and run it.
```
npm run build
```

And deploy everything to firebase.
```
firebase deploy
```
