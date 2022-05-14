import { useEffect, useState } from "react"
import API from "../api/API"
export const useGetDocument = (collectionName, docID) => {
  const [document, setDocument] = useState(null) 
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  useEffect(() => {
    if (docID) {
      setIsPending(true)
      const unsub = API.observeDocument(collectionName, docID, (doc) => {
        setDocument(doc.data())   
        setIsPending(false)
      }, (error) => {
          setError(error.message)
          setIsPending(false)
        })
      return unsub
    }
  },[docID])

  return { document, isPending, error }
  
}