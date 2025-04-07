import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home"
import WishList from "./pages/WishList";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <Router>
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="wish-list" element={<WishList/>}/>
      </Routes>
    </Router>
  );
};

export default App;
