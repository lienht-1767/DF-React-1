import * as types from './../constants/ActionTypes';

export const logIn = data => {
  return {
    type: types.LOG_IN,
    data
  };
};

export const fetchCategories = data => {
  return {
    type: types.FECTH_CATEGORIES,
    data
  };
};

export const deleteCategory = data => {
  return {
    type: types.DELETE_CATEGORY,
    data
  };
};

export const setCurrentPage = currentPage => {
  return {
    type: types.SET_CURRENT_PAGE,
    currentPage
  };
};

export const updateProfile = data => {
  return {
    type: types.UPDATE_PROFILE,
    data
  };
}

export const fetchProducts = data => {
  return {
    type: types.FETCH_PRODUCTS,
    data
  };
};

export const logOut = () => {
  return {
    type: types.LOG_OUT
  };
};

export const fetchAdminInfo = () => ({
  type: types.FETCH_ADMIN_INFO
});

export const fetchProduct = data => {
  return {
    type: types.EDIT_PRODUCT,
    data
  };
};

export const updateProduct = data => {
  return {
    type: types.UPDATE_PRODUCT,
    data
  };
};

export const deleteProduct= data => {
  return {
    type: types.DELETE_PRODUCT,
    data
  };
};

export const createProduct= data => {
  return {
    type: types.CREATE_PRODUCT,
    data
  };
};

export const newProduct= data => {
  return {
    type: types.NEW_PRODUCT,
    data
  };
};

export const fetchOrders= data => {
  return {
    type: types.FETCH_ORDERS,
    data
  };
};

export const deleteOrder= data => {
  return {
    type: types.DELETE_ORDER,
    data
  };
};

export const fetchDetailOrders= data => {
  return {
    type: types.FETCH_DETAIL_ORDERS,
    data
  };
};

export const updateOrder= data => {
  return {
    type: types.UPDATE_ORDER,
    data
  };
};
