import React from "react";
import { Outlet } from "react-router-dom";
import Preloader from "./Preloader";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
//import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Preloader />
      <div id="main">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-md-9">
              <div className="col-md-12 page-body">
                <Outlet />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
