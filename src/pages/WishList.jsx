import React, { useEffect, useState } from "react";
import { fetchBookDetails } from "../services/bookService";
import "../assets/Styles/WishlistBooks.css";

const WishlistBooks = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const wishlistBooks = JSON.parse(localStorage.getItem("wishlist")) || [];

    const loadBooks = async () => {
      try {
        setLoading(true);
      const data = await Promise.all(
        wishlistBooks.map(async (id) => await fetchBookDetails(id))
      );
      const extractBooks = data.map(({ id, authors, title, formats, subjects }) => ({
        id,
        authorName: authors[0]?.name || "Unknown Author",
        title,
        coverImage: formats["image/jpeg"] || "https://via.placeholder.com/150",
        genre: subjects || [],
    }));
    setWishlist(extractBooks);
      } catch (error) {
        
      }
      finally{
       
        setLoading(false);
      }

  
    };

    if (wishlistBooks.length > 0) {
      loadBooks();
    }
  }, []);

  const handleRemove = (id) => {
    const updatedWishlist = wishlist.filter((book) => book.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist.map((b) => b.id)));
  };

  return (
    <div className="wishlist-container">
      {loading? <p>Loading....</p> :
      wishlist.length > 0 ? (
        wishlist.map((book) => (
          <div key={book.id} className="wishlist-card">
            <img src={book.coverImage} alt={book.title} className="wishlist-image" />
            <h3 className="wishlist-title">{book.title}</h3>
            <p className="wishlist-author">{book.authorName}</p>
            <button onClick={() => handleRemove(book.id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="no-book">No books in your wishlist.</p>
      )}
    </div>
  );
};

export default WishlistBooks;
