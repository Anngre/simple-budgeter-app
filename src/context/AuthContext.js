import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [authIsReady, setAuthIsReady] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(user)
      setAuthIsReady(true)
    })
  },[])

  return (
    <AuthContext.Provider value={{user, authIsReady}} >
      {children}
    </AuthContext.Provider>
  )
}