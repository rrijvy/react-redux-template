import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;
    },
    productsReceived: (products, action) => {
      products.list = action.payload;
      products.loading = false;
      products.lastFetch = Date.now();
    },
    productsRequestFailed: (products, action) => {
      products.loadProducts = false;
    },
    productsAdded: (products, action) => {
      products.list.push(action.payload);
    },
  },
});

const {
  productsRequested,
  productsReceived,
  productsRequestFailed,
  productsAdded,
} = slice.actions;

export default slice.reducer;

// Action creators
// export const loadProducts = () =>
//   apiCallBegan({
//     url: url,
//     method: "get",
//     onStart: productsRequested.type,
//     onSuccess: productsReceived.type,
//     onError: productsRequestFailed.type,
//   });

// Use thunk - dispatch a function
export const loadProducts = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.products;

  const diffInMunites = moment().diff(moment(lastFetch), "minutes");

  if (diffInMunites < 10) return;

  dispatch(
    apiCallBegan({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "get",
      onStart: productsRequested.type,
      onSuccess: productsReceived.type,
      onError: productsRequestFailed.type,
    })
  );
};

export const addProduct = (product) =>
  apiCallBegan({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "post",
    data: product,
    onSuccess: productsAdded.type,
  });
