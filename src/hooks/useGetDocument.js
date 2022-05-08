import { useEffect, useState } from "react"
import API from "../api/API"
export const useGetDocument = (collectionName, docID) => {
  const [document, setDocument] = useState(null)   
  useEffect(() => {
    if (docID) {
      const unsub = API.observeDocument(collectionName, docID, (doc) => {
        setDocument(doc.data())
      })
      return unsub
    }
  },[docID])

  return document
  
}