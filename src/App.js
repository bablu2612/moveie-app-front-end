import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout/Layout';
import MoviesList from './pages/Movies/Movies';
import NoPage from './pages/NoPage/NoPage';
import Login from './pages/Login/Login';
import CreateMovie from './pages/CreateMovie/CreateMovie';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';


function App() {
  const [token,setToken]=useState()
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken}/>} />
      <Route path="/" element={<Layout />}>
        <Route path="movies" element={<MoviesList itemsPerPage={1} token={token}/> } />
        <Route path="create-movie" element={<CreateMovie />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
    <ToastContainer/>
    </>
   );
}

export default App;
