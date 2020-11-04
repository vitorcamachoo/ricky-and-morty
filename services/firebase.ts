import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PID,
  appId: process.env.NEXT_PUBLIC_APPID,
}

try {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export default firebase

export const auth = firebase.auth()
export const providers = { google: new firebase.auth.GoogleAuthProvider() }
