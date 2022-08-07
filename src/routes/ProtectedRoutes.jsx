import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export const ProtectedRoutes=({children})=>{
    const {token} = useSelector((state) => state.auth);
    const location = useLocation();
    return token?(
    children
    ):(
        <Navigate to="/" state={{ from: location }} replace />
    );
}