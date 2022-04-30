import { useRequest } from "./useRequest"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/config"

export const useLogin = () => {
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password) 

  }
  const { request, error, isPending } = useRequest(login, '/')

  return { login: request, error, isPending }
}