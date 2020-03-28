import React, { Component } from 'react';
import { css } from 'emotion';
import { PROD_HEADING } from '../constants/productconst'
import './styles.css';

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempProd : {
        prod_name : '',
        prod_desc : '',
        is_active : '',
        price : '',
        offer_price : '',
        offer_starts_at : '',
        offer_ends_at : '',
        created_at : '',
        updated_at : ''
      },
      requiredStyle: false
    };
    this.node = null;
  }

  UNSAFE_componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClickOutside = () => {
    this.props.toggleNewProductModal();
  };

  handleClick = e => {
    if (this.node !== null && this.node.contains(e.target)) {
      return;
    }
    this.handleClickOutside();
  };

  handleCancleBtn = () => {
    this.props.toggleNewProductModal();
  };
  
  handleAddNewProduct = () => {
    let tempProd = this.state.tempProd
    if (tempProd.prod_name.length === 0) {
      this.setState({ requiredStyle: true});
    } else {
      this.props.toggleNewProductModal();
      this.props.addNewProduct(tempProd);
    }
  };

  handleInputChange = (label, event) => {
    let inputName = label;
    let inputValue = event.target.value;
    let prodCopy = Object.assign({}, this.state);
    prodCopy.tempProd[inputName] = inputValue;
    this.setState(prodCopy);
  };

  displayInputFields = (fieldLabel) =>{
     return Object.keys(fieldLabel).map((label,i) => {
       const divStyle = 
       (label === 'prod_name' && this.state.requiredStyle && this.state.tempProd.prod_name.length === 0) 
       ? requiredinputContainer : inputContainer
          return (
            <div className={divStyle} key={i}>
                <input
                className={inputStyle}
                placeholder={fieldLabel[label]}
                onChange={this.handleInputChange.bind(this, label)}
                />
          </div>
          )
      })
  }
  render() {
    let fieldLable = PROD_HEADING
    const bottomBarStyle = `${btn} ${anchorDown}`;
    return (
      <div className={modalClass}>
        <div className={modalMain} ref={node => (this.node = node)}>
          <div className={container}>
            <span className={title}>Add New Product</span>
          </div>
          <div className={inputFields + ' thin-vert-scrollbar'}>
              {this.displayInputFields(fieldLable)}
          </div>       
          <div className={bottomBarStyle}>
            <div className={cancleBtn} onClick={() => this.handleCancleBtn()}>
              CANCEL
            </div>
            <div
              className={createGroupBtn}
              onClick={() => this.handleAddNewProduct()}>
              ADD
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const modalClass = css({
  position: 'absolute',
  zIndex: 1,
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.6)'
});

const modalMain = css({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  background: 'white',
  width: '364px',
  minHeight: '500px',
  maxHeight: '500px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  borderRadius: '4px',
  boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.18)'
});

const inputFields = css({
    width: '100%',
    height: '400px',
    paddingTop:'2px',
    paddingBottom: '2px',
    overflowY: 'scroll'
})
const container = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '56px',
  marginLeft: '16px'
});

const inputContainer = css({
  display: 'flex',
  alignItems: 'center',
  height: '56px',
  margin: '0 16px 16px 16px'
});
const requiredinputContainer = css({
  display: 'flex',
  alignItems: 'center',
  height: '56px',
  margin: '0 16px 16px 16px',
  borderRadius: '2px',
  border: 'solid 1px #ff5630'
});
const title = css({
  paddingLeft: '16px',
  fontFamily: 'Open Sans',
  fontSize: '16px',
  fontWeight: 600,
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.5,
  letterSpacing: 'normal',
  color: '#112138'
});

const inputStyle = css({
  width: '100%',
  height: '100%',
  paddingLeft: '16px',
  fontFamily: 'Open Sans',
  fontSize: '14px',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.5,
  letterSpacing: 'normal',
  outline: 'none',
  border: 'solid 1px #dfe1e5',
  '::-webkit-input-placeholder': {
    color: '#c1c7d0'
  },
  '&:hover': { border: 'solid 1.5px #0151cb' }
});

const btn = css({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '364px',
  height: '56px',
  borderRadius: '2px',
  backgroundColor: '#fafbfc'
});

const cancleBtn = css({
  width: '50%',
  padding: '16px',
  border: 'solid 1px #ebecf0',
  fontFamily: 'Open Sans',
  fontSize: '14px',
  fontWeight: '700',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.5,
  letterSpacing: '1px',
  textAlign: 'center',
  color: '#9499a1',
  cursor: 'pointer'
});

const createGroupBtn = css({
  border: 'solid 1px #ebecf0',
  width: '50%',
  padding: '16px',
  fontFamily: 'Open Sans',
  fontSize: '14px',
  fontWeight: '700',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.5,
  letterSpacing: '1px',
  textAlign: 'center',
  color: '#0151cb',
  cursor: 'pointer'
});
const anchorDown = css({
  position: 'fixed',
  bottom: 0
});
export default AddNewProduct;