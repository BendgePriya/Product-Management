import React, { Component } from 'react';
import { css } from 'emotion';
import Button from '../button/button'
import AddEditProduct from '../modal/add-edit-product';
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
const delay = 500;

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state ={
            status: 'LOGOUT',
            showModal: false,
            data: [],
            value: '',
            loading: false
        }
    }
  logout() {
      if(this.state.status === 'LOGOUT'){
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
         <AddEditProduct
         toggleModal={this.toggleNewProductModal}
         addNewProduct={this.props.addNewProduct}
         />
      </div>
      )
    }
  }
  onChange = ( source, event) => {
    const value = event.target.value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
        this.setState({
            data: this.filterData(source,value),
            loading: false
        });
        this.props.getFilteredData(this.state.data)
    }, delay);

    this.setState({
        value: value,
        loading: true
    });
}

filterData(source,value) {
  const data = source;
  const filter = {
      value: value,
      operator: 'startswith',
      ignoreCase: true
  };
  return filterBy(data, filter);
}

  render() {
    let source = this.props.source
    return (
      <div>
        {this.showAddNewProductModal()}
        <div className={appHeaderClass}>
          <div className={navBar}>
              <div>Product Management UI</div>
            <div className={rightAligned} >
                <AutoComplete
                placeholder="Search product Name"
                // data={this.state.data} //enble it if we want to display suggestions
                value={this.state.value}
                onChange={this.onChange.bind(this, source)}
                loading={this.state.loading}
                />
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
