import React from 'react'
import { Link } from 'react-router-dom'
import usefoodtore from '../../zustand/foodStore'
const Product = () => {
    let food = usefoodtore()
    console.log(food.food);
    return (
        <div className="container-fluid px-4">
            <div className="row mt-5">
                {
                    food.food?.map((food, index) => {
                        return (
                            <div key={index + 1} className="col-md-3 my-3 food-div">
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

export default Product;