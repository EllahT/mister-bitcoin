import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";

import "./assets/scss/app.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import userActions from "./store/actions/userActions/userActions";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
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
              {this.props.user && (
                <li>
                  <button
                    className="icon-btn"
                    onClick={this.props.actions.logout}
                  >
                    <FontAwesomeIcon icon="sign-out-alt" />
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <Switch>
            <Route path={URLS.HOME} exact component={HomePage} />
            <Route path={URLS.SIGNUP} exact component={SignupPage} />
            <Route path={URLS.LOGIN} exact component={LoginPage} />
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

App.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      logout: userActions.logout
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
