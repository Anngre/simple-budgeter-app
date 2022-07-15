import { useRequest } from "./useRequest";
import API from "../api/API";

export const useAddDocument = () => {
  const addDocument = async (collectionName, document,  docID) => {
    const id = await API.addDocument(collectionName, document, docID)
    return id
  }

  const { request, error, isPending, result } = useRequest(addDocument)
  return { addDocument: request, error, isPending, docID: result }
} 