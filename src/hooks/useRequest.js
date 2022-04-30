import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useRequest = (action, path) => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const navigate = useNavigate()
  const request = async (...params) => {
    try {
      setError(null)
      setIsPending(true)
      await action(...params)
      navigate(path)
    } catch (error) {
        setError(error.message)
      } finally {
        setIsPending(false)
      }
    
  } 
  return { request, error, isPending }
}