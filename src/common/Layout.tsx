import React, { useState } from 'react'
import Menu from '../components/menu'
import Footer from '../components/footer/index';
import Sidebar from 'react-sidebar';
import SidebarContent from '../components/sidebarContent/index';

export default function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleOpenSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const sidebar = <SidebarContent />

    return (
        <div>

            <Sidebar
                sidebar={sidebar}
                open={sidebarOpen}
                onSetOpen={() => setSidebarOpen(false)}
                styles={{ sidebar: { background: "white", padding: "10px", paddingTop: "30px" }}}
            >
                <Menu onOpenSidebar={handleOpenSidebar} />
                <div style={{marginTop: 120}}></div>
                <Footer />
            </Sidebar>
        </div>
    )
}
