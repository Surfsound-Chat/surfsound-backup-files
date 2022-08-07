import "./avatarModal.scss";
import { Modal } from "../../components/index";
import Avatar from "@mui/material/Avatar";
import {avatars} from "./avatarConstants";
export const AvatarModal = ({isOpen,onClose,formValues,setFormValues}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className="profile-title mt-1">Choose your profile image!!</h3>
            <div className="flex avatar-container mt-1">
            {avatars.map((avatar_img)=>(
                <span key={avatar_img.id} >
               <Avatar sx={{ height: '60px', width: '60px' }} src={avatar_img.avatar} 
                onClick={
                   (e)=>{
                     e.target.classList.add("selected-avatar");
                     onClose();
                    setFormValues({ ...formValues, profileImg: e.target.src })}
                   
                  
                   }/> 
               </span>
            ))}
              </div>
        </Modal>
    )
}