import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate(); // Using the navigate hook

  // Check token in localStorage when the component mounts
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);
  useEffect(() => {
    if (token && window.location.pathname === '/login') {
      navigate('/movies'); // Redirect to /movies if token exists
    }
  }, [token, navigate]);
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={token ? <MoviesList itemsPerPage={8} token={token} setToken={setToken} /> : <Login setToken={setToken} />}
        />
        <Route path="movies" element={<MoviesList itemsPerPage={8} token={token}  setToken={setToken} />} />
        <Route path="create-movie" element={<CreateMovie />} />
        <Route path="edit-movie/:id" element={<EditMovie />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <ToastContainer style={{
        marginTop: '20px',
        marginRight: '20px',
        zIndex: 9999
      }} />
    </>
  );
}

export default App;
