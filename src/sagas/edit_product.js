import { takeLatest, call, put } from 'redux-saga/effects';
import * as types from './../constants/ActionTypes';
import callApi from './call_api';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* editProductSaga() {
  yield takeLatest(types.UPDATE_PRODUCT, workerSaga);
  yield takeLatest(types.EDIT_PRODUCT, workerEditProductSaga);
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  const { data } = action;
  try {
    const response = yield call(updateProduct, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.UPDATE_PRODUCT_SUCCESS, data: result });
    const errors = result.errors
    if (errors)
      yield put({
        type: types.UPDATE_PRODUCT_FAILURE,
        errors: result.errors
      });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.UPDATE_PRODUCT_FAILURE, error });
  }
}

function* workerEditProductSaga(action) {
  const { data } = action;
  try {
    const response = yield call(fetchProduct, data);
    const result = response.data;

    // dispatch a success action to the store with the new dog
    yield put({ type: types.EDIT_PRODUCT_SUCCESS, data: result });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: types.EDIT_PRODUCT_FAILURE, error });
  }
}

// function that makes the api request and returns a Promise for response
function updateProduct(data) {
  const { formData, id } = data;
  return callApi('PUT', `products/${id}`, formData);
}

function fetchProduct(id) {
  return callApi('GET', `products/${id}`);
}
