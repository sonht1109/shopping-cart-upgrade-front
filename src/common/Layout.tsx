import React, { useState } from 'react'
import Menu from '../components/menu'
import Footer from '../components/footer/index';
import Sidebar from 'react-sidebar';
import SidebarContent from '../components/sidebarContent/index';
import routes from '../routes';
import { Route, Switch } from 'react-router-dom';

export default function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleOpenSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const mapRoutes = routes.map((item, index) => {
        return (
            <Route key={index} exact={item.exact} path={item.path}>
                {item.main}
            </Route>
        )
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
