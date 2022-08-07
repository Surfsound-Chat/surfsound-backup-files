import { Navbar,Banner, ProfileTab, FollowModal, EditProfileModal,Sidebar,Loader} from "../../components/index";
import "./profile.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logoutUser} from "../../redux/authSlice";
import { useState} from "react";
import Avatar from "@mui/material/Avatar";
import { followUser,unfollowUser } from '../../redux/authSlice';
import {MainContainer} from "../mainContainer/MainContainer";

export const Profile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const {allUsers,user,getUsersStatus} = useSelector((state) => state.auth);
    const {posts}=useSelector((state)=>state.post);
     const userDetails=allUsers.find((user)=>user?.id===userId);
     const userPostDetail=posts.filter((post)=>post.userId===userId);
     const currentUserId=localStorage.getItem("userId");
       const isFollowing=user?.following?.indexOf(userId )>-1;
       const isCurrentUser=userId===currentUserId;
     const [openFollow, setOpenFollow] = useState({ modalOpen: false, type: "" });
     const [openProfileModal, setOpenProfileModal] = useState(false);
    const followModalToogle = () => {
        setOpenFollow({ ...openFollow, modalOpen: false, type: "" });
    }
    const profileModalToogle = () => {
        setOpenProfileModal(prev => !prev);
    }
    const followUnfollowHandler=()=>{
        isFollowing?dispatch(unfollowUser({followuserId:userId,currentUserId:currentUserId})):dispatch(followUser({followuserId:userId,currentUserId:currentUserId}))
      }
    return (
        <>
            <Navbar />
            <MainContainer leftchild={<Sidebar />} mainchild={
                getUsersStatus === "loading"?<><Loader/></>
                :
                <div className="profile flex flex-col flex-align-center">
                <section className="profile-container flex flex-justify-center">
                    <Banner />
                </section>
                <article className="profile-item flex p-0-75  flex-justify-between">
                    <Avatar sx={{ height: '150px', width: '150px', backgroundColor: '#818cf8' }} src={userDetails?.profileImg ||userDetails?.firstName?.charAt(0)} alt={userDetails?.firstName}/>
                    <div className="profile-details px-0-75 py-0-25">
                        <span className="flex flex-align-center profile-heading">
                            <p>{userDetails?.fullName}</p>
                            {isCurrentUser ?
                                <button className="p-0-5 edit-btn" onClick={() => setOpenProfileModal(true)}>Edit Profile</button>
                                :<button className="p-0-5 edit-btn" onClick={followUnfollowHandler} >{isFollowing?'following':'Follow'}</button> 
                            }
                        </span>

                        <span className="profile-body">
                            <p>{userDetails?.userName}</p>
                            <p>{userDetails?.bio}</p>
                            <a href={userDetails?.website}>{userDetails?.website}</a>

                        </span>
                        <div className="post-count flex mt-1">
                            <span>{userPostDetail?.length}<span className="ml-0-25">Posts</span></span>
                            <span onClick={() => userDetails?.followers.length && setOpenFollow({ ...openFollow, modalOpen: true, type: "follower" })}>{userDetails?.followers.length}<span className="ml-0-25">Followers</span></span>
                            <span onClick={() => userDetails?.following.length && setOpenFollow({ ...openFollow, modalOpen: true, type: "following" })}>{userDetails?.following.length}<span className="ml-0-25">Following</span></span>
                        </div>
                        <button className="mt-0-75 logout-btn px-0-75 py-0-5" onClick={() => dispatch(logoutUser())}>
                            Logout
                        </button>
                    </div>
                </article>
                <section className="profile-activity flex flex-center">
                    <ProfileTab ProfileUserId={userId}/>
                </section>
            </div>
            } rightchild={<></>}/>
            
            {openFollow.modalOpen ? <FollowModal isOpen={openFollow.modalOpen} onClose={followModalToogle} userDetails={userDetails} modalData={openFollow} /> : null}
            {openProfileModal ? <EditProfileModal isOpen={openProfileModal} onClose={profileModalToogle} /> : null}
        </>
    )
}