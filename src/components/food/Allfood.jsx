import React, { useContext, useState, useEffect } from 'react'
import './food.css'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
const Allfood = () => {
    var { search } = useLocation()
    console.log(search);
    const [food, setFood] = useState([]);
    const getfood = () => {
        axios.get("/getallfood" + search).then(data => {
            setFood(data.data)
            console.log(data.data);
        }).catch(e => {
            console.log(e);
        })
    }
    useEffect(() => {
        getfood()

    }, [food])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
        const results = food.filter(food =>
            food.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    return (
        <div className="container my-5">
            <div className="text-food text-center pt-5">
                {/* <p style={{ fontSize: "2rem", fontWeight: "bold" }}>Our Regular Food Collections</p> */}
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
                                <div key={index + 1} className="col-md-3 me-4 my-3 p-0 food-div">
                                    <div className="foods  p-0">
                                        <div className="">
                                            <img className='food-img ' src={`http://localhost:5000/${food.image}`} alt="" />
                                        </div>
                                        <div className="food-content">
                                            <h1 className=''>{food.name}</h1>
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
                        :
                        food.map((food, index) => {
                            return (
                                <div key={index + 1} className="col-md-3 food-div">
                                    <div className="foods  p-0">
                                        <div className="">
                                            <img className='food-img ' src={`http://localhost:5000/${food.image}`} alt="" />
                                        </div>
                                        <div className="food-content">
                                            <h1 className=''>{food.name}</h1>
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