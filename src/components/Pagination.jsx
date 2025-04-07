import React from 'react';
import '../assets/Styles/Pagination.css';

const Pagination = ({totalBooks, booksPerPage, currentPage, paginate}) => {
    const totalPages = Math.ceil(totalBooks/booksPerPage);
    
    return (
        <div className='pagination'>
            {
                Array.from({length:totalPages},(_,i)=>(
                    <button key={i+1} onClick={()=>paginate(i+1)}
                    className={`page-btn ${currentPage === i+1? "active":""}`}
                    >
                       {i+1}
                    </button>
                ))
            }
            
        </div>
    );
};

export default Pagination;