import * as types from './../constants/ActionTypes';

const initialState = {fetching: false, error: null, product: {}, categories: []};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_PRODUCT:
      return {...state, fetching: true, error: null}
    case types.NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        categories: action.data.categories
      }
    case types.NEW_PRODUCT_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.CREATE_PRODUCT:
        return { ...state, fetching: true, error: null };
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        product: action.data.product,
        status: 'ok'
      };
    case types.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        fetching: false,
        error: null,
        product: action.data.product,
        status: 'ok'
      };
    default: return state
  }
}

 export default reducer;
