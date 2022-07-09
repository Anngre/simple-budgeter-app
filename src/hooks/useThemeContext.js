import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw Error('useAuthContext must be used inside ThemeContextProvider')
  }

  return context

}