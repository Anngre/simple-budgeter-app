import { useRequest } from "./useRequest"
import API from "../api/API"

export const useSignup = () => {

  const signup =  async (email, password, displayName) => {
   
    await API.signupUser(email, password, displayName)
  }

  const { request, error, isPending } = useRequest(signup, '/')
  
  return { signup: request, error, isPending }
}