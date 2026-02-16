import EmptyCart from "../assets/empty_cart.svg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Cart = ({ cart = [], changeQuantity, removeFromCart }) => {
  const subtotal = cart.reduce((sum, book) => {
    const price = book.salePrice ?? book.originalPrice ?? 0;
    return sum + price * (book.quantity ?? 1);
  }, 0);

  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  return (
    <>
      <Helmet>
        <title>Cart | Library Store</title>
      </Helmet>
      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="row">
              <div className="book__selected--top">
                <h2 className="cart__title">Cart</h2>
              </div>

              <div className="cart">
                <div className="cart__header">
                  <span className="cart__book">Book</span>
                  <span className="cart__quantity">Quantity</span>
                  <span className="cart__total">Price</span>
                </div>

                <div className="cart__body">
                  {cart.length === 0 ? (
                    <div className="cart__empty">
                      <img
                        src={EmptyCart}
                        alt=""
                        className="cart__empty--img"
                      />
                      <h2>You don't have any books in your cart!</h2>
                      <Link to="/books">
                        <button className="btn">Browse Books</button>
                      </Link>
                    </div>
                  ) : (
                    cart.map((book) => {
                      const price = book.salePrice ?? book.originalPrice ?? 0;
                      const qty = book.quantity ?? 1;
                      const lineTotal = price * qty;

                      return (
                        <div className="cart__item" key={book.id}>
                          <div className="cart__book">
                            <img
                              src={book.url}
                              alt=""
                              className="cart__book--img"
                            />
                            <div className="cart__book--info">
                              <span className="cart__book--title">
                                {book.title}
                              </span>
                              <span className="cart__book--price">
                                ${price.toFixed(2)}
                              </span>
                              <button
                                className="cart__book--remove"
                                onClick={() => removeFromCart?.(book.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>

                          <div className="cart__quantity">
                            <input
                              type="number"
                              min={0}
                              max={99}
                              className="cart__input"
                              value={qty}
                              onChange={(e) =>
                                changeQuantity?.(book.id, e.target.value)
                              }
                            />
                          </div>

                          <div className="cart__total">
                            ${lineTotal.toFixed(2)}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            {cart.length > 0 && (
              <div className="total">
                <div className="total__item total__subtotal">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total__item total__tax">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="total__item total__price">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  className="btn btn__checkout no-cursor"
                  onClick={() => alert("Feature not yet implemented")}
                >
                  Proceed to checkout
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;
