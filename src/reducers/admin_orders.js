import * as types from './../constants/ActionTypes';

 const initialState = {fetching: false, error: null, orders: [], currentPage: 1, total_pages: 1};

 const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS:
      return {...state, fetching: true, error: null}
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        orders: action.data.orders,
        total_pages: action.data.total_pages
      }
    case types.FETCH_ORDERS_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case types.DELETE_ORDER:
        return {...state, fetching: true, error: null};
    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        orders: action.data.orders,
        total_pages: action.data.total_pages
      }
    case types.DELETE_ORDER_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case types.UPDATE_ORDER:
      return { ...state, fetching: true, error: null };
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        orders: action.data.orders,
        status: 'ok'
      };
    case types.UPDATE_ORDER_FAILURE:
      return { ...state, fetching: false, error: action.errors };
    default: return state
  }
}

 export default reducer;
