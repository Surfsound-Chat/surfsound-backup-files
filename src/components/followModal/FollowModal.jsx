import "./followModal.scss";
import { Modal } from "../index";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
export const FollowModal = ({ isOpen, onClose, userDetails, modalData }) => {
    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.auth);
    const followingUserDetails=allUsers.filter(user=>userDetails.following.includes(user.id));
    const followerUserDetails=allUsers.filter(user=>userDetails.followers.includes(user.id));
    return (
        <Modal isOpen={isOpen} onClose={onClose}>

            {modalData?.type === "follower" ?
                followerUserDetails?.map((followerUser) => (
                        <div className="follow-card flex flex-align-center flex-justify-start mt-0-5 p-0-25" key={followerUser.id}>
                            <div className="flex flex-center">
                                <Avatar sx={{ height: '50px', width: '50px', backgroundColor: '#818cf8' }} src={followerUser?.profileImg || followerUser?.firstName?.charAt(0)} alt={followerUser?.firstName} />
                                <span className="ml-0-5">
                                    <p className="user-name">{followerUser.fullName}</p>
                                </span>
                            </div>
                        </div>

                ))
                :
                followingUserDetails?.map((followingUser) => (
                    <div className="follow-card flex flex-align-center flex-justify-start mt-0-5 p-0-25" key={followingUser.id}>
                        <div className="flex flex-center">
                        <Avatar sx={{ height: '50px', width: '50px', backgroundColor: '#818cf8' }} src={followingUser?.profileImg || followingUser?.firstName?.charAt(0)} alt={followingUser?.firstName} />
                            <span className="ml-0-5">
                                <p className="user-name">{followingUser?.fullName}</p>
                            </span>
                        </div>
                    </div>
                ))
            }

        </Modal>
    )
}