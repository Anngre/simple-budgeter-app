import { db, auth } from './config'
import { createUserWithEmailAndPassword, updateProfile ,signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


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
}

export default new API()

