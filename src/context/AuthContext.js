import { createContext, useEffect, useState } from "react";
import API from "../api/API";
export const AuthContext = createContext()


export const AuthContextProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
    authIsReady: false
  })


  
  useEffect(() => {
    const unsub = API.observeUser((user) => {
      setState({
        user,
        authIsReady: true
      })
    })

    return unsub
  },[])

  return (
    <AuthContext.Provider value={state} >
      {children}
    </AuthContext.Provider>
  )
}