import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
const reducers = combineReducers({
  allcart: cartReducer
});
export default reducers;