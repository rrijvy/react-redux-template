import React from "react";
import logo from "./logo.svg";
import "./App.css";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import Products from "./components/Products/Products";
import ProductsList from "./components/ProductsList/ProductsList";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Products />
        <ProductsList />
      </div>
    </Provider>
  );
}

export default App;
