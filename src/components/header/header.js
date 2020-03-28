import React, { Component } from 'react';
import { css } from 'emotion';
import Button from '../button/button'
import AddNewProduct from '../modal/add-new-product';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            status: 'LOGOUT',
            showModal: false
        }
    }
  logout() {
      if(this.state.status === 'LOGOUT'){
        console.log('click')
        this.setState({
            status:'LOGIN'
        });
      }
      else{
        this.setState({
            status:'LOGOUT'
        });
      }
  }

  toggleNewProductModal = () => {
    this.setState({
      showModal : !this.state.showModal
    })
  }

  showAddNewProductModal = ()=> {
    if(this.state.showModal){
      return(
      <div>
         <AddNewProduct
         toggleNewProductModal={this.toggleNewProductModal}
         addNewProduct={this.props.addNewProduct}
         />
      </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.showAddNewProductModal()}
        <div className={appHeaderClass}>
          <div className={navBar}>
              <div>Product Management UI</div>
            <div className={rightAligned} >
                <Button 
                text="Add New Product"
                buttonClickCallback={this.toggleNewProductModal}
                />
                <Button 
                text={this.state.status} 
                buttonClickCallback={this.logout.bind(this)}
                />  
             </div>
          </div>
        </div>
      </div>
    );
  }
}

const appHeaderClass = css({
  background: '#E80018',
  color: '#FFFFFF',
  position: 'fixed',
  paddingLeft: '20px',
  paddingRight: '20px',
  fontSize: '15px',
  fontWeight: '500',
  top: '0',
  height: '60px',
  width: '100%',
  boxSizing: 'border-box',
  zIndex: '10'
});

const navBar = css({
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  width: '100%',
  height:'100%',
  margin: '0px'
});

const rightAligned = css({
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  textTransform: 'uppercase',
  marginLeft: 'auto',
  cursor: 'pointer'
});
