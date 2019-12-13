import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as types from './../constants/ActionTypes';
import callApi from './call_api';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* adminDetailOrdersSaga() {
  yield takeLatest(types.FETCH_DETAIL_ORDERS, workerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  const { data } = action;
  try {
    const response = yield call(fetchDetailOrders, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.FETCH_DETAIL_ORDERS_SUCCESS, data: result });
    // const selectCurrentPage = state => state.adminOrders.currentPage;
    // const currentPage = yield select(selectCurrentPage);
    // if (currentPage > result.total_pages)
    //   yield put({
    //     type: types.SET_CURRENT_PAGE,
    //     currentPage: result.total_pages
    //   });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.FETCH_DETAIL_ORDERS_FAILURE, error });
  }
}

// function that makes the api request and returns a Promise for response
function fetchDetailOrders(id) {
  return callApi('GET', `admin/orders/${id}`);
}
