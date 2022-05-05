import { useRequest } from "./useRequest";
import API from "../api/API";
import { useState } from "react";

export const useAddDocument = () => {
  const [docID, setDocID] = useState(null)
  const addDocument = async (collectionName, document) => {
    const id = await API.addDocument(collectionName, document)
    setDocID(id)
  }

  const { request, error, isPending } = useRequest(addDocument)
  return { docID, addDocument: request, error, isPending }
} 