import React, { useState, useContext } from 'react'
import logo from '../images/logo/logo.png'
import './style.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CardContext'

const Navbar = ({ token }) => {
    const [cart] = useContext(CartContext);
    const [colorChange, setColorchange] = useState(false);
    const changeNavbarColor = () => {
        if (window.scrollY > 0) {
            setColorchange(true);
        }
        else {
            setColorchange(false);
        }
    };
    window.addEventListener('scroll', changeNavbarColor);
    
    const logout = () => {
        localStorage.clear('token')
        window.location = '/'
    }

    return (
        <>
            <nav className={`${colorChange ? 'navbar bg-white fixed-top nav_bar navbar-expand-lg navbar-light' : 'navbar fixed-top nav_baralt navbar-expand-lg navbar-light'}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex mx-5" to="/">
                        <img width={55} src={logo} alt="" /><span className='my-auto'>MANDU</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fw-bold h6 mx-2" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold h6 mx-2" to="/food">Food</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold h6 mx-2" to="#">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fw-bold h6 mx-2" to="/contact">Contact</Link>
                            </li>
                            {
                                token ? <li className="nav-item">
                                <Link className="nav-link fw-bold h6 mx-2" to="/order">My Order</Link>
                            </li>
                            :null
                            }
                        </ul>
                        {
                            token ? <div className="cart-count mx-5">
                                <Link to='/cart' className='fa fa-shopping-cart h5 '>
                                    <small>{cart.length}</small>
                                </Link>
                            </div> : null
                        }
                        <div className="log_reg my-auto d-block">
                            {
                                token ?
                                    <button onClick={logout} className='btn btn-outline-danger mx-2'>Logout</button>
                                    :
                                    <>
                                        <Link to='/login' className='btn btn-outline-warning mx-2'>Sign In</Link>
                                        <Link to='/register' className='btn btn-outline-warning mx-2'>Sign Up</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar