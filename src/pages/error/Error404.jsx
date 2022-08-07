import {useNavigate} from "react-router-dom";
import "./Error.scss";
export const Error404=()=>{
    let navigate=useNavigate();
    return(
        <div className="error-page flex-center flex-col">
            <div className="error-page__img">
                <img src="../Assets/404page.png" className="responsive-img" alt="errorimage" />
            </div> 
            <button className="navigate-btn px-1 py-0-75" onClick={() => navigate("/feed")}>Go Back</button>
            
        </div>
    )
}