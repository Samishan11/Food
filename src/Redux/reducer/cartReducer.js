import { ActionTypes } from "../constant/actionTypes";
const intialState = {
  cart: [],
};
export const getcartReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_CART:
      return {...state , cart:[...state , payload] };
    default:
      return state;
  }
};
export const cartReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TO_CART:
      return {cart: [...state.cart,  payload]};
    default:
      return state;
  }
};
