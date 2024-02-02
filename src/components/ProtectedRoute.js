import { useAuth } from './../AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;