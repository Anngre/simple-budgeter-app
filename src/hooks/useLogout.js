import { useRequest } from "./useRequest"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"

export const useLogout = () => {
 
  const logout = async () => {
    await signOut(auth)  
  }

  const { request, error, isPending } = useRequest(logout, '/login')

  return { logout: request, error, isPending }
}