import { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart((prev) => {
      const existingBook = prev.find((b) => +b.id === +book.id);

      if (existingBook) {
        return prev.map((b) =>
          +b.id === +book.id ? { ...b, quantity: b.quantity + 1 } : b,
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  }

  function changeQuantity(bookId, quantity) {
    setCart((prev) =>
      prev
        .map((b) =>
          +b.id === +bookId ? { ...b, quantity: Number(quantity) } : b,
        )
        .filter((b) => b.quantity > 0),
    );
  }

  function removeFromCart(bookId) {
    setCart((prev) => prev.filter((b) => +b.id !== +bookId));
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  return (
    <div className="App">
      <Nav numberOfItems={numberOfItems()} />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/books" exact render={() => <Books books={books} />} />
        <Route
          path="/books/:id"
          render={() => (
            <BookInfo books={books} cart={cart} addToCart={addToCart} />
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <Cart
              books={books}
              cart={cart}
              changeQuantity={changeQuantity}
              removeFromCart={removeFromCart}
            />
          )}
        />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
