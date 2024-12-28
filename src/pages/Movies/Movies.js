

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import image from '../../Assets/Image.png'
import image1 from '../../Assets/Image1.png'
import image2 from '../../Assets/Image2.png'
import image3 from '../../Assets/Image3.png'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../../Reducer/MovieSlice';

// Example items, to simulate fetching from another resources.

// const items = [
//     {
//         image:image,
//         title:'Movie',
//         year:'2021',
//     },
//     {
//         image:image1,
//         title:'Movie1',
//         year:'2021',
//     },
//     {
//         image:image2,
//         title:'Movie2',
//         year:'2021',
//     },
//     {
//         image:image3,
//         title:'Movie3',
//         year:'2021',
//     },
//     {
//         image:image,
//         title:'Movie1',
//         year:'2021',
//     },
//     {
//         image:image1,
//         title:'Movie1',
//         year:'2021',
//     },
//     {
//         image:image2,
//         title:'Movie1',
//         year:'2021',
//     },
//     {
//         image:image3,
//         title:'Movie1',
//         year:'2021',
//     },
//     {
//         image:image1,
//         title:'Movie1',
//         year:'2021',
//     },
// ];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((value,index) => (
            <div key={index} className='container'>
                <div className='row'>
                    <div className='card'>
                    <img src={value?.image}/>
                    <strong>{value?.title}</strong>
                    <strong>{value?.year}</strong>
                    </div>
                </div>

            </div>
        ))}
    </>
  );
}

const MoviesList = ({itemsPerPage}) => {
  const {movies,currentPage,totalMovies,totalPages} = useSelector((state) =>{ return state?.movies?.movieData})
    // const [itemOffset, setItemOffset] = useState(1);
    // const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // const currentItems = movies.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(movies.length / itemsPerPage);

    const [itemOffset, setItemOffset] = useState(1);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = movies.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(movies.length / itemsPerPage);


    console.log("dataaa",movies)

    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(getAllMovies({page:currentPage,limit:itemsPerPage}))

    },[dispatch])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items
         currentItems={currentPage}
         />
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
