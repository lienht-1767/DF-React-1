import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as types from './../constants/ActionTypes';
import callApi from './call_api';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* adminOrdersSaga() {
  yield takeLatest(types.FETCH_ORDERS, workerSaga);
  yield takeLatest(types.DELETE_ORDER, workerDeleteOrderSaga);
  yield takeLatest(types.UPDATE_ORDER, workerUpdateOrderSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  const { data } = action;
  try {
    const response = yield call(fetchOrders, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.FETCH_ORDERS_SUCCESS, data: result });
    const selectCurrentPage = state => state.adminOrders.currentPage;
    const currentPage = yield select(selectCurrentPage);
    if (currentPage > result.total_pages)
      yield put({
        type: types.SET_CURRENT_PAGE,
        currentPage: result.total_pages
      });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.FETCH_ORDERS_FAILURE, error });
  }
}

function* workerDeleteOrderSaga(action) {
  const { data } = action;
  try {
    const response = yield call(deleteOrder, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.DELETE_ORDER_SUCCESS, data: result });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.DELETE_ORDER_FAILURE, error });
  }
}

function* workerUpdateOrderSaga(action) {
  const { data } = action;
  try {
    const response = yield call(updateOrder, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.UPDATE_ORDER_SUCCESS, data: result });
    const errors = result.errors
    if (errors)
      yield put({
        type: types.UPDATE_ORDER_FAILURE,
        errors: result.errors
      });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.UPDATE_ORDER_FAILURE, error });
  }
}

// function that makes the api request and returns a Promise for response
function deleteOrder(data) {
  return callApi('DELETE', 'admin/orders/' + data.orderId, {page: data.page});
}

// function that makes the api request and returns a Promise for response
function fetchOrders(data) {
  return callApi('GET', 'admin/orders', data);
}

function updateOrder(data) {
  return callApi('PUT', 'admin/orders/' + data.orderId, {status: data.status});
}
