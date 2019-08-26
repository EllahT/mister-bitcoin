import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import swal from "sweetalert";

import { URLS } from "../../utils/consts";
import userActions from "../../store/actions/userActions/userActions";

import "./SignupPage.scss";

class Signup extends Component {
  state = { username: "" };
  onChangeInput = e => {
    this.setState({ username: e.target.value });
  };

  onSignup = async () => {
    try {
      await this.props.actions.signup(this.state.username);
      swal("Welcome!", "Successfully signed up!", "success");
      this.setState({ username: "" });
      this.props.history.push(URLS.HOME);
    } catch (err) {
      swal("Had problems", err, "error");
    }
  };
  render() {
    return (
      <section className="signup-form">
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Please enter your name..."
          value={this.state.username}
          onChange={this.onChangeInput}
          onKeyDown={e => {
            if (e.keyCode === 13) this.onSignup();
          }}
        />
        <button onClick={this.onSignup}>Sign up</button>

        <Link to={URLS.LOGIN}>Already have a user?</Link>
      </section>
    );
  }
}

Signup.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      signup: userActions.signup
    },
    dispatch
  )
});

export default connect(
  undefined,
  mapDispatchToProps
)(Signup);
