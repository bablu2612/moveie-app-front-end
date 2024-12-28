import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, loginSubmit } from "../../Reducer/MovieSlice";
import { Form, Field } from 'react-final-form';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const EditMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const { movie, isLoading, isError } = useSelector((state) => state?.movies);
  const [posterFile, setFilePoster] = useState(null);

  useEffect(() => {
    if (movie && movie?.message) {
      setMessage(movie?.message);
      toast(movie?.message);
    }
  }, [movie]);

  if (isLoading) {
    return <>Loading...</>;
  }

  const handleFileChange = (e, form) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFilePoster(file);
    }
  };

  const onSubmit = async (values, form) => {
    const formdata = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formdata.set(key, value);
    }
    formdata.set("poster", posterFile);
    await dispatch(createMovie(formdata));
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <h2>Edit Movies</h2>
            <div className="Poster_container">
              <Field name="poster">
                {({ input, meta }) => (
                  <div>
                    <input
                      type="file"
                      {...input}
                      onChange={(e) => handleFileChange(e, form)}
                      accept="image/*"
                    />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>

              {posterFile && (
                <div>
                  <img
                    src={URL.createObjectURL(posterFile)}
                    alt="Poster preview"
                    style={{ maxWidth: "200px", maxHeight: "300px", marginTop: "10px" }}
                  />
                </div>
              )}
            </div>

            <div className="Title_container">
              <Field name="title">
                {({ input, meta }) => (
                  <div>
                    <input type="text" {...input} placeholder="Title" />
                    {meta.touched && meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="Year_container">
              <Field name="year">
                {({ input, meta }) => (
                  <div>
                    <input type="text" {...input} placeholder="Publishing year" />
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
  );
};

export default EditMovie;
