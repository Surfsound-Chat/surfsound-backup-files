import React from 'react'
import {useDispatch,useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./followUserCard.scss";
import Avatar from "@mui/material/Avatar";
import { followUser,unfollowUser } from '../../../redux/authSlice';
export const FollowUserCard = ({userDetail}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.auth);
  const currentUserId=localStorage.getItem("userId");
  const isFollowing=user?.following?.indexOf(userDetail?.id)>-1;
  const followUnfollowHandler=()=>{
    isFollowing?dispatch(unfollowUser({followuserId:userDetail.id,currentUserId:currentUserId})):dispatch(followUser({followuserId:userDetail.id,currentUserId:currentUserId}))
  }
  return (
    <div className="user_card flex flex-align-center  mb-0-5 px-0-5" key={userDetail.id}>
            <div className="flex user-details flex-align-center">
            <Avatar sx={{ height: '45px', width: '45px', backgroundColor:'#818cf8',cursor:"pointer"}} src={userDetail?.profileImg || userDetail?.firstName?.charAt(0)} alt={userDetail?.firstName} onClick={() => navigate(`/profile/${userDetail?.id}`)} />
            <div>
              <span>
              <p className="user-title">{userDetail?.firstName.concat(" ", userDetail?.lastName)}</p>
              </span>
              <span>
               <p className="user-handler">@{userDetail?.userName}</p>
              </span>
              </div>
              </div>
              <button className="follow-btn px-1 py-0-25 pointer"  onClick={followUnfollowHandler}>{isFollowing?'Unfollow':'Follow'}</button>
        </div>
  )
}
