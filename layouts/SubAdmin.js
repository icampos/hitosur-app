import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import HeaderStats from "components/Headers/HeaderStats.js";

export default function SubAdmin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        {/* Header */}
        <div className="px-4 md:px-10 mx-auto w-full -m-24 bg-blueGray-800" style={{'height': '100vh'}}>
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
