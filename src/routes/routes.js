import Home from '../components/Home';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import AdminCategories from '../components/Admin/Categories';
import AdminUsers from '../components/Admin/Users';
import Profile from '../components/Profile';
import AdminProducts from '../components/AdminProducts';
import AdminProductEdit from '../components/AdminProductEdit';
import AdminProductNew from '../components/AdminProductNew';
import Orders from '../components/Admin/Orders';
import DetailOrders from '../components/Admin/DetailOrders';

import App from './../App';
import Admin from '../components/Admin/Admin';

const routerAdmin = [
  {
    path: '/admin/categories',
    component: AdminCategories,
    exact: true
  },
  {
    path: '/admin/users',
    component: AdminUsers,
    exact: true
  },
  {
    path: '/admin/products',
    name: 'admin_products',
    exact: true,
    component: AdminProducts
  },
  {
    path: '/admin/products/new',
    name: 'new_product',
    exact: true,
    component: AdminProductNew
  },
  {
    path: '/admin/products/:id',
    name: 'edit_product',
    exact: true,
    component: AdminProductEdit
  },
  {
    path: '/admin/orders',
    name: 'admin_orders',
    exact: true,
    component: Orders
  },
  {
    path: '/admin/orders/:id',
    name: 'detail_orders',
    exact: true,
    component: DetailOrders
  },
];

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/login',
        name: 'login',
        exact: true,
        component: Login
      },
      {
        path: '/admin',
        component: Admin,
        routes: routerAdmin
      },
      {
        path: '/profile',
        name: 'profile',
        exact: true,
        component: Profile
      },
      {
        path: '',
        exact: true,
        component: NotFound
      }
    ]
  }
];

export default routes;
