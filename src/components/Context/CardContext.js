import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const CartContext = createContext()
export const Cartprovider = (props) => {
    const token = localStorage.getItem('token')
    const [contextCart, setContextCart] = useState([]);

    useEffect(() => {
        const getcart = () => {
            axios.get("/getcart").then(data => {
                setContextCart(data.data)
            }).catch(e => {
                console.log(e)
            })
        }
        if(!token || !contextCart){
            console.log('token not found');
        }else{
            getcart()
        }
    }, [token])

    return (
        <CartContext.Provider value={[contextCart, setContextCart]}>
            {props.children}
        </CartContext.Provider>
    )
}
