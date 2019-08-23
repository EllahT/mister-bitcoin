import React, { Component } from "react";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
  // Redirect
} from "react-router-dom";

import "./assets/scss/app.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HomePage from "./pages/HomePage/HomePage";
import ContactApp from "./pages/ContactAppPage/ContactApp";
import ContactDetails from "./pages/ContactDetailsPage/ContactDetails";
import ContactEdit from "./pages/ContactEditPage/ContactEdit";
import Charts from "./pages/ChartsPage/ChartsPage";

library.add(fas, fab);

class App extends Component {
  goBack = () => {};

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul className="main-nav">
              <li>
                <NavLink exact to="/">
                  <FontAwesomeIcon icon="home" />
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/contact">
                  <FontAwesomeIcon icon="address-book" />
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/charts">
                  <FontAwesomeIcon icon="chart-line" />
                </NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route exact path="/contact" component={ContactApp} />
            <Route path="/contact/edit/:id?" component={ContactEdit} />
            <Route path="/contact/:id" component={ContactDetails} />
            <Route path="/charts" component={Charts} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(App);
