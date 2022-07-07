import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Books } from './components/Books';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { Favorites } from './components/Favorites';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [booksInCart, setBooksInCart] = useState([]);
  const [price, setPrice] = useState(0);

  const fetchData = () => {
    fetch('http://localhost:8000/')
    .then(res => res.json())
    .then(data => setData(data.books))
  }

  const handleAddToFavorites = (book, isFav) => {
    const isFavorite = favoriteBooks.find(favoriteBook => favoriteBook.isbn13 === book.isbn13)
   
    const removeFavorite = favoriteBooks.filter(favoriteBook => favoriteBook.isbn13 !== book.isbn13);

    if (!isFavorite) {
      setFavoriteBooks([...favoriteBooks, book])
    }

    if (isFav) {
      setFavoriteBooks(removeFavorite)
    }
  }

  const handleAddToCart = (bookInfo) => {
    setPrice(price + Number(bookInfo.price.substring(1)))

    let newCart = [...booksInCart];
    let isInCart = newCart.find(book => book.isbn13 === bookInfo.isbn13);
    if (!isInCart) {
      isInCart = { ...bookInfo, quantity: 1 }
      newCart.push(isInCart)
    } else if (isInCart) {
      isInCart.quantity++;
    }

    setBooksInCart(newCart)
  }

  useEffect(fetchData, [])


  return (
    <div className="App">
        <Navbar total={price.toFixed(2)} />
          <h1>Book Store</h1>
            <Routes>
              <Route path="/" element={<Books books={data} handleAddToCart={handleAddToCart} handleAddToFavorites={handleAddToFavorites} />} />
              <Route path="/cart" element={<Cart total={price.toFixed(2)} booksInCart={booksInCart} />} />
              <Route path="/favorites" element={<Favorites favoriteBooks={favoriteBooks} />} />
            </Routes>
      </div>
  );
}

export default App;
