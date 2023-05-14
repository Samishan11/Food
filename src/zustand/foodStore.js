import create from "zustand";
import axios from "axios";
const useFoodstore = create((set) => ({
  food: [],
  orders: [],
  detail: [],
  myrating: [],
  getfood: async () => {
    const response = await axios.get("/getallfood");
    set({ food: response.data });
  },
  getsingleFood: async (food, user) => {
    const response = await axios.get(`/fooddetail/${food}`);
    for (let i in response.data.rating) {
      if (response.data.rating[i].user === user && response.data._id === food) {
        // console.log(response.data.rating[i].rating);
        set({ myrating: response.data.rating[i].rating });
      } else {
        set({ myrating: 0 });
      }
    }
    set({ detail: response.data });
  },
  // to add cart
  addFood: (data) =>
    set((state) => ({
      food: [
        {
          name: data.name,
          quantity: 1,
          price: data.price,
          id: Math.random(),
          image: data.image,
          description: data.description,
        },
        ...state.food,
      ],
    })),
  // update cart quantity
  updateFood: (food, quantity) =>
    set((state) => ({
      food: state.food.map((item) => {
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
  removeFood: (food) =>
    set((state) => ({
      food: state.food.filter((data) => data._id !== food),
    })),
}));

export default useFoodstore;
