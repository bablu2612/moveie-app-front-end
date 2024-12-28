import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../../Reducer/MovieSlice'; // Update with your actual path
import { baseUrl } from '../../Constant/constant';

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((value, index) => (
          <div key={index} className='container'>
            <div className='row'>
              <div className='card'>
                <a href={`/movies/${value?._id}`}>
                <img src={`${baseUrl}/images/${value?.poster}`} alt={value?.title} />
                <strong>{value?.title}</strong>
                <strong>{value?.year}</strong>
                </a>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

const MoviesList = ({ itemsPerPage = 1 }) => {
  const dispatch = useDispatch();

  // Getting state from Redux
  const { movieData, currentPage, totalMovies, totalPages } = useSelector(
    (state) => state.movies
  );

  // Fetch movies when the component mounts or currentPage/page limit changes
  useEffect(() => {
    dispatch(getAllMovies({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);
console.log('movieData',movieData)
  const currentItems = movieData?.movies;
  const pageCount = movieData.totalPages;

  // Handle page click event for pagination
  const handlePageClick = (event) => {

    // Dispatch to fetch the new set of movies based on the page
    dispatch(getAllMovies({ page: event.selected + 1, limit: itemsPerPage }));
  };

  return (
    <>
    <Items currentItems={currentItems} />
    <div className="pagination-container">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
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
  </>
  );
};

export default MoviesList;
