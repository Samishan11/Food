import React, { useEffect } from "react";
import "./order.css";
import useCartStore from "../../zustand/store";
import img from "../../images/emptyorder.jpg";
const OrderStatus = () => {
  let store = useCartStore();
  var showorder = store.orders;

  useEffect(() => {
    store.getOrders();
  }, []);

  return (
    <>
      <div className="container cart-food">
        <div className="carts">
          {showorder.length !== 0 ? (
            Object.keys(showorder).map((cart, index) => {
              return (
                <div key={index} className="bg-light my-5">
                  <p className="text-center h5 fw-bold py-2">Order Summery</p>
                  <div className="row">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      className="col-md-6 col-12"
                    >
                      <p className="h6 my-2 fw-bold">
                        Username: {showorder[cart]?.user?.username}
                      </p>
                      <p className="h6 my-2 fw-bold">
                        Email: {showorder[cart]?.user?.email}
                      </p>
                      {showorder[cart].payment ? (
                        <p className="h6 my-2 fw-bold">Payment: Payed</p>
                      ) : (
                        <p className="h6 my-2 fw-bold">Payment: Not Pay</p>
                      )}
                      <p className="h6 my-2 fw-bold">
                        Date: {new Date(showorder[cart]?.order_at).toString()}
                      </p>
                      <div className="d-flex order-track">
                        <p className="h6  mx-2 fw-bold">Order Status:</p>
                        {showorder[cart]?.status === "pending" ? (
                          <div className="track">
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-times" />{" "}
                              </span>{" "}
                              <span className="text">Order pending</span>{" "}
                            </div>
                            <div className="step ">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-check" />{" "}
                              </span>{" "}
                              <span className="text"> Order accepted</span>{" "}
                            </div>
                            <div className="step">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-truck" />{" "}
                              </span>{" "}
                              <span className="text"> On the way </span>{" "}
                            </div>
                            <div className="step">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-box" />{" "}
                              </span>{" "}
                              <span className="text">Delivered</span>{" "}
                            </div>
                          </div>
                        ) : showorder[cart]?.status === "approved" ? (
                          <div className="track">
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-times" />{" "}
                              </span>{" "}
                              <span className="text">Order pending</span>{" "}
                            </div>
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-check" />{" "}
                              </span>{" "}
                              <span className="text"> Order accepted</span>{" "}
                            </div>
                            <div className="step">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-truck" />{" "}
                              </span>{" "}
                              <span className="text"> On the way </span>{" "}
                            </div>
                            <div className="step">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-box" />{" "}
                              </span>{" "}
                              <span className="text">Delivered</span>{" "}
                            </div>
                          </div>
                        ) : showorder[cart]?.status === "onway" ? (
                          <div className="track">
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-times" />{" "}
                              </span>{" "}
                              <span className="text">Order pending</span>{" "}
                            </div>
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-check" />{" "}
                              </span>{" "}
                              <span className="text"> Order accepted</span>{" "}
                            </div>
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-truck" />{" "}
                              </span>{" "}
                              <span className="text"> On the way </span>{" "}
                            </div>
                            <div className="step">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-box" />{" "}
                              </span>{" "}
                              <span className="text">Delivered</span>{" "}
                            </div>
                          </div>
                        ) : showorder[cart]?.status === "delivered" ? (
                          <div className="track">
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-times" />{" "}
                              </span>{" "}
                              <span className="text">Order pending</span>{" "}
                            </div>
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-check" />{" "}
                              </span>{" "}
                              <span className="text"> Order accepted</span>{" "}
                            </div>
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-truck" />{" "}
                              </span>{" "}
                              <span className="text"> On the way </span>{" "}
                            </div>
                            <div className="step active">
                              {" "}
                              <span className="icon">
                                {" "}
                                <i className="fa fa-box" />{" "}
                              </span>{" "}
                              <span className="text">Delivered</span>{" "}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
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
                        {showorder[cart]?.foods?.map((food, index) => {
                          return (
                            <tbody key={index + 1}>
                              <tr>
                                <td>
                                  <img
                                    src={`https://backend-foodapi.up.railway.app/${food?.food?.image}`}
                                    width={80}
                                    alt=""
                                  />
                                  <span
                                    style={{ fontSize: "1rem" }}
                                    className="mx-3"
                                  >
                                    {food.food.name}
                                  </span>
                                </td>
                                <td>
                                  <p style={{ fontSize: "1rem" }}>
                                    {food?.quantity}
                                  </p>
                                </td>
                                <td>
                                  <p style={{ fontSize: "1rem" }}>
                                    Rs. {food?.food?.price * food?.quantity}
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                        {
                          <thead>
                            <p
                              style={{ border: "none", width: "250%" }}
                              className="my-4 h6 fw-bold d-block text-center"
                            >
                              Total: {showorder[cart].total_price}
                            </p>
                          </thead>
                        }
                      </table>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <img className="no-order" src={img} alt="" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
