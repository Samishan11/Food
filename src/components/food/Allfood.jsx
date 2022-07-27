import React, { useState, useEffect } from 'react'
import './food.css'
import { Link, useLocation } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import useFoodstore from '../../zustand/foodStore';
const Allfood = () => {
    let useFood = useFoodstore()
    useEffect(() => {
        useFood.getfood()
    }, [])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const results = useFood.food.filter(food =>
            food.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <div className="container my-5">
            <div className="text-food text-center pt-5">
            </div>
            <form className='search-div d-flex justify-content-center '>
                <div className="search w-50  mx-2 d-flex my-5">
                    <input value={searchTerm} onChange={handleChange} placeholder='search food' className='search-food w-100' type="text" />
                    <button className='bg-warning'>Search</button>
                </div>
            </form>
            <div className="row mx-2 mt-5">
                {
                    searchResults.length > 0 ?
                        searchResults.map((food, index) => {
                            return (
                                <div key={index + 1} className="col-md-3 my-3 food-div">
                                <div className="foods  p-0">
                                    <div className="">
                                        <img className='food-img ' src={`/${food.image}`} alt="" />
                                    </div>
                                    <div className="food-content">
                                        <h1 className=''>{food.name}</h1>
                                        <div >
                                            {
                                                food.totalrating &&
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <span style={{ fontSize: "1 rem" }} className='me-1 mt-1 text-light'>{food.totalrating.toFixed(2)}</span>
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

                                            }
                                        </div>
                                        <p className='my-1 text-white'>Rs.{food.price}</p>
                                        <div className="read-more bg-warning py-2 px-2">
                                            <Link to={`/food/${food._id}`}> <span>Read More</span></Link>
                                        </div>
                                    </div>
                                    <div className="shadow-d"></div>
                                </div>
                            </div>
                            )
                        }) :
                        useFood.food.map((food, index) => {
                            return (
                                <div key={index + 1} className="col-md-3 my-3 food-div">
                                    <div className="foods  p-0">
                                        <div className="">
                                            <img className='food-img ' src={`/${food.image}`} alt="" />
                                        </div>
                                        <div className="food-content">
                                            <h1 className=''>{food.name}</h1>
                                            <div >
                                                {
                                                    food.totalrating &&
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        <span style={{ fontSize: "1 rem" }} className='me-1 mt-1 text-light'>{food.totalrating.toFixed(2)}</span>
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

                                                }
                                            </div>
                                            <p className='my-1 text-white'>Rs.{food.price}</p>
                                            <div className="read-more bg-warning py-2 px-2">
                                                <Link to={`/food/${food._id}`}> <span>Read More</span></Link>
                                            </div>
                                        </div>
                                        <div className="shadow-d"></div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Allfood