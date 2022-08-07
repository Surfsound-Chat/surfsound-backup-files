import {NavLink, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import {navItems} from "./constantData";
export const Sidebar=()=>{

    const getActiveNavStyle = ({ isActive }) =>
    isActive
        ? {
             background: '#4f46e5',
            color:"#ffffff",
        }
        : {
            background: null,
            color:'#42474c'
        } 
          
    return(
        <aside className="sidebar p-1 flex flex-col">
         {navItems.map((item,index)=>(
            <NavLink key={index} to={`${item.path}`} className="navlink flex flex-align-center p-0-75 my-0-5" style={( getActiveNavStyle)}>
           <item.icons size={22} className="navlink__icon"/>
           <span className="navlink__title">{item.title}</span>
           </NavLink>
            ))} 
        </aside>
    )
}