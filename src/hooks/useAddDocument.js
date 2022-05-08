import { useRequest } from "./useRequest";
import API from "../api/API";
import { useState } from "react";

export const useAddDocument = () => {
  const addDocument = async (collectionName, document) => {
    const id = await API.addDocument(collectionName, document)
    return id
  }

  const { request, error, isPending, result } = useRequest(addDocument)
  return { addDocument: request, error, isPending, docID: result }
} 