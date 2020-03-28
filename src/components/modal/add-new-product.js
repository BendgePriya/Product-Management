import React, { Component } from 'react';
import { css } from 'emotion';
import {PROD_HEADING} from '../constants/productconst'
import './styles.css';

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempDistrictsIds: [], // this variable is going to hold temporary data so
      //that upon clicking on cancel button we will not have any impact on old data
      tempApps: [],
      showDist: false,
      showApps: false,
      showMsg: false,
      display: false,
      displayApps: false,
      groupName: '',
      requiredStyle: false
    };
    this.node = null;
  }
  distIds = []; //this variable will hold group ids of groups.

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

  handleGroupNameChange = event => {
    this.setState({
      groupName: event.target.value
    });
  };

  componentDidMount() {
    if (this.distIds !== undefined) {
      this.setState({ tempDistrictsIds: this.distIds.slice(0) });
    }
  }
  handleCancleBtn = () => {
    this.props.toggleNewProductModal();
  };
  handleCreateGroup = () => {
    if (this.props.districtsData.selectedIds.length === 0) {
      this.setState({ requiredStyle: true, showMsg: true });
    } else {
      this.props.toggleNewProductModal();
      var obj = {};
      obj['group_name'] = this.state.groupName;
      obj['district_ids'] = this.props.districtsData.selectedIds;
      obj['apps'] = this.props.appsData.selectedApps;
      obj['apis'] = this.props.apisData.selectedApis;
      this.props.createGroup(obj);
    }
  };
  displayInputFields = (fieldLable) =>{
     return Object.keys(fieldLable).map((lable,i) => {
          console.log(fieldLable[lable])
          return (
            <div className={inputContainer} key={i}>
                <input
                className={inputStyle}
                placeholder={fieldLable[lable]}
                //   onChange={this.handleGroupNameChange.bind(this)}
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
          {/* <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Product Name*"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div>
          <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Product Description"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div>
          <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Is Active"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div>
          <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Price($"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div>
          <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Offer Price($)"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div>
          <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Offer Starts At"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div>
          <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Offer Ends At"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div>
          <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Created At"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div>
          <div className={inputContainer}>
            <input
              className={inputStyle}
              placeholder="Updated At"
            //   onChange={this.handleGroupNameChange.bind(this)}
            />
          </div> */}
          </div>
          
          <div className={bottomBarStyle}>
            <div className={cancleBtn} onClick={() => this.handleCancleBtn()}>
              CANCEL
            </div>
            <div
              className={createGroupBtn}
              onClick={() => this.handleCreateGroup()}>
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
  color: '#c1c7d0',
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