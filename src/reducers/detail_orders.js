import * as types from './../constants/ActionTypes';

 const initialState = {fetching: false, error: null, detailOrders: []};

 const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DETAIL_ORDERS:
      return {...state, fetching: true, error: null}
    case types.FETCH_DETAIL_ORDERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: null,
        detailOrders: action.data.detail_orders,
      }
    case types.FETCH_DETAIL_ORDERS_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default: return state
  }
}

 export default reducer;
