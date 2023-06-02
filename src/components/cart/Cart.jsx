import React, { useState, useEffect } from "react";
import myKey from "../khalti/khaltikeys";
import "./cart.css";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import useCartStore from "../../zustand/store";
import { Link } from "react-router-dom";
import emptycartimage from "../../images/emptycart.png";
import { toast } from "react-toastify";
const Cart = () => {
  let carts = useCartStore();
  useEffect(() => {
    carts.getCarts();
  }, []);

  // get cart total
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      carts.carts.reduce(
        (acc, cur) => acc + Number(cur.price * cur.quantity),
        0
      )
    );
  }, [carts]);

  // update cart
  const updatecart = (data, quantity) => {
    carts.updateCart(data, quantity);
    axios
      .put(
        `https://food-backend-50oj.onrender.com/api/updatecart/${data._id}`,
        {
          quantity,
        }
      )
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // remove cart
  const removecart = (id) => {
    carts.removeCart(id);
    axios
      .delete(`https://food-backend-50oj.onrender.com/api/removecart/${id}`, {})
      .then((data) => {
        // console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // jsonwebtoken parse
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  // get user form the token
  const token_data = localStorage.getItem("token");
  const token = parseJwt(token_data);
  const user = token?._id;

  // order
  const order = (e) => {
    e.preventDefault();
    axios
      .post("https://food-backend-50oj.onrender.com/api/order", {
        user: user,
        total_price: total,
        foods: carts.carts,
      })
      .then((cart) => {
        carts.addOrder(carts.carts);
        console.log(carts);
        // console.log(cart);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // khalti payment integration
  let config = {
    publicKey: myKey.publicTestKey,
    productIdentity: "12345",
    productName: "foods",
    productUrl: "https://food-backend-50oj.onrender.com/",
    eventHandler: {
      onSuccess(payload) {
        console.log(payload);
        carts.addOrder(carts.carts);
        console.log(carts);
        axios
          .post("https://food-backend-50oj.onrender.com/api/order", {
            user: user,
            total_price: total,
            foods: carts.carts,
            payment: true,
          })
          .then((cart) => {
            console.log(cart);
          })
          .catch((e) => {
            console.log(e);
          });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  let checkout = new KhaltiCheckout(config);

  return (
    <>
      <div className="container cart-food">
        {carts.carts.length < 1 ? (
          <img src={emptycartimage} alt="" />
        ) : (
          <div className="carts">
            <table className="table border">
              <thead>
                <tr>
                  <th style={{ fontSize: "1rem" }} scope="col">
                    Food
                  </th>
                  <th style={{ fontSize: "1rem" }} scope="col">
                    Quantity
                  </th>
                  <th style={{ fontSize: "1rem" }} scope="col">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {carts.carts?.map((cart, index) => {
                  return (
                    <tr key={index + 1}>
                      <td>
                        <img
                          src={`https://food-backend-50oj.onrender.com/${cart.image}`}
                          width={80}
                          alt=""
                        />
                        <span style={{ fontSize: "1rem" }} className="mx-3">
                          {cart.name}
                        </span>
                      </td>
                      <td className="d-flex border-none">
                        {cart.quantity === 1 ? (
                          <button
                            disabled
                            onClick={updatecart.bind(
                              this,
                              cart,
                              cart.quantity - 1
                            )}
                            className=" bg-secondary px-3 fas fa-minus"
                          ></button>
                        ) : (
                          <button
                            onClick={updatecart.bind(
                              this,
                              cart,
                              cart.quantity - 1
                            )}
                            className="fas bg-warning px-3  fa-minus"
                          ></button>
                        )}
                        <p
                          className="px-5 mx-2 fw-bold"
                          style={{ fontSize: "1rem", background: "lightgray" }}
                        >
                          {cart?.quantity}
                        </p>
                        <button
                          onClick={updatecart.bind(
                            this,
                            cart,
                            cart.quantity + 1
                          )}
                          className="fas bg-warning px-3 fa-plus"
                        ></button>
                      </td>
                      <td>
                        <p style={{ fontSize: "1rem" }}>
                          Rs. {cart.price * cart?.quantity}
                        </p>
                      </td>
                      <td>
                        <i
                          onClick={removecart.bind(this, cart._id)}
                          className="fas h6 text-danger fa-times"
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="cart-total-cost text-right">
              <p style={{ fontSize: "1rem" }} className="fw-bold">
                Total: <span style={{ fontSize: "1rem" }}>{total}</span>
              </p>
            </div>
            {/* <form > */}
            <div className="checkout-btn d-flex  justify-content-between my-5">
              <Link
                to="/"
                style={{ fontSize: ".7rem" }}
                className="bg-warning my-auto fa fa-arrow-left px-2 py-3"
              >
                {" "}
                Continue Shopping
              </Link>
              <div className="btnss d-flex flex-column">
                <button
                  onClick={order}
                  type="submit"
                  style={{ fontSize: ".7rem" }}
                  className="bg-warning fw-bold py-2 text-dark px-3"
                >
                  Checkout
                </button>
                <button
                  onClick={() => checkout.show({ amount: 10 * 100 })}
                  type="submit"
                  style={{ fontSize: ".7rem" }}
                  className="bg-warning my-2 py-2 fw-bold text-dark px-3"
                >
                  Khalti
                </button>
              </div>
            </div>
            {/* </form> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
