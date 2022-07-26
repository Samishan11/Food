import { ActionTypes } from "../constant/actionTypes";

export const setcart = (cart) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: cart,
  };
};

export const getcarts = (cart)=>{
  return{
    type: ActionTypes.GET_CART,
    payload: cart
  }
}