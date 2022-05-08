import React from 'react'
import './home.css'
import burger from '../images/food/burger.jpg'
import pizza from '../images/food/pizza.jpg'
import chicken from '../images/food/chicken.jpg'
import Food from '../food/Food'
import { FoodContext } from '../Context/FoodContext'
import { Link  } from 'react-router-dom'
const Home = () => {
    const [food] = React.useContext(FoodContext);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
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
        <>
            <div className="container main">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="img">
                                <img className='mx-5' src={chicken} width={80} alt="" />
                            </div>
                            <div className="text">
                                <p className='mx-5'>Get Spiz Food by Ordering Online</p>
                            </div>
                            <div className="sub-text mt-2">
                                <p className='mx-5'>A restaurant sometimes known as a diner is a place where cooked food is sold to the public, and where people sit down to eat it. It is also a place where people go to enjoy the time and to eat a meal.</p>
                            </div>
                            <form className='search-div'>
                                <div className="search mx-5 d-flex my-5">
                                    <input value={searchTerm} onChange={handleChange} placeholder='search food' className='search-food' type="text" />
                                    <button className='bg-warning'>Search</button>
                                </div>
                                {/* <div className="searchitem mx-5">
                                    {
                                        searchResults.length >=1 ?
                                            searchResults.map(item => (
                                                <Link to={`/${item._id}`}>
                                                <div className="d-flex justify-content-around my-3 mx-3">
                                                    <img src={`http://localhost:5000/${item.image}`} width={60} alt="" />
                                                    <p className='h6 my-auto'>{item.name}</p>
                                                    <p className='h6 my-auto'>{item.price}</p>
                                                </div>
                                                </Link>
                                            )
                                            )
                                            : null}
                                </div> */}
                            </form>
                        </div>
                        <div className="col-12 col-md-6">
                            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active" data-bs-interval={3000}>
                                        <img style={{ minWidth: "100%" }} src={burger} alt="..." />
                                    </div>
                                    <div className="carousel-item" data-bs-interval={3000}>
                                        <img style={{ minWidth: "100%" }} src={pizza} alt="..." />
                                    </div>
                                    <div className="carousel-item" data-bs-interval={3000}>
                                        <img style={{ minWidth: "100%!important" }} src={chicken} alt="..." />
                                    </div>
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true" />
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="container">
                    <h1 className='h1 mx-5'>Featured Categories</h1>
                    <div className="col-md-5">
                        <p style={{ fontSize: '1rem', color: 'darkgray' }} className='mx-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="items my-5">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="item">
                                    <div className="img">
                                        <img className='item-img' src={pizza} alt="" />
                                    </div>
                                    <div className="catagory py-2 d-flex justify-content-between">
                                        <div className="food-item mx-3 d-flex">
                                            <i className="fas fa-pizza-slice my-auto h6"></i>
                                            <span className='my-auto fw-bold mx-2 h6'>Burger</span>
                                        </div>
                                        <Link to={`food/?name=Burger`}><div className="round bg-warning mx-3">
                                            <i className='fas fa-arrow-right'></i>
                                        </div></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="item">
                                    <div className="img">
                                        <img className='item-img' src={burger} alt="" />
                                    </div>
                                    <div className="catagory py-2 d-flex justify-content-between">
                                        <div className="food-item mx-3 d-flex">
                                            <i className="fas fa-pizza-slice my-auto h6"></i>
                                            <span className='my-auto fw-bold mx-2 h6'>Pizza</span>
                                        </div>
                                        <Link to={`food/?name=pizza`}> <div className="round bg-warning mx-3">
                                            <i className='fas fa-arrow-right'></i>
                                        </div></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="item">
                                    <div className="img">
                                        <img className='item-img' src={pizza} alt="" />
                                    </div>
                                    <div className="catagory py-2 d-flex justify-content-between">
                                        <div className="food-item mx-3 d-flex">
                                            <i className="fas fa-pizza-slice my-auto h6"></i>
                                            <span className='my-auto fw-bold mx-2 h6'>Pizza</span>
                                        </div>
                                        <div className="round bg-warning mx-3">
                                            <i className='fas fa-arrow-right'></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* all food */}
                <Food />
            </div>
        </>
    )
}

export default Home