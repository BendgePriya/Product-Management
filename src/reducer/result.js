import { API_ROOT } from '../components/constants/api'
export const PRODUCT_DATA_REQESTED = 'PRODUCT_DATA_REQESTED';
export const PRODUCT_DATA_RECIEVED = 'PRODUCT_DATA_RECIEVED';

// const Error_MSG ='Sorry! we cant find product data at this moment';
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
      // console.log(action.payload)
      return {
        ...state,
        status: PRODUCT_DATA_RECIEVED,
        data: action.payload.products
      };
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