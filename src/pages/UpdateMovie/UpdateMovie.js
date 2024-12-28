import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, getAllMovies, getMovie, loginSubmit, updateMovie } from "../../Reducer/MovieSlice";
import { Form, Field } from 'react-final-form'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../Constant/constant";

const UpdateMovie = () => {

  const dispatch = useDispatch()
  const navigate=useNavigate()
  const {id}=useParams()
  console.log("ppp",id)
  const [message,setMessage]=useState()
  useEffect(() => {
    dispatch(getMovie({id}));
  }, [dispatch,id]);

  const {movie,isLoading,isError} = useSelector((state) => state?.movies)
  const {updateMovieData} = useSelector((state) => state?.movies)


  // const data= useSelector((state) => state?.movies)
  const [posterFile,setFilePoster]=useState(null)
  const [title,setTitle]=useState(null)
  const [year,setYear]=useState(null)


console.log("movie",movie)
  if(isLoading){
    return <>Loading...</>
  }


  if(updateMovieData && updateMovieData?.message){
    console.log("movie1",updateMovieData)
    setMessage(updateMovieData?.message)
    navigate('/movies')
    dispatch(getAllMovies({ page: 1, limit: 1 }));
    // toast(movie?.message)
    // return <div>{movie?.message}</div>
    // setTimeout(() => {
    //   movie.message=''
    // }, 5000);
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
    // formdata.set("poster", posterFile?posterFile:movie);
    formdata.set("poster", posterFile);
    await dispatch(updateMovie(id,formdata))

  }
    return(
      <>
      {/* {message ? (toast({message})):""} */}
      {movie && (

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

                {posterFile ? (<img src={URL.createObjectURL(posterFile)} alt="Poster preview" />):(<img src={`${baseUrl}/images/${movie?.poster}`} alt={movie?.title} />)}
              </div>
            )}
          </Field>

                </div>

                <div className="Title_container">
                  <Field name="title" >
                    {({ input, meta }) => (
                      <div>
                        <input type="text" {...input} placeholder="Title" value={movie?.title ? movie?.title : title}  onChange={(e)=>setTitle(e.target.value)} />
                        {meta.touched && meta.error && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                </div>
                <div className="Year_container">
                  <Field name="year" >
                    {({ input, meta }) => (
                      <div>
                        <input type="text" {...input} placeholder="Publishing year" value={movie?.year ? movie?.year :year} onChange={(e)=>setYear(e.target.value)} />
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
          )}
          </>
    )
  };

  export default UpdateMovie;
