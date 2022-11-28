import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function VisitorsRoute({ children }) {
    const { user, authIsReady } = useAuthContext();
	if (authIsReady && !user) {
		return children;
	} else {
		return <Navigate to={'/'} />;
	}
}
