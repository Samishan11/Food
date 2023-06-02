import create from "zustand";
import axios from "axios";
const useOrderstore = create((set) => ({
  order: [],
  getorder: async () => {
    const response = await axios.get(
      "https://food-backend-50oj.onrender.com/api/showallorder"
    );
    set({ order: response.data });
  },
  // update order
  updateorder: (order, status, payment) =>
    set((state) => ({
      order: state.order.map((item) => {
        if (item._id === order._id) {
          return {
            ...item,
            status: status,
            payment: payment,
          };
        } else {
          return item;
        }
      }),
    })),

  // remove order
  removeorder: (order) =>
    set((state) => ({
      order: state.order.filter((data) => data._id !== order),
    })),
}));

export default useOrderstore;
