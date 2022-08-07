import { useDispatch,useSelector } from "react-redux";
import "./comment.scss";
import Avatar from "@mui/material/Avatar";
import {BiDotsVerticalRounded,MdDeleteOutline} from "../../utils/icons";
import {useState} from "react";
import {deleteComment} from "../../redux/postSlice";
export const Comment = ({ comment,postId }) => {
    const dispatch=useDispatch();
    const {allUsers,token} = useSelector((state) => state.auth);
    const userInfo =allUsers?.find((user) => user.id === comment.userId);
    const [openOption, setOpenOption] = useState(false);
    return (
        <div className="replies flex flex-align-center my-0-25">
            <Avatar sx={{ height: '40px', width: '40px', backgroundColor:'#818cf8'}} src={userInfo?.profileImg || userInfo?.firstName?.charAt(0)} alt={userInfo?.firstName} />
            <span className="replies__text-container px-0-5 py-0-25 flex flex-col ">
                <div className="flex">
                    <h4>{userInfo.fullName}</h4>
                    {comment.userId === token &&
                    <span className="comment_edit flex-center">
                        <BiDotsVerticalRounded size={20}  onClick={() => setOpenOption((val) => !val)} />
                       <span className={`option-list  ${openOption ? 'option-list--active ' : ''}`}>
                       <li className="flex flex-align-center" onClick={()=>dispatch(deleteComment({postId,comment}))}>
                       <MdDeleteOutline size={24} style={{ color: '#4f46e5' }}/>
                                    Delete
                                </li>
                       </span>
                    </span>
                }
                </div>

                <p>{comment.commentText}</p>
            </span>
        </div>
    )
}