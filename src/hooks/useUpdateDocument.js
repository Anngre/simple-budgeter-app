import API from "../api/API";
import { useRequest } from "./useRequest";

export const useUpdateDocument = () => {

  const updateDocument = async(collection, docID, document) => {
    await API.updateDocument(collection, docID, document)
  }

  const { request, error, isPending } = useRequest(updateDocument)

  return { updateDocument: request, error, isPending }
}