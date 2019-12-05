import * as types from './../constants/ActionTypes';

const initialState = {fetching: false, error: null, product: {}, categories: []};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.EDIT_PRODUCT:
      return {...state, fetching: true, error: null}
    case types.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        product: action.data.product,
        categories: action.data.categories
      }
    case types.EDIT_PRODUCT_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.UPDATE_PRODUCT:
        return { ...state, fetching: true, error: null };
    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        product: action.data.product,
        status: 'ok'
      };
    case types.UPDATE_PRODUCT_FAILURE:
      return { ...state, fetching: false, error: action.errors };
    default: return state
  }
}

 export default reducer;
