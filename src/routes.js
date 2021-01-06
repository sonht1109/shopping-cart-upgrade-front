import Collections from './pages/collections';
import Home from './pages/home/index';
import Login from './pages/login';
import About from './pages/about/index';

const routes = [
    {
        path: "/",
        private: false,
        exact: true,
        main: ()=> <Home/>
    },
    {
        path: "/login",
        private: false,
        exact: true,
        main: ()=> <Login />
    },
    {
        path: "/collections",
        private: false,
        exact: true,
        main: ()=> <Collections />
    },
    {
        path: "/about",
        private: false,
        exact: true,
        main: ()=> <About />
    }
]

export default routes