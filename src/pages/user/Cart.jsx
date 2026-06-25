import { useEffect, useState } from "react";

import {
  getCart,
  removeCartItem,
  updateCart,
} from "../../services/cartService";
import { placeOrder } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await getCart();

      setCartItems(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      await updateCart(item.cartId, item.quantity + 1);

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;

    try {
      await updateCart(item.cartId, item.quantity - 1);

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (cartId) => {
    if (!window.confirm("Remove this item from cart?")) return;

    try {
      await removeCartItem(cartId);

      loadCart();
    } catch (error) {
      console.log(error);
    }
  };

  const grandTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  if (loading) {
    return (
      <div className="container mt-5">
        <h3>Loading cart...</h3>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!window.confirm("Place this Order?")) return;

    try {
      const response = await placeOrder();
      alert(response.data.message);

      navigate("/my-orders");
    } catch (error) {
      alert(error.response?.data || "Unable to place order");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="card mb-3 shadow-sm" key={item.cartId}>
              <div className="row g-0">
                <div className="col-md-2">
                  <img
                    src={`${SERVER_URL}${item.imageUrl}`}
                    alt={item.medicineName}
                    className="img-fluid rounded-start"
                    style={{
                      height: "150px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-10">
                  <div className="card-body">
                    <h5>{item.medicineName}</h5>

                    <p className="mb-1">Price : ₹{item.unitPrice}</p>

                    <p className="mb-1">Discount : ₹{item.discount}</p>

                    <div className="d-flex align-items-center my-3">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>

                      <span className="mx-3 fw-bold">{item.quantity}</span>

                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>

                    <h6>Total : ₹{item.totalPrice}</h6>

                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => handleRemove(item.cartId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="card shadow p-4">
            <div className="d-flex justify-content-between">
              <h4>Grand Total</h4>

              <h4>₹{grandTotal}</h4>
            </div>

            <button className="btn btn-success mt-3" onClick={handleCheckout}>
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
