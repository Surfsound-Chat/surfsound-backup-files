import { useSelector } from "react-redux";
import "./highlights.scss";
import { BsSearch } from "../../utils/icons";
import { FollowUserCard } from "./followUserCard/FollowUserCard";
import { searchUser } from "./helper";
import { Loader } from "../index";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
export const Highlights = () => {
  const { allUsers, getUsersStatus, user } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 600);
  const suggestedUser = allUsers.filter((userDetails) => userDetails.id !== user.id);
  const filteredUser = searchUser(suggestedUser, debouncedSearchText);
  return (
    <section className="suggestion-container p-0-75">
    <section className="user-suggested  flex flex-col flex-align-center">
      <article className="search-bar">
        <form action="" className="search-form flex">
          <span className="search-form__icon px-1 flex flex-align-center">
            <BsSearch size={20} />
          </span>
          <input type="search" className="search-form__input" value={searchText} placeholder="search user..." onChange={(e) => setSearchText(e.target.value)} />
        </form>
      </article>
      <h3>
        Suggestion for You
      </h3>

      {getUsersStatus === "loading" ? <><Loader/></>
        : filteredUser.length > 0 ?
          <article className="user-list">
            {filteredUser?.map((user) => (
              <FollowUserCard userDetail={user} key={user.id} />
            ))
            }
          </article>
          :
          <div className="nouser">
            <img src="../Assets/nouser.png" className="responsive-img">
            </img>
          </div>
      }

    </section>
    </section>
  )
}