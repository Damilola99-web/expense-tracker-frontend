import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useAuthContext = () => {
    const userContext = useContext(AuthContext)

    return userContext
}