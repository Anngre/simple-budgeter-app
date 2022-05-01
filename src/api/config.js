import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAzJBTTuAvkMEAWxmEn1BsJekl6TdJfrVM",
  authDomain: "simple-budgeter.firebaseapp.com",
  projectId: "simple-budgeter",
  storageBucket: "simple-budgeter.appspot.com",
  messagingSenderId: "841331074671",
  appId: "1:841331074671:web:6b91fcd9267e8b8fd38f9a"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }