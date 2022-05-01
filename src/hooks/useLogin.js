import { useRequest } from "./useRequest"
import API from "../api/API"


export const useLogin = () => {
  const login = async (email, password) => {
    await API.loginUser(email, password) 
  }
  const { request, error, isPending } = useRequest(login, '/')

  return { login: request, error, isPending }
}