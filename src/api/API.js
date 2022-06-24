import { db, auth } from './config'
import { createUserWithEmailAndPassword, updateProfile ,signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp, doc, setDoc, onSnapshot, updateDoc, query, where } from 'firebase/firestore'


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

  async addDocument(collectionName, document, docID) {
    if (docID) {
      await setDoc(doc(db, collectionName, docID), document)
    } else {
        const docRef = await addDoc(collection(db, collectionName), {
          ...document,
          createdAt: serverTimestamp()
        })
        return docRef.id
      }
  }

  async updateDocument(collectionName, docID, data) {
    await updateDoc(doc(db, collectionName, docID), data)
  }

  observeDocument(collectionName,  docID, onDocChange, onDocChangeError) {
    return onSnapshot(doc(db, collectionName, docID), onDocChange, onDocChangeError)
  }

  observeSelectedDocument(collectionName, whereClause, onDocsChange, onDocsChangeError) {
    const q = query(collection(db, collectionName), where(...whereClause))
    return onSnapshot(q, onDocsChange, onDocsChangeError)
  }
  
}

export default new API()

