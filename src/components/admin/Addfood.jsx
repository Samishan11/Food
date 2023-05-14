import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import usefoodtore from "../../zustand/foodStore";
const Addfood = () => {
  let food = usefoodtore();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [cartagory, setCatagory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    food.getfood();
  }, []);

  // add food
  const addFood = async (e) => {
    e.preventDefault();
    food.addFood({ name, price, description, image, cartagory });
    console.log(food);
    let fd = new FormData();
    fd.append("name", name);
    fd.append("price", price);
    fd.append("description", description);
    fd.append("cartagory", cartagory);
    fd.append("image", image);
    var res = await axios.post("/addfood", fd);
    if (res.data) {
      food.addFood(fd);
    }
    console.log(res);
  };

  // remove food
  const deleteFood = (id) => {
    food.removeFood(id);
    console.log(id);
  };

  return (
    <div className="container-fluid px-4">
      <div className="row my-5">
        <h3 className="fs-4 mb-3">Recent Foods</h3>
        <div className="col">
          <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-outline-dark my-4"
          >
            Chick here to add a food
          </button>
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
              <tr>
                <th scope="col" width={50}>
                  #
                </th>
                <th scope="col">Food Name</th>
                <th scope="col">Food Price</th>
                <th scope="col">Food Catagory</th>
                <th scope="col">Food Description</th>
              </tr>
            </thead>
            <tbody>
              {food.food?.map((data, ind) => {
                return (
                  <tr key={ind + 1}>
                    <th scope="row">{ind + 1}</th>
                    <td>{data.name}</td>
                    <td>{data.price}</td>
                    <td>Food</td>
                    <td width={600}>{data.description?.slice(0, 80)}...</td>
                    <td>
                      <button
                        data-bs-toggle="modall"
                        data-bs-target="#exampleModall"
                        className="fas fa-pen text-success"
                      ></button>
                    </td>
                    <td>
                      <i
                        onClick={deleteFood.bind(this, data._id)}
                        className="fas fa-trash text-danger"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title" id="exampleModalLabel">
                Add Food
              </h1>
              <button
                type="button"
                className="btn-close text-danger fas fa-times"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              id="contact-form"
              onSubmit={addFood}
              style={{ fontSize: "1rem" }}
              className="container validate-form"
            >
              <div className="modal-body">
                <div style={{ marginTop: "100px" }} className="container  pb-5">
                  <div className="container py-3 bg-white d-block mx-auto">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Food Name</label>
                          <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter foodname"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Food Price</label>
                          <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            className="form-control input100"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter foodprice"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="exampleInputEmail1">catagory*</label>
                      <select
                        onChange={(e) => setCatagory(e.target.value)}
                        class="form-select form-control input100"
                        aria-label="Default select example"
                      >
                        <option selected>Open this select menu</option>
                        <option value="food">Food</option>
                        <option value="fruit">Fruit</option>
                        <option value="drink">Drink</option>
                      </select>
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="exampleInputEmail1">Image*</label>
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        className="form-control input100"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter foodprice"
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="exampleInputEmail1">Description*</label>
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        class="form-control input100"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    {/* <button className='btn btn-outline-dark d-block mx-auto'>Add</button> */}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="sumbit" className="btn btn-outline-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addfood;
