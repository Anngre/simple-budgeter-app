import { useRequest } from "./useRequest"
import API from "../api/API"

export const useSignup = () => {
  
  const signup =  async (email, password, displayName) => {
   
    const userUID = await API.signupUser(email, password, displayName)
    await API.addDocument('users', {
      currentBudgetID: null,
      themeMode: 'light',
    }, userUID)
  }

  const { request, error, isPending } = useRequest(signup, '/')

  return { signup: request, error, isPending }
}