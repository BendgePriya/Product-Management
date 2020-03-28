import { API_ROOT } from '../components/constants/api'
export const PRODUCT_DATA_REQESTED = 'PRODUCT_DATA_REQESTED';
export const PRODUCT_DATA_RECIEVED = 'PRODUCT_DATA_RECIEVED';
export const ADD_NEW_PRODUCT_REQUESTED = 'ADD_NEW_PRODUCT_REQUESTED';
export const NEW_PRODUCT_RECIEVED = 'NEW_PRODUCT_RECIEVED';
export const EDIT_PRODUCT_REQUESTED = 'EDIT_PRODUCT_REQUESTED';
export const PRODUCT_UPDATED = 'PRODUCT_UPDATED';
const Error_MSG ='Sorry! we can not find products at this moment';

const initialState = {
  products: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DATA_REQESTED:
      return {
        ...state,
        status: PRODUCT_DATA_REQESTED
      };
    case PRODUCT_DATA_RECIEVED:
      return {
        ...state,
        status: PRODUCT_DATA_RECIEVED,
        products: action.payload.products
      };
    case ADD_NEW_PRODUCT_REQUESTED:
      return {
        ...state,
        status: ADD_NEW_PRODUCT_REQUESTED
      }
    case NEW_PRODUCT_RECIEVED:
      let tempProd = state.products.slice(0);
      tempProd.push(action.payload.product)
      return {
        ...state,
        status: NEW_PRODUCT_RECIEVED,
        products: tempProd
      }
    case Error_MSG:
      return {
        ...state,
        errMsg: Error_MSG
      }
    case EDIT_PRODUCT_REQUESTED:
      return {
        ...state,
        status: EDIT_PRODUCT_REQUESTED
      }
    case PRODUCT_UPDATED:
      let index = action.payload.editIndex;
      let tempdata = state.products.slice(0);
      // Object.keys(action.payload.product).map((field, index) => {
      //   if(action.payload.product[field]){
      //     tempdata[index].field = action.payload.product.field;
      //   }
      // })

      if (action.payload.product.prod_name) {
        tempdata[index].prod_name = action.payload.product.prod_name;
      }
      if (action.payload.product.prod_desc) {
        tempdata[index].prod_desc = action.payload.product.prod_desc;
      }
      if (action.payload.product.is_active) {
        tempdata[index].is_active = action.payload.product.is_active;
      }
      if (action.payload.product.price) {
        tempdata[index].price = action.payload.product.price;
      }
      if (action.payload.product.offer_price) {
        tempdata[index].offer_price = action.payload.product.offer_price;
      }
      if (action.payload.product.offer_starts_at) {
        tempdata[index].offer_starts_at = action.payload.product.offer_starts_at;
      }
      if (action.payload.product.offer_ends_at) {
        tempdata[index].offer_ends_at = action.payload.product.offer_ends_at;
      }
      if (action.payload.product.created_at) {
        tempdata[index].created_at = action.payload.product.created_at;
      }
      if (action.payload.product.updated_at) {
        tempdata[index].updated_at = action.payload.product.updated_at;
      }
      return {
        ...state,
        status: PRODUCT_UPDATED,
        products: tempdata
      }
    default:
      return state;
  }
};
export function getProductData(){
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  };
    return dispatch => {
        dispatch({
            type: PRODUCT_DATA_REQESTED
        })
        fetch(API_ROOT,options)
        .then(response =>{
          if(response.status !== 200){
            dispatch({
              type: Error_MSG
            });
            return null
          }
            return response.json();
        })
        .then(json => {
            if(json !== null){
                dispatch({
                    type:PRODUCT_DATA_RECIEVED,
                    payload:{
                        products: json['products']
                    }
                })
            }
        })
    }
}
export function addNewProduct(product){
  return dispatch => {
    dispatch({
      type: ADD_NEW_PRODUCT_REQUESTED
    })
    if(product !== null){
      dispatch({
        type: NEW_PRODUCT_RECIEVED,
        payload:{
          product: product
        }
      })
    }
  }
}
export function updateProduct(product,editIndex){
  return dispatch => {
    dispatch({
      type: EDIT_PRODUCT_REQUESTED
    })
    if(product !== null){
      dispatch({
        type: PRODUCT_UPDATED,
        payload:{
          product: product,
          editIndex:editIndex
        }
      })
    }
  }
}