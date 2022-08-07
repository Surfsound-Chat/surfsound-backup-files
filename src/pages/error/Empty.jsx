import "./Error.scss";
import { useNavigate } from "react-router-dom";
export const Empty = ({ path }) => {
    let message = "";
    let image = "";
    let navigate = useNavigate();
    switch (path) {
        case "/bookmark":
            {
                image = "../Assets/bookmark.png";
                message = "You have not saved any post !!!"
            }
            break;
        case "/feed":
            {
                image = "../Assets/no_result.png";
                message = "Post something !!!"
            }
            break;
        case "/liked":
            {
                image = "../Assets/noliked.png";
                message = "You have not liked any post !!!"
            }


    }
    return (
        <div className="empty-page flex-center flex-col">
            <div className="empty-page__img">
                <img src={image} className="responsive-img" alt="emptyimage" />
            </div>
            <div className="empty-page__text">
                <span >{message}</span>

            </div>
        </div>
    )
}