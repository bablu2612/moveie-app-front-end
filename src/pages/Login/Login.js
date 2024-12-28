import { useDispatch } from "react-redux";
import { loginSubmit } from "../../Reducer/MovieSlice";
import { Form, Field } from 'react-final-form'


const Login = () => {
  const dispatch = useDispatch()
  const onSubmit = async(values)=>{
    console.log("values",values)
    await dispatch(loginSubmit(values))

  }
    return(
      <>
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
