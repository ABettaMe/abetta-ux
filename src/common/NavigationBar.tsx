import React from 'react';
import logo from './logo.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

export function NavigationBar() {
  return (
<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item has-text-weight-bold" href="/">
        abetta me
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a href="/dashboard" className="navbar-item">
        Dashboard
      </a>

      <a href="/dashboard" className="navbar-item">
        Help
      </a>

    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary">
            <strong>Log in</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
  );
}

export default NavigationBar;