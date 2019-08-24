import React, { Component } from "react";

import "./SignupPage.scss";

class Signup extends Component {
  state = { username: "" };
  onChangeInput = e => {
    this.setState({ username: e.target.value });
  };

  onSignup = () => {
    console.log(this.state);
  };
  render() {
    return (
      <section className="signup-form">
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
      </section>
    );
  }
}

export default Signup;
