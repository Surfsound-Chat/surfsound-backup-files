import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Banner.scss";
export const Banner=()=>{
    const properties = {
        duration: 1500,
        transitionDuration: 1000,
        easing: "ease",
        arrows:false,
      };
     const fadeImages = ["https://res.cloudinary.com/dgomw715r/image/upload/v1654945620/ProjectImages/73ac4cd80aa7c1affab4e1482a567190_flxzml.jpg", "https://res.cloudinary.com/dgomw715r/image/upload/v1654945314/ProjectImages/32_u3mwlx.gif", "https://res.cloudinary.com/dgomw715r/image/upload/v1654945304/ProjectImages/pngtree-purple-gradient-background-image_63081_xamqoq.jpg", "https://res.cloudinary.com/dgomw715r/image/upload/v1654945287/ProjectImages/SL_060521_43530_09_wsr5s7.jpg"];
    return (
        <div className="banner_container">
            <Fade {...properties}>
        {fadeImages.map((fadeImage, index) => (
          <div className="banner_container" key={index}>
            <img src={fadeImage} className="banner  responsive-img" />
          </div>
        ))}
      </Fade>
        </div>
    )
}