import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const FoodContext = createContext()
export const Foodprovider = (props) => {
    const [contextfood, setContextFood] = useState([]);
    useEffect(() => {
        const getfood = () => {
            axios.get("https://mern-food-bakend.herokuapp.com/api/getallfood").then(data => {
                setContextFood(data.data)
            }).catch(e => {
                console.log(e);
            })
        }
        getfood()
    }, [])

    return (
        <FoodContext.Provider value={[contextfood, setContextFood]}>
            {props.children}
        </FoodContext.Provider>
    )
}
