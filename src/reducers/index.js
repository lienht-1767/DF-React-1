import { combineReducers } from 'redux';
import adminCategories from './admin_categories';
import user from './user';
import adminInfo from './admin_info';
import adminProducts from './admin_products';
import editProduct from './edit_product';
import newProduct from './new_product';
import adminOrders from './admin_orders';
import detailOrders from './detail_orders';

const reducer = combineReducers({
  adminCategories,
  user,
  adminInfo,
  adminProducts,
  editProduct,
  newProduct,
  adminOrders,
  detailOrders
});

export default reducer;
