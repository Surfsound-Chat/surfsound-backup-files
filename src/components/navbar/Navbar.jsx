import "./navbar.scss";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
export const Navbar=()=>{
    const dispatch=useDispatch();
   const navigate=useNavigate();
    const {user}=useSelector((state)=>state.auth);
    return(
        <header className="header flex flex-align-center flex-justify-between w-100 py-0-75 px-2">
         <div className="app-title flex flex-align-center pointer" onClick={()=>navigate("/feed")}>
             <img src="../Assets/logosm.png" className="app-title__logo">
             </img>
         </div>
         <Avatar sx={{ height: '55px', width: '55px', backgroundColor:'#818cf8',border: '2px solid #a5b4fc' ,cursor:"pointer" }} src={user?.profileImg || user?.firstName?.charAt(0)} alt={user?.firstName} onClick={() => navigate(`/profile/${user?.id}`)} />
        </header>
    )
}