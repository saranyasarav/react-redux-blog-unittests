import React, { useState, useEffect } from "react";
import "../assets/css/plugin.css";
import "../assets/css/style.css";
import { Collapse } from "bootstrap";
import reactJSLogo from "../assets/images/logo/reactjs-logo.png";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const myCollapse = document.getElementById("menu");
    const bsCollapse = new Collapse(myCollapse, { toggle: false });
    toggle ? bsCollapse.show() : bsCollapse.hide();
  });

  return (
    <div className="col-md-3">
      <div className="about-fixed">
        <div className="my-pic">
          <img src={reactJSLogo} alt="React JS Blog" />
          <button
            onClick={() => setToggle((toggle) => !toggle)}
            className={`${toggle ? "collapsed" : ""}`}
          >
            <i className="icon-menu menu"></i>
          </button>
          <div id="menu" className="collapse" aria-expanded={!toggle}>
            <ul className="menu-link">
              <li>
                <a href="about.html">About</a>
              </li>
              <li>
                <a href="work.html">Work</a>
              </li>
              <li>
                <a href="contact.html">Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="my-detail">
          <div className="white-spacing">
            <h1>React JS Blog</h1>
            <span>Tutorials</span>
          </div>
          <ul className="social-icon">
            <li>
              <a href="facebook.com" target="_blank" className="facebook">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="twitter.com" target="_blank" className="twitter">
                <i className="fa fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="linkedin.com" target="_blank" className="linkedin">
                <i className="fa fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="github.com" target="_blank" className="github">
                <i className="fa fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
