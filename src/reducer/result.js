import { API_ROOT } from '../components/constants/api'
export const PRODUCT_DATA_REQESTED = 'PRODUCT_DATA_REQESTED';
export const PRODUCT_DATA_RECIEVED = 'PRODUCT_DATA_RECIEVED';
export const ADD_NEW_PRODUCT_REQUESTED = 'ADD_NEW_PRODUCT_REQUESTED';
export const NEW_PRODUCT_RECIEVED = 'NEW_PRODUCT_RECIEVED';
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