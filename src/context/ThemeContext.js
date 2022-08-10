import { createContext } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useGetDocument } from "../hooks/useGetDocument"

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) => {
  const { user } = useAuthContext()
  const { document: userDoc } = useGetDocument('users', user?.uid)
  const isDarkModeActive = user && userDoc?.themeMode === 'dark' ? true : false

  return <ThemeContext.Provider value={{isDarkModeActive}}>
    {children}
  </ThemeContext.Provider>
}