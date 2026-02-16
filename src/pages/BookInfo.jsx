import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import Rating from "../components/ui/Rating";
import Price from "../components/ui/Price";
import Book from "../components/ui/Book";
import { Helmet } from "react-helmet";

const BookInfo = ({ books, addToCart, cart = [] }) => {
  const { id } = useParams();
  const book = books.find((b) => +b.id === +id);

  if (!book) return <div>Book not found</div>;

  const bookInCart = cart.some((b) => +b.id === +id);
  console.log("BookInfo id:", id, "cart:", cart);

  return (
    <>
      <Helmet>
        <title>{book.title} | Library Store</title>
      </Helmet>

      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="row">
              <div className="book__selected--top">
                <Link to="/books" className="book__link">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <Link to="/books" className="book__link">
                  <h2 className="book__selected--title--top">Books</h2>
                </Link>
              </div>
              <div className="book__selected">
                <figure className="book__selected--figure">
                  <img src={book.url} className="book__selected--img" alt="" />
                </figure>
                <div className="book__selected--description">
                  <h2 className="book__selected--title">{book.title}</h2>
                  <Rating rating={book.rating} />
                  <div className="book__selected--price">
                    <Price
                      originalPrice={book.originalPrice}
                      salePrice={book.salePrice}
                    />
                  </div>
                  <div className="book__summary">
                    <h3 className="book__summary--title">Summary</h3>
                    <p className="book__summary--para">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Et quae ratione similique vero ad expedita vel doloribus.
                      Blanditiis, iure dicta laborum iusto error consequuntur
                      expedita voluptates veniam, quibusdam tempora doloremque?
                    </p>
                    <p className="book__summary--para">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Et quae ratione similique vero ad expedita vel doloribus.
                      Blanditiis, iure dicta laborum iusto error consequuntur
                      expedita voluptates veniam, quibusdam tempora doloremque?
                    </p>
                  </div>
                  {bookInCart ? (
                    <Link to="/cart">
                      <button className="btn">Checkout</button>
                    </Link>
                  ) : (
                    <button className="btn" onClick={() => addToCart(book)}>
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="books__container">
            <div className="book__selected--top">
              <h2 className="book__selected--title-top">Recommended Books</h2>
            </div>
            <div className="books">
              {books
                .filter((book) => book.rating === 5 && +book.id !== +id)
                .slice(0, 4)
                .map((book) => (
                  <Book book={book} key={book.id} />
                ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BookInfo;
