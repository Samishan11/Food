import React, { createContext, useEffect, useState, useReducer } from "react";
import axios from "axios";
import { getcarts, setcart } from "../../Redux/action/cartAction";
import {useDispatch} from 'react-redux'
export const CartContext = createContext()
export const Cartprovider = (props) => {
    const token = localStorage.getItem('token')
    const [contextCart, setContextCart] = useState([]);
    const dispatch = useDispatch()
    
    useEffect(() => {
        const getcart = () => {
            axios.get("/getcart").then(data => {
                setContextCart(data.data)
                // dispatch(getcarts(data.data))
                dispatch(setcart(data.data))
                // console.log(data.data);
            }).catch(e => {
                console.log(e)
            })
        }
        if (!token || !contextCart) {
            // console.log('token not found');
        } else {
            getcart()
        }
    }, [token])


    return (
        <CartContext.Provider value={[contextCart, setContextCart]}>
            {props.children}
        </CartContext.Provider>
    )
}
