import React, { Component } from 'react';
// import { css } from 'emotion';
import Header from '../components/header/header';
import Result from '../components/product/result'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  getProductData, 
  addNewProduct, 
  updateProduct, 
  deleteProducts,
  getFilteredData
} from '../actions/productActionCreator'
class ProdContainer extends Component {
  componentDidMount() {
    this.props.getProductData();
  }
  render() {
    let source = [];
    let filteredData = this.props.productsData.filteredData
    console.log(filteredData)
    let products = this.props.productsData.products
    if(products !== undefined){
      products.forEach((obj) => {
        source.push(obj['prod_name'])
      })
    }
    return (
      <div>
          <Header 
          addNewProduct={this.props.addNewProduct}
          source={source}
          getFilteredData={this.props.getFilteredData}
          />
          {this.props.productsData.products && 
          <Result 
          products={filteredData !== undefined ? filteredData : products}
          updateProduct={this.props.updateProduct}
          deleteProducts={this.props.deleteProducts}
          />}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  productsData: state.products,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getProductData,
      addNewProduct,
      updateProduct,
      deleteProducts,
      getFilteredData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProdContainer);