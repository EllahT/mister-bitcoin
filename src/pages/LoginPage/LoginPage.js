import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import swal from "sweetalert";

import { URLS } from "../../utils/consts";
import userActions from "../../store/actions/userActions/userActions";

import "./LoginPage.scss";

class Login extends Component {
  state = { username: "" };
  onChangeInput = e => {
    this.setState({ username: e.target.value });
  };

  onLogin = async () => {
    try {
      await this.props.actions.login(this.state.username);
      swal("Welcome!", "Successfully logged in!", "success");
      this.setState({ username: "" });
      this.props.history.push(URLS.HOME);
    } catch (err) {
      swal("Had problems", err, "error");
    }
  };
  render() {
    return (
      <section className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Please enter your name..."
          value={this.state.username}
          onChange={this.onChangeInput}
          onKeyDown={e => {
            if (e.keyCode === 13) this.onLogin();
          }}
        />
        <button onClick={this.onLogin}>Log in</button>
        <Link to={URLS.SIGNUP}>Is it your first entry?</Link>
      </section>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      login: userActions.login
    },
    dispatch
  )
});

export default connect(
  undefined,
  mapDispatchToProps
)(Login);
