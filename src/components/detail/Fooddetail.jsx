import React, { useRef, useState, useEffect } from 'react'
import './detail.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import useCartStore from '../../zustand/store';
import useFoodstore from '../../zustand/foodStore';
import ReactStars from "react-rating-stars-component";

const Fooddetail = ({ userdata }) => {
    const effectRan = useRef(false)
    let carts = useCartStore();
    let foodstore = useFoodstore();
    var Food = foodstore.detail
    const { food } = useParams();
    const user = userdata?._id
    const [price, setPrice] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false);


    useEffect(() => {
        if (effectRan.current === false) {
            foodstore.getsingleFood(food, user)
            console.log(foodstore.myrating);
        }
        return () => {
            effectRan.current = true
        }
    }, [food, foodstore, user])

    const [quantity, setQuantity] = useState(1)
    const addtocart = async (e) => {
        try {
            e.preventDefault();
            // state management using zustand
            carts.addtoCart({ id: food, name: Food?.name, quantity: quantity, price: Food?.price, user: user, image: Food?.image })
            
            // fetch api addtocart
            var cart = await axios.post('/addtocart', {
                food,
                quantity,
                user
            });
            console.log(cart);
        } catch (error) {
            console.log(error);
        }

    }
    // 
    const ratingChanged = (newRating) => {
        axios.put(`/rating-rating/${food}`, {
            user: user, rating: newRating
        }).then(res => {
            console.log(res.data)
            localStorage.setItem('foodrating', newRating)
        }).catch(e => { console.log(e) })
    };

    const checkBoxChecked = event => {
        if (event.target.checked) {
            if (event.target.name === 'small') {
                setPrice(Food.price + 10)
            } else if (event.target.name === 'medium') {
                setPrice(Food.price + 15)
            } else if (event.target.name === 'large') {
                setPrice(Food.price + 20)
            } else {
                setPrice(Food.price)
            }
        } else {
            setPrice(Food.price)
        }
        setIsSubscribed(current => !current);
    };

    return (
        <>
            <div className="container singlepage">
                <div className="row">
                    <div className="col-md-5 me-1 col-12">
                        <img style={{ height: "80vh", objectFit: "cover" }} className='foodd-img' src={`http://localhost:5000/${Food.image}`} alt="chicken" />
                    </div>
                    <div className="col-md-6 col-12">
                        <form >
                            <div className="f-name ">
                                <span className='sideline'></span>
                                <p className='fw-bold' style={{ fontSize: '5rem' }}>{Food.name}</p>
                                <span className='sideline'></span>

                            </div>
                            <div className="f-detail">
                                <ReactStars
                                    value={Food.totalrating > 0 ? foodstore.myrating : 5}
                                    count={5}
                                    onChange={ratingChanged}
                                    size={30}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                                <p style={{ fontSize: '1.2rem' }} className='pr-5 my-3 fw-bold'>{Food.description}</p>
                            </div>
                            <div className="f-price">
                                <p className='fw-bold' style={{ fontSize: '1.6rem' }}>Rs. {Food.price}</p>
                            </div>
                            <div className="size my-3">
                                <h1 className='fw-bold' style={{ fontSize: '1.6rem' }}>Choose the size</h1>
                                <div className="item-size my-3 d-flex">
                                    <div className="form-check">
                                        <input name='small' value={isSubscribed} onChange={checkBoxChecked} className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                        <label style={{ fontSize: '.8rem' }} className="fw-bold mx-1 form-check-label my-auto" htmlFor="flexCheckDefault">
                                            Small
                                        </label>
                                    </div>
                                    <div className="form-check mx-3">
                                        <input name='medium' value={isSubscribed} onChange={checkBoxChecked} className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" />
                                        <label style={{ fontSize: '.8rem' }} className="fw-bold mx-1 form-check-label my-auto" htmlFor="flexCheckChecked">
                                            Medium
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input name='large' value={isSubscribed} onChange={checkBoxChecked} className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" />
                                        <label style={{ fontSize: '.8rem' }} className="fw-bold mx-1 form-check-label my-auto" htmlFor="flexCheckChecked">
                                            Large
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="addtocart my-3 d-flex">
                                <input value={quantity} onChange={e => setQuantity(e.target.value)} style={{ height: "30px", width: '100px' }} type='number' className='' />
                                <button onClick={addtocart} style={{ fontSize: '.8rem' }} type='button' className='mx-2 text-white fw-bold bg-warning  px-4'>Add to cart</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Fooddetail