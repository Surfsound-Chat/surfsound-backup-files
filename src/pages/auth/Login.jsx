import React, { useState, useEffect } from 'react';
import "./auth.scss";
// import { loginUser } from "./authSlice";
import { loginUser } from '../../redux/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { InputBox } from "../../components/index";
import { ImSpinner3 } from "../../utils/icons";
import { useNavigate } from 'react-router-dom';
import { SignupModal } from './SignupModal/SignupModal';
export const Login = () => {

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, token} = useSelector((state) => state.auth);
  const [signupActive, setSignupActive] = useState(false);
  const handleSignupToogle = () => setSignupActive((prev) => !prev);
  const changeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const loginHandler = () => {
    if (formValues.email && formValues.password !== '') {
      dispatch(loginUser(formValues));
    }
    setFormValues({
      email: "",
    password: "",
    })
  }
  const loadtestData = () => {
    setFormValues({
      email: "test@test.com",
      password: "testerer12345",
    })
  }

  useEffect(() => token && navigate("/feed"), [token]);
  return (
    <>
      <div className="login-page">
        <div className="grid-item1 flex-center">
          <div className="img-container">
            <img src="../Assets/heroimg.png" className="responsive-img"></img>
          </div>
          <img src="../Assets/stars.svg" className="star"></img>
        </div>
        <div className="grid-item2 px-0-75 pt-1 flex-col flex-center">
          <div className="logo">
            <img src="../Assets/logosm.png" />
          </div>
          <h2 className="login-page__login-title">Welcome to surfsound ...</h2>
          {error? <div className="error-msg mt-1 px-0-75 py-0-5">
            {error}
          </div> :
            null}

          <form className="auth-form mt-1" onSubmit={e => e.preventDefault()}>
            <InputBox labelName="Email" type="email" name="email" value={formValues.email} onChange={changeHandler} required />
            <InputBox labelName="Password" type="password" name="password" value={formValues.password} onChange={changeHandler} required />
            <div className="mt-1 signup-link" onClick={() => setSignupActive(true)}>New user ? SignUp here</div>
            <button className="auth-btn-group auth-btn py-0-75 mt-2 flex-center" onClick={loginHandler} disabled={isLoading}>
              {isLoading && <ImSpinner3 size={20} className="spinner mr-0-5" />}
              Login
            </button>
            <div className="m-1 test-login" onClick={loadtestData}>Load test credential</div>
          </form>
        </div>
      </div>
      {signupActive ? <SignupModal isOpen={signupActive} onClose={handleSignupToogle} /> : null}
    </>
  )
}
