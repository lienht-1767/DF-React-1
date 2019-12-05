import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from './../constants/ActionTypes';
import callApi from './call_api';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* newProductSaga() {
  yield takeLatest(types.NEW_PRODUCT, workerNewProductSaga);
  yield takeLatest(types.CREATE_PRODUCT, workerSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  const { data } = action;
  try {
    const response = yield call(createProduct, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.CREATE_PRODUCT_SUCCESS, data: result });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.CREATE_PRODUCT_FAILURE, error });
  }
}

// worker saga: makes the api call when watcher saga sees the action
function* workerNewProductSaga(action) {
  const { data } = action;
  try {
    const response = yield call(newProduct, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.NEW_PRODUCT_SUCCESS, data: result });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.NEW_PRODUCT_FAILURE, error });
  }
}

// function that makes the api request and returns a Promise for response
function createProduct(data) {
  const { formData } = data;
  return callApi('POST', 'products/', formData);
}

function newProduct() {
  return callApi('GET', 'products/new');
}
