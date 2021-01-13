import React, { useState } from 'react'
import Menu from '../components/menu'
import Footer from '../components/footer/index';
import Sidebar from 'react-sidebar';
import SidebarContent from '../components/sidebarContent/index';
import routes from '../routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userState = useSelector((state: any)=> state.userReducer)

    const handleOpenSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const mapRoutes = routes.map((route, index) => {
        if(route.private){
            return(
                <Route key={index} exact={route.exact} path={route.path}>
                    { userState.role === "admin"
                    ? route.main
                    : <Redirect to="/login" />}
                </Route>
            )
        }
        else{
            return (
                <Route key={index} exact={route.exact} path={route.path}>
                    {route.main}
                </Route>
            )
        }
    })

    const onCloseSidebar = ()=> {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <Sidebar
            sidebar={<SidebarContent onCloseSidebar={onCloseSidebar} />}
            open={sidebarOpen}
            onSetOpen={() => setSidebarOpen(false)}
            styles={{ sidebar: { background: "white", padding: "10px", paddingTop: "30px" } }}
        >
            <Menu onOpenSidebar={handleOpenSidebar} />
            <Switch>
                {mapRoutes}
            </Switch>
            <Footer />
        </Sidebar>
    )
}
