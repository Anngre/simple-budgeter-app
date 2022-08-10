import { useEffect, useState } from "react"
import API from "../api/API"

export const useGetSelectedDocument = (collectionName, whereClause) => {
  const [documents, setDocuments] = useState([])
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const unsub = API.observeSelectedDocument(collectionName, whereClause, (docs) => {
      const docsData = []
      docs.forEach((doc) => {
        docsData.push({...doc.data(), docID: doc.id})
      })
      setDocuments(docsData)
      setIsPending(false)
    }, (error) => {
      setError(error.message)
      setIsPending(false)
    })
    return unsub
  },[collectionName, whereClause])

  return { documents, isPending, error }
}