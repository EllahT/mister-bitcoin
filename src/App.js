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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HomePage from "./pages/HomePage/HomePage";
import ContactApp from "./pages/ContactAppPage/ContactApp";
import ContactDetails from "./pages/ContactDetailsPage/ContactDetails";
import ContactEdit from "./pages/ContactEditPage/ContactEdit";
import Charts from "./pages/ChartsPage/ChartsPage";
import { URLS } from "./utils/consts";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul className="main-nav">
              <li>
                <NavLink exact to={URLS.HOME}>
                  <FontAwesomeIcon icon="home" />
                </NavLink>
              </li>
              <li>
                <NavLink exact to={URLS.CONTACTS.LIST}>
                  <FontAwesomeIcon icon="address-book" />
                </NavLink>
              </li>
              <li>
                <NavLink exact to={URLS.CHARTS}>
                  <FontAwesomeIcon icon="chart-line" />
                </NavLink>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path={URLS.HOME} exact component={HomePage} />
            <Route path={URLS.CONTACTS.LIST} exact component={ContactApp} />
            <Route path={URLS.CONTACTS.ADD} key="add" component={ContactEdit} />
            <Route
              path={URLS.CONTACTS.DETAILS}
              exact
              component={ContactDetails}
            />
            <Route
              path={URLS.CONTACTS.EDIT}
              key="edit"
              component={ContactEdit}
            />
            <Route path={URLS.CHARTS} component={Charts} />
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
