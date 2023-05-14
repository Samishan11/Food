import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useFoodstore from "../../zustand/foodStore";
import ReactStars from "react-rating-stars-component";
const Searchfood = () => {
  let { search } = useParams();
  console.log(search);
  let useFood = useFoodstore();
  useEffect(() => {
    useFood.getfood();
  }, []);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const results = useFood.food.filter((food) =>
      food.name.toLowerCase().includes(search)
    );
    setSearchResults(results);
  }, [search]);
  return (
    <div className="container my-5">
      {searchResults.length > 0 && (
        <div className="text-food text-center pt-5">
          <h1 style={{ fontSize: "1.4rem" }}>Search Items</h1>
        </div>
      )}
      <div className="row mx-2 mt-5">
        {searchResults.length > 0 ? (
          searchResults.map((food, index) => {
            return (
              <div key={index + 1} className="col-md-3 me-4 my-3 p-0 food-div">
                <div className="foods  p-0">
                  <div className="">
                    <img
                      className="food-img "
                      src={`https://backend-foodapi.up.railway.app/${food.image}`}
                      alt=""
                    />
                  </div>
                  <div className="food-content">
                    <h1 className="">{food.name}</h1>
                    <div>
                      {food.totalrating && (
                        <div className="d-flex align-items-center justify-content-center">
                          <span
                            style={{ fontSize: "1 rem" }}
                            className="me-1 mt-1 text-light"
                          >
                            {food.totalrating.toFixed(2)}
                          </span>
                          <ReactStars
                            value={food.totalrating}
                            count={food.totalrating}
                            size={14}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                        </div>
                      )}
                    </div>
                    <p className="my-1 text-white">Rs.{food.price}</p>
                    <div className="read-more bg-warning py-2 px-2">
                      <Link to={`/food/${food._id}`}>
                        {" "}
                        <span>Read More</span>
                      </Link>
                    </div>
                  </div>
                  <div className="shadow-d"></div>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ fontSize: "1.2rem" }} className="text-center mt-5">
            Search item not found
          </p>
        )}
      </div>
    </div>
  );
};

export default Searchfood;
