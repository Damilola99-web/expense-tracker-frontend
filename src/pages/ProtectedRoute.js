import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function ProtectedRoute({ children }) {
    const { user, authIsReady } = useAuthContext()
    if (authIsReady && !user) {
        return <Navigate to={'/login'}/>
    } else {
        return children
    }
}
