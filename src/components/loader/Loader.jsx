import "./loader.scss";
export const Loader=()=>{
    return(
      <div className="loader flex-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    )
}