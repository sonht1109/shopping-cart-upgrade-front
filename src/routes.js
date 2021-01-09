import Collections from './pages/collections';
import Login from './pages/login';
import About from './pages/about/index';
import ManageProducts from './adminPages/manageProducts';
import UserInfo from './pages/login/UserInfo';
import ManageUsers from './adminPages/manageUsers/index';

const routes = [
    {
        path: "/login",
        private: false,
        exact: true,
        main: ()=> <Login />
    },
    {
        path: "/products",
        private: false,
        exact: true,
        main: ()=> <Collections />
    },
    {
        path: "/products/:category",
        private: false,
        exact: true,
        main: ()=> <Collections />
    },
    {
        path: "/about",
        private: false,
        exact: true,
        main: ()=> <About />
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
        private: false,
        exact: true,
        main: ()=> <ManageProducts />
    }
]

export default routes