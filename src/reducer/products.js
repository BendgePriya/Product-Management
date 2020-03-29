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
 } from '../components/constants/productconst'

const initialState = {
  products: [],
  // filteredData: []
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
    case ERROR_MSG:
      return {
        ...state,
        errMsg: ERROR_MSG
      }
    case EDIT_PRODUCT_REQUESTED:
      return {
        ...state,
        status: EDIT_PRODUCT_REQUESTED
      }
    case PRODUCT_UPDATED:
      let tcin = action.payload.tcin;
      let tempdata = state.products.slice(0);
      tempdata.forEach((obj , i) =>{
        if(obj['tcin'] === tcin ){
          if (action.payload.product.prod_name) {
            obj.prod_name = action.payload.product.prod_name;
          }
          if (action.payload.product.prod_desc) {
            obj.prod_desc = action.payload.product.prod_desc;
          }
          if (action.payload.product.is_active) {
            obj.is_active = action.payload.product.is_active;
          }
          if (action.payload.product.price) {
            obj.price = action.payload.product.price;
          }
          if (action.payload.product.offer_price) {
            obj.offer_price = action.payload.product.offer_price;
          }
          if (action.payload.product.offer_starts_at) {
            obj.offer_starts_at = action.payload.product.offer_starts_at;
          }
          if (action.payload.product.offer_ends_at) {
            obj.offer_ends_at = action.payload.product.offer_ends_at;
          }
          if (action.payload.product.created_at) {
            obj.created_at = action.payload.product.created_at;
          }
          if (action.payload.product.updated_at) {
            obj.updated_at = action.payload.product.updated_at;
          }
        }
      })
      return {
        ...state,
        status: PRODUCT_UPDATED,
        products: tempdata
      }
    case DELETE_PRODUCT_REQUESTED:
      return {
        ...state,
        status: DELETE_PRODUCT_REQUESTED
      }
    case PRODUCT_DELETED:
      let selectedIds = action.payload.selected
      let tempArray = state.products.slice(0);
      selectedIds.forEach((prod) => {
        tempArray.forEach((obj,i) =>{
          if(obj.prod_name === prod){
            tempArray.splice(i, 1);
          }
        })
      })
      return{
        ...state,
        status: PRODUCT_DELETED,
        products: tempArray
      }
    case FILTERED_DATA_REQUESTED:
      return {
        ...state,
        status: FILTERED_DATA_REQUESTED
      }
    case FILTERED_DATA_RECIEVED:
      let filterkeys = action.payload.filterkeys
      let tempProds = state.products.slice(0)
      let tempFilteredData = []
      filterkeys.forEach((prodname) => {
        tempProds.forEach((obj, i) =>{
          if(obj.prod_name === prodname){
            tempFilteredData.push(obj)
          }
        })
      })
      return {
        ...state,
        status: FILTERED_DATA_RECIEVED,
        filteredData: tempFilteredData
      }
    default:
      return state;
  }
};