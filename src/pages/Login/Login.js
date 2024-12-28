import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginSubmit } from "../../Reducer/MovieSlice";
import { Form, Field } from 'react-final-form'
// import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = ({setToken}) => {
  const dispatch = useDispatch()
const navigate=useNavigate()
  const [message,setMessage]=useState()
  const {data,isLoading,isError} = useSelector((state) => state?.movies)
  // const {message,token} = data
  // console.log("state",data)
  // console.log("state11111",message,token)
  if(isLoading){
    return <>Loading...</>
  }


    if(data && data?.message){
      console.log("meeee11",message)
      setMessage(data?.message)
      setToken(data?.token)
      localStorage.setItem('token', data?.token);
      setTimeout(() => {
       navigate('/movies')
      }, 3000);
    }


  const onSubmit = async(values)=>{
    console.log("values",values)
    await dispatch(loginSubmit(values))

  }
    return(
      <>
      {message ? (toast({message})):""}
       <ToastContainer />
      <h1>Sign in</h1>
        <Form
            onSubmit={onSubmit}
            // validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h2>Sign in</h2>
                <div className="Email_container">
                <Field name="email">
                  {({ input, meta }) => (
                    <div>
                      <input type="text" {...input} placeholder="Email" />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                </div>

                <div className="Password_container">
                  <Field name="password" >
                    {({ input, meta }) => (
                      <div>
                        <input type="text" {...input} placeholder="Password" />
                        {meta.touched && meta.error && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="Password_container">
                  <Field name="remember_me" >
                    {({ input, meta }) => (
                      <div>
                        <input type="checkbox" {...input} />
                        <label>Remember me</label>
                        {meta.touched && meta.error && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="Submit_container">
                  <button type="submit">Submit</button>
                </div>
              </form>
            )}
          />
      </>
    )

  };

  export default Login;
