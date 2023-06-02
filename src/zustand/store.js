import create from "zustand";
import axios from "axios";
const useCartStore = create((set) => ({
  carts: [],
  orders: [],
  getCarts: async () => {
    const response = await axios.get(
      "https://food-backend-50oj.onrender.com/api/getcart"
    );
    set({ carts: response.data.data });
  },
  // to add cart
  addtoCart: (data) =>
    set((state) => ({
      carts: [
        {
          name: data.name,
          quantity: data.quantity,
          price: data.price,
          id: data.id,
          user: data.user,
          image: data.image,
        },
        ...state.carts,
      ],
    })),
  // update cart quantity
  updateCart: (food, quantity) =>
    set((state) => ({
      carts: state.carts.map((item) => {
        if (item._id === food._id) {
          return {
            ...item,
            quantity: quantity,
          };
        } else {
          return item;
        }
      }),
    })),

  // remove cart
  removeCart: (food) =>
    set((state) => ({
      carts: state.carts.filter((data) => data._id !== food),
    })),

  // orders
  addOrder: (data) =>
    set((state) => ({
      orders: [...state.orders, data],
      carts: [],
    })),
  // get orders
  getOrders: async () => {
    const response = await axios.get(
      "https://food-backend-50oj.onrender.com/api/showorder"
    );
    set({ orders: response.data });
  },
}));

export default useCartStore;
