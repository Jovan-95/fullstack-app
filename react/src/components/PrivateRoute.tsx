import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { PrivateRouteProps } from "../interfaces";

function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
    const user = useSelector((state: RootState) => state.auth.loggedInUser);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Only admin can see admin page. Need to adjust the code for this to work
    // if (requiredRole && user.role !== requiredRole) {
    //     return <Navigate to="/" replace />; // može i "/403" za Forbidden stranicu
    // }

    return children;
}

export default PrivateRoute;
