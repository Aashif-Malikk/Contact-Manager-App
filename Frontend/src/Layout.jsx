import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Component/other/Navbar/Nav";
import './Layout.css';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <div className={isLoggedIn ? 'app-layout' : ''}>

      {isLoggedIn && (
        <>
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn d-md-none"
            style={{ position: 'fixed', top: 12, left: 12, zIndex: 200, background: '#fff', border: '1px solid #ddd', borderRadius: 8 }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* Overlay */}
          <div
            className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
            onClick={() => setSidebarOpen(false)}
          />
        </>
      )}

      {/* Sidebar */}
      <div className={isLoggedIn ? `sidebar ${sidebarOpen ? 'open' : ''}` : ''}>
        <Nav onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className={isLoggedIn ? 'main-content' : ''}>
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;