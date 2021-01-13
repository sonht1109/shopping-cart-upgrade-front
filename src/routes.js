import Collections from './pages/collections';
import Login from './pages/login';
import ManageProducts from './adminPages/manageProducts';
import UserInfo from './pages/login/UserInfo';
import ManageUsers from './adminPages/manageUsers/index';
import ProductDetail from './pages/productDetail/index';
import Cart from './pages/cart/index';

const routes = [
    {
        path: "/login",
        private: false,
        exact: true,
        main: ()=> <Login />
    },
    {
        path: "/products/:category",
        private: false,
        exact: true,
        main: ()=> <Collections />
    },
    {
        path: "/admin/users",
        private: false,
        exact: true,
        main: ()=> <ManageUsers />
    },
    {
        path: "/admin/products",
        private: false,
        exact: true,
        main: ()=> <ManageProducts />
    },
    {
        path: "/me",
        private: false,
        exact: true,
        main: ()=> <UserInfo />
    },
    {
        path: "/products/product/:id",
        private: false,
        exact: true,
        main: ()=> <ProductDetail />
    },
    {
        path: "/cart",
        private: false,
        exact: true,
        main: ()=> <Cart />
    }
]

export default routes