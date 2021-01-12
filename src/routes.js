import Collections from './pages/collections';
import Login from './pages/login';
import About from './pages/about/index';
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
        path: "/manage-products",
        private: false,
        exact: true,
        main: ()=> <ManageProducts />
    },
    {
        path: "/admin/users",
        private: false,
        exact: true,
        main: ()=> <ManageUsers />
    },
    {
        path: "/me",
        private: false,
        exact: true,
        main: ()=> <UserInfo />
    },
    {
        path: "/admin/products",
        private: true,
        exact: true,
        main: ()=> <ManageProducts />
    },
    {
        path: "/products/product/:id",
        private: true,
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