import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, getAllMovies, getMovie, loginSubmit, updateMovie } from "../../Reducer/MovieSlice";
import { Form, Field } from 'react-final-form'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../Constant/constant";
import uploadIcon from '../../Assets/file_download_black_24dp 1.png'

const EditMovie = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [message, setMessage] = useState()
  useEffect(() => {
    dispatch(getMovie({ id }));
  }, [dispatch, id]);

  const { movie, isLoading, isError } = useSelector((state) => state?.movies)
  const { updateMovieData } = useSelector((state) => state?.movies)


  // const data= useSelector((state) => state?.movies)
  const [posterFile, setFilePoster] = useState(null)
  const [title, setTitle] = useState(null)
  const [year, setYear] = useState(null)


  if (isLoading) {
    return <>Loading...</>
  }


  if (updateMovieData && updateMovieData?.message) {
    // setMessage(updateMovieData?.message)


    // navigate('/movies')
    // toast(movie?.message)
  }
  const handleFileChange = (e, form) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFilePoster(file)
    }
  };

  const onSubmit = async (values, form) => {
    const formdata = new FormData()
    for (const [key, value] of Object.entries(values)) {
      formdata.set(key, value);
    }
    // formdata.set("poster", posterFile?posterFile:movie);
    if (posterFile) {
      formdata.set("poster", posterFile);

    }
    dispatch(updateMovie({ id, values: formdata })).then(res => {
      setFilePoster(null); // Reset the poster file state
      form.reset();

      navigate('/movies')
      toast(res.payload.message)
    });

  }

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Title is required";
    if (!values.year) errors.year = "Publishing year is required";
    // if (!posterFile) errors.poster = "Poster is required";
    return errors;
  };

  return (
    <>
      {/* {message ? (toast({message})):""} */}
      {movie && (

        <div className="blocks createNewMovies">
          <Form
            onSubmit={onSubmit}
            validate={validate}
            initialValues={{ title: movie?.title || "", year: movie?.year || '' }}
            render={({ handleSubmit, form, values }) => (
              <form onSubmit={handleSubmit}>
                <h2>Edit</h2>
                <div className="uploadImageBlock">
                  <div className="Poster_container">
                    <Field name="poster">
                      {({ input, meta }) => (
                        <div className="uploadImageBoxDrag">

                          <input
                            type="file"

                            {...input}
                            onChange={(e) => handleFileChange(e, form)}
                            accept="image/*"
                            id="fileUpload"
                          />
                          <label htmlFor="fileUpload">
                            <img src={uploadIcon} />
                            Drop an image here</label>
                          {meta.touched && meta.error && <span className="error">{meta.error}</span>}

                        </div>
                      )}
                    </Field>
                    <Field name="poster">
                      {({ input, meta }) => (
                        <div className="uploadedImage">
                          {(posterFile || movie?.poster) && (
                            <img
                              src={!posterFile ? `${baseUrl}/images/${movie.poster}` : URL.createObjectURL(posterFile)}
                              alt="Poster preview"
                            />
                          )}
                          {meta.touched && meta.error && <span className="error">{meta.error}</span>}

                        </div>
                      )}

                    </Field>
                  </div>
                  <div className="Submit_container">
                    <button type="button" className="secondryButton" onClick={() => {
                      navigate('/movies')
                    }}>Cancel</button>
                    <button type="submit" className="primaryButton">Submit</button>
                  </div>
                </div>

                <div className="uploadFieldsBlock">
                  <div className="Title_container">
                    <Field name="title">
                      {({ input, meta }) => (
                        <div>
                          <input type="text" {...input} placeholder="Title" />
                          {meta.touched && meta.error && <span className="error">{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="Year_container">
                    <Field name="year">
                      {({ input, meta }) => (
                        <div>
                          <input
                            type="text"
                            {...input}
                            placeholder="Publishing year"
                          />
                          {meta.touched && meta.error && <span className="error">{meta.error}</span>}
                        </div>
                      )}
                    </Field>
                  </div>
                  <div className="Submit_container">
                    <button type="button" className="secondryButton" onClick={() => {
                      navigate('/movies')
                    }}>Cancel</button>
                    <button type="submit" className="primaryButton">Submit</button>
                  </div>
                </div>



              </form>
            )}
          />
        </div>
      )}
    </>
  )
};

export default EditMovie;
