import { Modal} from "../index";
import "./EditProfileModal.scss";
import { useState,useRef } from "react";
import {FcCompactCamera} from "../../utils/icons";
import Avatar from "@mui/material/Avatar";
import { useDispatch,useSelector } from "react-redux";
import { updateUser } from "../../redux/authSlice";
export const EditProfileModal = ({ isOpen, onClose }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const fileInput = useRef(null);
    const [profileContent, setProfileContent] = useState(
        {
            profileImg:  user?.profileImg,
            bio: user?.bio,
            website:  user?.website,
        });
        const imageUpload = async (e) => {
            const formData = new FormData();
          formData.append("file", e.target.files[0]);
          formData.append("upload_preset", "kj8awleh");
    
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/dgomw715r/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await res.json();
          console.log(data);
          setProfileContent({ ...profileContent,profileImg: data.secure_url });
        };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col profile-panel">
                <span className="flex editprofile">
                    <h4>Avatar:</h4>
                    <Avatar className="edit-avatar" sx={{ height: '70px', width: '70px', backgroundColor: '#818cf8',cursor:"pointer" }} src={profileContent?.profileImg || user?.firstName?.charAt(0)} alt={user?.firstName}/>
                    <span onClick={() => fileInput.current.click()}> <FcCompactCamera size={32} className="edit-icon"/><input ref={fileInput} type="file" style={{display:'none'}} onChange={imageUpload}/></span>
                   
                </span>
                <span className="flex editprofile mt-0-75">
                    <h4>Bio:</h4>
                    <textarea className="right-item p-0-5" value={profileContent.bio}
                        onChange={(e) => setProfileContent({ ...profileContent, bio: e.target.value })}>
                        {profileContent.bio}
                    </textarea>
                </span>
                <span className="flex editprofile mt-0-75">
                    <h4>Link:</h4>
                    <input className="right-item p-0-5" value={profileContent.website}
                        onChange={(e) => setProfileContent({ ...profileContent, website: e.target.value })}
                    >
                    </input>
                </span>
                <button className="mt-1 py-0-5 px-0-75 update-profile-btn"
                 onClick={() => {
              dispatch(
                updateUser(profileContent)
              );
              onClose();
            }}
            >
                    update
                </button>
            </div>
        </Modal>
    )
}