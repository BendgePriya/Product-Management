import React, { Component } from 'react';
// import { css } from 'emotion';
import Header from '../components/header/header';
import Result from '../components/product/result'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getProductData, addNewProduct } from '../reducer/result'
class ProdContainer extends Component {
  componentDidMount() {
    this.props.getProductData();
  }
  render() {
    return (
      <div>
          <Header addNewProduct={this.props.addNewProduct}/>
          {this.props.products && <Result products={this.props.products}/>}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductData,
      addNewProduct 
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProdContainer);