import { useRequest } from "./useRequest"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../firebase/config"

export const useSignup = () => {

  const signup =  async (email, password, displayName) => {
    await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(auth.currentUser, {
        displayName
      })
    }

  const { request, error, isPending } = useRequest(signup, '/')
  
  return { signup: request, error, isPending }
}