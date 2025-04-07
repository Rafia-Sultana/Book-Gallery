
import { useEffect, useState } from "react"
import "../assets/Styles/BookCard.css"

export default function BookCard({book, toggleWishList}) {
  
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.includes(book.id));
  }, [book.id]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    const newWishlistedState = !isWishlisted;
    setIsWishlisted(newWishlistedState);
    toggleWishList(book.id, newWishlistedState);
  };


let genres = new Set();

  book.genre?.forEach(subject => {
    if (subject.toLowerCase().includes("fiction")) {
      genres.add("Fiction"); 
    } else {
      subject.split(" -- ").forEach(sub => {
        sub = sub.trim();
        if (!sub.toLowerCase().includes("fiction")) { 
          genres.add(sub); 
        }
      });
    }
  });

  
  return (
    <div
      className={`book-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="book-cover-container">
        <div className={`book-cover-wrapper ${isHovered ? "hovered" : ""}`}>
          <img src={book.coverImage || "/placeholder.svg"} alt={`Cover of ${book.title}`} className="book-cover" />

          <div className={`book-cover-overlay ${isHovered ? "visible" : ""}`} />
        </div>

        <button
          className={`wishlist-button ${isHovered ? "visible" : ""} ${isWishlisted ? "wishlisted" : ""}`}
          onClick={handleWishlistToggle}
        >
          <svg
            className={`wishlist-icon ${isWishlisted ? "active" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        </button>

        <div className="book-id">#{book.id}</div>
      </div>

      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.authorName}</p>

        <div className="book-genres">
          {[...genres].slice(0, 3).map((genre, idx) => (
            <span key={idx} className="book-genre">
              {genre}
            </span>
          ))}
        </div>

        <div className={`book-actions ${isHovered ? "visible" : ""}`}>
          <button className="view-details-button">
            <svg
              className="details-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            View Details
          </button>
        </div>
      </div>

      <div className={`book-glow ${isHovered ? "visible" : ""}`} />
    </div>
  )
}

