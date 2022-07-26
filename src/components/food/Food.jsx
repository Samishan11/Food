import React from 'react'
import './food.css'
import { Link } from 'react-router-dom'
import useFoodstore from '../../zustand/foodStore'
import ReactStars from "react-rating-stars-component";

// import { FoodContext } from '../Context/FoodContext'
const Food = () => {
    let food = useFoodstore()
    React.useEffect(() => {
        food.getfood()
    }, [])
    return (
        <div className="container my-5 mx-2">
            <div className="text-food text-center">
                <p style={{ fontSize: "2rem", fontWeight: "bold" }}>Our Regular Food Collections</p>
                <p style={{ fontSize: '1rem', color: 'darkgray' }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed necessitatibus expedita, <br /> nisi dolor incidunt adipisci at. Ipsum perspiciatis fugit porro, expedita quisquam illo voluptas?</p>
            </div>
            <div className="row mt-5">
                {
                    food.food?.map((food, index) => {
                        return (
                            <div key={index + 1} className="col-md-3 my-3 food-div">
                                <div className="foods  p-0">
                                    <div className="">
                                        <img className='food-img ' src={`https://mern-foodapp.herokuapp.com/${food.image}`} alt="" />
                                    </div>
                                    <div className="food-content">
                                        <h1 className=''>{food.name}</h1>
                                        <div >
                                            {
                                                food.totalrating &&
                                                <div className='d-flex align-items-center justify-content-center'>
                                                <span style={{fontSize:"1 rem"}} className='me-1 mt-1 text-light'>{food.totalrating.toFixed(2)}</span>
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

export default Food