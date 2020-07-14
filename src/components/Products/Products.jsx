import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProducts } from "./../../store/products";

class Products extends Component {
  componentDidMount() {
    this.props.loadProducts();
  }
  render() {
    return (
      <div>
        {this.props.products.map((product) => {
          return (
            <div key={product.id}>
              {product.id} | {product.title}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.entities.products.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(loadProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
