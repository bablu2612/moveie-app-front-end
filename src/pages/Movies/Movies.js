import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../../Reducer/MovieSlice'; // Update with your actual path
import { baseUrl } from '../../Constant/constant';
import logoutLogo from '../../Assets/logout.svg'
import { useNavigate } from 'react-router-dom';
import css from './MoviesStyle.css'
import wavesImage from '../../Assets/bottmwaves.png'
function Items({ currentItems,navigate }) {

  return (
    <>
    <div className='moviesCardBlock'>
      {currentItems &&
        currentItems.map((value, index) => (
          <div key={index} className='movieCard_'>
            <div className='row'>
              <div className='editBtn' onClick={()=>{
                navigate(`/edit-movie/${value._id}`)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" viewBox="0 0 24 24" fill="none">
                  <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className='card'>
                <div className='movieBannerImg'>
                      <img src={`${baseUrl}/images/${value?.poster}`} alt={value?.title} />
                  </div>
                  <div className='movieInfo'>
                        <strong>{value?.title}</strong>
                      <strong className='yearMovie'>{value?.year}</strong>
                  </div>
                
              </div>
            </div>
          </div>
        ))}
        <div className='clearfix'></div>
        </div>
    </>
  );
}

const MoviesList = ({ itemsPerPage = 6,setToken }) => {
  const dispatch = useDispatch();

  // Getting state from Redux
  const { movieData, currentPage, totalMovies, totalPages } = useSelector(
    (state) => state.movies
  );

  // Fetch movies when the component mounts or currentPage/page limit changes
  useEffect(() => {
    dispatch(getAllMovies({ page: currentPage, limit: itemsPerPage }));
  }, []);
  const currentItems = movieData?.movies;
  const pageCount = movieData.totalPages;

  // Handle page click event for pagination
  const handlePageClick = (event) => {

    // Dispatch to fetch the new set of movies based on the page
    dispatch(getAllMovies({ page: event.selected + 1, limit: itemsPerPage }));
  };
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null)
    navigate('/login');
  };
  return (
    < >
     <div className="blocks moviesPage">
      <div className='container'>
      <div className='headingLogout'>
        <h2>My Movies
        <button  onClick={(e)=>{navigate('/create-movie')}}>+</button>
        </h2>
        <button onClick={handleLogout} ><strong>Logout</strong><img src={logoutLogo} /> </button>
        </div>
      
     
      <Items currentItems={currentItems} navigate={navigate}/>

      <div className="pagination-container">
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={6}
          pageCount={pageCount}
          previousLabel="Prev"
          containerClassName="pagination-container"
          pageClassName="pagination-item"
          pageLinkClassName="pagination-item"
          activeClassName="selected"
          previousClassName="pagination-prev"
          nextClassName="pagination-next"
          disabledClassName="disabled"
          renderOnZeroPageCount={null}
        />
      </div>
      </div>
      <div className="bottomWaves">
          <img src={wavesImage}/>
          </div>
      </div>
    </>
  );
};

export default MoviesList;
