import { loginSaga } from './login';
import { adminCategoriesSaga } from './admin_categories';
import { adminProductsSaga } from './admin_products';
import { editProductSaga } from './edit_product';
import { newProductSaga } from './new_product';
import { all } from 'redux-saga/effects';
import { updateProfileSaga } from './update_profile';
import { adminInfoSaga } from './admin_info';
import { adminOrdersSaga } from './admin_orders';
import { adminDetailOrdersSaga } from './detail_orders';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    adminCategoriesSaga(),
    updateProfileSaga(),
    adminInfoSaga(),
    adminProductsSaga(),
    editProductSaga(),
    newProductSaga(),
    adminOrdersSaga(),
    adminDetailOrdersSaga(),
  ]);
}
