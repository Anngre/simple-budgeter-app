import { useRequest } from "./useRequest"
import API from "../api/API"

export const useLogout = () => {
 
  const logout = async () => {
    await API.logoutUser()  
  }

  const { request, error, isPending } = useRequest(logout, '/login')

  return { logout: request, error, isPending }
}