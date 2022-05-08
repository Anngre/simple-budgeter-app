import { db, auth } from './config'
import { createUserWithEmailAndPassword, updateProfile ,signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp, doc, setDoc, onSnapshot } from 'firebase/firestore'


class API {

  async signupUser(email, password, displayName) {
    await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(auth.currentUser, {
        displayName
      })
     }
  
  async loginUser(email, password) {
    await signInWithEmailAndPassword(auth, email, password) 
  }

  async logoutUser() {
    await signOut(auth)  
  }

  observeUser(onUserChange) {
    return onAuthStateChanged(auth, onUserChange)   
  }

  async addDocument(collectionName, document) {
    const docRef = await addDoc(collection(db, collectionName), {
      ...document,
      createdAt: serverTimestamp()
    })
   return docRef.id
   
  }

  async updateDocument(collectionName, docID, document) {
    await setDoc(doc(db, collectionName, docID), document)
  }

  observeDocument(collectionName,  docID, onDocChange) {
    return onSnapshot(doc(db, collectionName, docID), onDocChange)
  }
  
}

export default new API()

