import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <div className="col-md-12 page-body margin-top-50 footer">
    <footer>
      <ul className="menu-link">
        <li>
          <Link to="index.html">Home</Link>
        </li>
        <li>
          <Link to="about.html">About</Link>
        </li>
        <li>
          <Link to="Work.html">Work</Link>
        </li>
        <li>
          <Link to="contact.html">Contact</Link>
        </li>
      </ul>
      <p>&copy; Copyright 2024. All rights reserved</p>
      <div className="uipasta-credit">
        by <Link to="https://github.com/saranyasarav">Saranya</Link>
      </div>
    </footer>
  </div>
);

export default Footer;
