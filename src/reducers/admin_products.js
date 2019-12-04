import * as types from './../constants/ActionTypes';

 const initialState = {fetching: false, error: null, products: [], currentPage: 1};

 const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FECTH_PRODUCTS:
      return {...state, fetching: true, error: null}
    case types.FECTH_PRODUCTS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        products: action.data.products,
        total_pages: action.data.total_pages
      }
    case types.FECTH_PRODUCTS_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    default: return state
  }
}

 export default reducer;
