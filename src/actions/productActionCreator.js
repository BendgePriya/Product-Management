import { API_ROOT } from '../components/constants/api'
import { 
    PRODUCT_DATA_REQESTED,
    PRODUCT_DATA_RECIEVED,
    ADD_NEW_PRODUCT_REQUESTED,
    NEW_PRODUCT_RECIEVED,
    EDIT_PRODUCT_REQUESTED,
    PRODUCT_UPDATED,
    DELETE_PRODUCT_REQUESTED,
    PRODUCT_DELETED,
    ERROR_MSG,
    FILTERED_DATA_REQUESTED,
    FILTERED_DATA_RECIEVED
   } from '../components/constants/productconst';

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
                type: ERROR_MSG
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
      if(product !== undefined){
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
  export function deleteProducts(selected){
    return dispatch => {
      dispatch({
        type: DELETE_PRODUCT_REQUESTED
      })
      if(selected !== undefined){
        dispatch({
          type: PRODUCT_DELETED,
          payload: {
            selected
          }
        })
      }
    }
  }
  export function getFilteredData(filterValues) {
    return dispatch => {
      dispatch({
        type: FILTERED_DATA_REQUESTED
      })
      if(filterValues){
        dispatch({
          type: FILTERED_DATA_RECIEVED,
          payload: {
            filterkeys: filterValues
          }
        })
      }
    }
  }