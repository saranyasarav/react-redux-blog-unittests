import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-white py-3 mb-4" data-testid="header">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h2"> Redux Blog</h1>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link text-white"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="post"
                  className="nav-link text-white"
                  style={{ textDecoration: "none" }}
                >
                  Post
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
