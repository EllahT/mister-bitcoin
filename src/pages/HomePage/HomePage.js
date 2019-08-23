import React, { Component } from "react";

import { connect } from "react-redux";

import "./HomePage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser } from "../../store/actions/UserActions";
import BitcoinService from "../../services/BitcoinService";

class HomePage extends Component {
  state = { currency: null };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUser());

    this.setState({ currency: await BitcoinService.getCurrency() });
  }
  render() {
    const { user } = this.props;

    return (
      <section>
        <h1>Hello {user.name}</h1>
        <h4>
          <FontAwesomeIcon icon={["fab", "bitcoin"]} /> Coins: {user.coins}
        </h4>
        {this.state.currency !== null && (
          <h4>
            <FontAwesomeIcon icon={["fab", "btc"]} /> BTC: {this.state.currency}
          </h4>
        )}
      </section>
    );
  }
}

const mapStateToProps = ({ UserReducer }) => {
  const { user } = UserReducer;

  return {
    user
  };
};

export default connect(mapStateToProps)(HomePage);
