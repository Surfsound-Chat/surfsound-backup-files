import { useSelector } from "react-redux";
import { Navbar,Sidebar, Highlights, Postcard,Loader } from "../../components";
import {Empty} from "../index";
import { useLocation } from "react-router-dom";
import { MainContainer } from "../mainContainer/MainContainer";
import "./bookmark.scss";
export const Bookmark = () => {
   const location = useLocation();
   const { posts,statusAllPost} = useSelector((state) => state.post);
   const currentUserId=localStorage.getItem("userId");
   const bookmarkPost=posts.filter((post)=>post.bookmark.indexOf(currentUserId)>-1);
   return (
      <div className="bookmark">
         <Navbar />
         <MainContainer leftchild={<Sidebar />} mainchild={
            <section className="bookmark-section">
                 {statusAllPost === "loading" ? <Loader /> :
               <>
               {bookmarkPost.length>0 ?
               bookmarkPost.map((posts) => (
                  <Postcard key={posts.id} allPost={posts} />
                  ))
                :<Empty path={location.pathname}/>
            }
            </>}
            </section>
        } rightchild={<Highlights />} />
      </div>
   )
}