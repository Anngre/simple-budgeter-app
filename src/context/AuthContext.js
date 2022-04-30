import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    authIsReady: false
  })
  
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setState( {
        user,
        authIsReady: true
      })
    })
  },[])

  return (
    <AuthContext.Provider value={state} >
      {children}
    </AuthContext.Provider>
  )
}