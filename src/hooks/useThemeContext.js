import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

export const useThemeContext = () => {
    const themeContext = useContext(ThemeContext)

    return themeContext
}