import "./inputBox.scss";
export const InputBox=({labelName,placeholder,type,value,name,...other})=>{
    return(
        <div className="input-group mb-0-75">
            <label className="input-group__label" htmlFor={name}><span className="label__content">
              {labelName}
            </span></label>
            <input type={type} placeholder={placeholder} name={name} value={value} className="input-group__input p-0-75" {...other} />
            
          </div>
    )
}