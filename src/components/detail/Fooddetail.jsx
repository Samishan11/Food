import React, { useContext, useState, useEffect } from 'react'
import './detail.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/CardContext'
const Fooddetail = () => {
    const [cart, setCart] = useContext(CartContext)
    console.log(cart);
    const { food } = useParams();
    const [Food, setFood] = useState({});
    useEffect(() => {
        const foodDetail = async () => {
            const responce = await axios.get(`/fooddetail/${food}`);
            if (responce.data) {
                setFood(responce.data)
            }
        }
        foodDetail()
    }, [food])

    const [quantity, setQuantity] = useState(1)

    const addtocart = async (e) => {
        try {
            e.preventDefault();
            const cart = await axios.post('/addtocart', {
                food,
                quantity
            });
            setCart(prevData => [...prevData, cart.data.Cart])
            console.log(cart.data.Cart);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className="container singlepage">
                <div className="row">
                    <div className="col-md-5 col-12">
                        <img className='foodd-img' src={`http://localhost:5000/${Food.image}`} alt="chicken" />
                    </div>
                    <div className="col-md-7 col-12">
                        <form onSubmit={addtocart}>
                            <div className="f-name ">
                                <span className='sideline'></span>
                                <p className='fw-bold' style={{ fontSize: '2rem' }}>{Food.name}</p>
                                <span className='sideline'></span>
                            </div>
                            <div className="f-detail">
                                <p style={{ fontSize: '1rem' }} className='pr-5 my-3 fw-bold'>{Food.description}</p>
                            </div>
                            <div className="f-price">
                                <p className='fw-bold' style={{ fontSize: '1rem' }}>Rs. {Food.price}</p>
                            </div>
                            <div className="size my-3">
                                <h1 className='fw-bold' style={{ fontSize: '1.1rem' }}>Choose the size</h1>
                                <div className="item-size my-3 d-flex">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                        <label style={{ fontSize: '.8rem' }} className="fw-bold mx-1 form-check-label my-auto" htmlFor="flexCheckDefault">
                                            Small
                                        </label>
                                    </div>
                                    <div className="form-check mx-3">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                        <label style={{ fontSize: '.8rem' }} className="fw-bold mx-1 form-check-label my-auto" htmlFor="flexCheckChecked">
                                            Medium
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked" defaultChecked />
                                        <label style={{ fontSize: '.8rem' }} className="fw-bold mx-1 form-check-label my-auto" htmlFor="flexCheckChecked">
                                            Large
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="addtocart my-3 d-flex">
                                <input value={quantity} onChange={e => setQuantity(e.target.value)} style={{ height: "30px", width: '80px' }} type='number' className='' />
                                <button style={{ fontSize: '.6rem' }} type='submit' className='mx-2 text-white fw-bold bg-warning  px-2'>Add to cart</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Fooddetail