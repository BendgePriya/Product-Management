import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Result from '../components/product/result'
import { getProductData } from '../reducer/result'
class ResultContainer extends Component{
  componentDidMount() {
    this.props.getProductData();
  }
  render(){
    return(
      <div>
        <Result/>
      </div>
    )
  }
}
  const mapStateToProps = state => ({
    products: state.products
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        getProductData 
      },
      dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);