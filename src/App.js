import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout/Layout';
import MoviesList from './pages/Movies/Movies';
import NoPage from './pages/NoPage/NoPage';
import Login from './pages/Login/Login';
import CreateMovie from './pages/CreateMovie/CreateMovie';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import EditMovie from './pages/CreateMovie/EditMovie';


function App() {
  // State to store the token
  const [token, setToken] = useState(null);

  // Check token in localStorage when the component mounts
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route 
          path="/" 
          element={token ? <MoviesList itemsPerPage={8} token={token}/> : <Login setToken={setToken}/>} 
        />
        <Route path="movies" element={<MoviesList itemsPerPage={8} token={token}/> } />
        <Route path="create-movie" element={<CreateMovie />} />
        <Route path="edit-movie/:id" element={<EditMovie />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
