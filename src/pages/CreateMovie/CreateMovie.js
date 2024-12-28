import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, loginSubmit } from "../../Reducer/MovieSlice";
import { Form, Field } from 'react-final-form'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CreateMovie = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [message,setMessage]=useState()
  const {movie,isLoading,isError} = useSelector((state) => state?.movies)
  // const data= useSelector((state) => state?.movies)
  const [posterFile,setFilePoster]=useState(null)
console.log("movie",movie)
  if(isLoading){
    return <>Loading...</>
  }

  if(movie && movie?.message){
    console.log("movie1",movie)
    setMessage(movie?.message)
    toast(movie?.message)
    setTimeout(() => {

    }, 3000);
  }
  const handleFileChange = (e,form) => {
    console.log("form",form)
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFilePoster(file)
    }
  };

  const onSubmit = async(values,form)=>{
    const formdata = new FormData()

    for (const [key, value] of Object.entries(values)) {
      formdata.set(key, value);
    }
    formdata.set("poster", posterFile);
    await dispatch(createMovie(formdata))

  }
    return(
      <>
      {/* {message ? (toast({message})):""} */}

      <Form
            onSubmit={onSubmit}
            // validate={validate}
            render={({ handleSubmit ,form,values}) => (
              <form onSubmit={handleSubmit}>
                <h2>Create a new movie</h2>
                <div className="Poster_container">
                <Field name="poster">
                  {({ input, meta }) => (
                    <div>
                      <input type="file" {...input}  onChange={(e) => handleFileChange(e, form)} accept="image/*" />
                      {meta.touched && meta.error && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="poster">
            {({ input }) => (
              <div>
                {posterFile && <img src={URL.createObjectURL(posterFile)} alt="Poster preview" />}
              </div>
            )}
          </Field>

                </div>

                <div className="Title_container">
                  <Field name="title" >
                    {({ input, meta }) => (
                      <div>
                        <input type="text" {...input} placeholder="Title" />
                        {meta.touched && meta.error && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="Year_container">
                  <Field name="year" >
                    {({ input, meta }) => (
                      <div>
                        <input type="text" {...input} placeholder="Publishing year"/>
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

  export default CreateMovie;
