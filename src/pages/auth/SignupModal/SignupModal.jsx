import "../auth.scss";
import { Modal, InputBox, AvatarModal } from "../../../components/index";
import { ImSpinner3 } from "../../../utils/icons";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { SignUpUser } from "../../../redux/authSlice";
import { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const SignupModal = ({ isOpen, onClose }) => {
  const [avatarActive, setAvatarActive] = useState(false);
  const handleAvatarToogle = () => {
    setAvatarActive((prev) => !prev);
  }
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    userName: "",
    profileImg:"",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, token } = useSelector((state) => state.auth);
  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const { firstName, userName, email, password,profileImg } = formValues;
  const signupHandler = () => {
    error == '';
    if (
      firstName !== "" &&
      userName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      dispatch(SignUpUser(formValues))
    }
    setFormValues({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      profileImg:"",
    })
  }
  useEffect(() => token && navigate("/feed"), [token]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="px-0-25 flex-col flex-center">
          <h2 className="login-page__login-title">Signup</h2>
          {error ? <div className="error-msg mt-1 px-0-75 py-0-5">
            {error}
          </div> : null}

          <form className="signup-form mt-0-5" onSubmit={e => e.preventDefault()}>
            <div className="mb-0-5 flex-center">
            <IconButton onClick={() => setAvatarActive(true)}>
              <Avatar sx={{ height: '50px', width: '50px' }} src={formValues?.profileImg ||"https://res.cloudinary.com/dgomw715r/image/upload/v1654585086/ProjectImages/avatar2_cpccbi.png"} alt="choose image" />
            </IconButton>
            </div>
            
            <div className="input-50-50 flex">
              <InputBox labelName="firstName" type="text" name="firstName" value={formValues.firstName} onChange={changeHandler} required />
              <InputBox labelName="lastName" type="text" name="lastName" value={formValues.lastName} onChange={changeHandler} />
            </div>
            <InputBox labelName="userName" type="text" name="userName" value={formValues.userName} onChange={changeHandler} required />
            <InputBox labelName="Email" type="email" name="email" value={formValues.email} onChange={changeHandler} required />
            <InputBox labelName="Password" type="password" name="password" value={formValues.password} onChange={changeHandler} required />
            <div className="mt-0-75 signup-link" onClick={onClose}>Already registered ?Login </div>
            <button className="auth-btn-group auth-btn py-0-75 mt-1 flex-center" onClick={signupHandler} disabled={isLoading}>
              {isLoading && <ImSpinner3 size={20} className="spinner mr-0-5" />}
              Signup
            </button>
          </form>
        </div>
      </Modal>
      {avatarActive ? <AvatarModal isOpen={avatarActive} onClose={handleAvatarToogle} formValues={formValues} setFormValues={setFormValues} /> : null}
    </>
  )
}