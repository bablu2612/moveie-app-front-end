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
                <img src={`${baseUrl}/images/${value?.poster}`} alt={value?.title} />
                <strong>{value?.title}</strong>
                <strong>{value?.year}</strong>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

const MoviesList = ({ itemsPerPage = 5 }) => {
  const dispatch = useDispatch();

  // Fetch movies when the component mounts
  useEffect(() => {
    dispatch(getAllMovies({ page: 1, limit: itemsPerPage }));
  }, [dispatch, itemsPerPage]);

  const { movieData, currentPage, totalMovies, totalPages } = useSelector(
    (state) => state.movies
  );

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = movieData?.movies;
  const pageCount = totalPages;

  // Handle page click event for pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalMovies;
    setItemOffset(newOffset);
    dispatch(getAllMovies({ page: event.selected + 1, limit: itemsPerPage }));
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default MoviesList;
