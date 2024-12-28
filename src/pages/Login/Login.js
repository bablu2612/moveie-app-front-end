import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginSubmit } from "../../Reducer/MovieSlice";
import { Form, Field } from 'react-final-form'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import css from './LoginStyle.css'
import wavesImage from '../../Assets/bottmwaves.png'
const Login = ({ setToken }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState()
  const { data, isLoading, isError } = useSelector((state) => state?.movies)

  // if (isLoading) {
  //   return <>Loading...</>
  // }

  const onSubmit = async (values) => {
    await dispatch(loginSubmit(values)).then(res => {
      if (res?.payload) {
        setMessage(res?.payload?.message)
        localStorage.setItem('token', res?.payload?.token);
        setToken(res?.payload?.token)
        navigate('/movies')
      }else{
        toast("Invalid Email or Password")
      }

    })

  }

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
   
    return errors;
  };
  return (
    <>
      <div className="blocks">
        {message ? (toast({ message })) : ""}
        {/* <ToastContainer /> */}
        <h1>Sign in</h1>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>

              <div className="Email_container">
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <input type="text" {...input} placeholder="Email" />
                      {meta.touched && meta.error && <span className="error">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>

              <div className="Password_container">
                <Field name="password" >
                  {({ input, meta }) => (
                    <div>
                      <input type="password" {...input} placeholder="Password" />
                      {meta.touched && meta.error && <span className="error">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="remenberCheckbox">
                <Field name="remember_me" >
                  {({ input, meta }) => (
                    <div>
                      <input type="checkbox" {...input} />
                      <label>Remember me</label>
                      {meta.touched && meta.error && <span className="error">{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
              <div className="Submit_container">
                <button type="submit" className="primaryButton">Login</button>
              </div>
            </form>
          )}
        />
        <div className="bottomWaves">
          <img src={wavesImage} />
        </div>
      </div>
    </>
  )

};

export default Login;
