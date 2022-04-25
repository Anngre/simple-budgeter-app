import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase/config"

export const useSignUp = () => {
  const [error, setError] = useState(null)
  const signup = async (email, password, displayName) => {
    try {
      setError(null)
      await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(auth.currentUser, {
          displayName
        })
        
    } catch (error) {
        setError(error.message)
      }
    
  } 
  return { signup, error }
}