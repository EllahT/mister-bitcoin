import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import userActions from "../../store/actions/userActions/userActions";
import bitcoinActions from "../../store/actions/bitcoinActions/bitcoinActions";

import "./HomePage.scss";

class HomePage extends Component {
  state = { currency: null };

  async componentDidMount() {
    this.props.actions.loadUser();
    this.props.actions.loadCurrency();
  }
  render() {
    if (!this.props.user) return <section>Loading user details...</section>;

    return (
      <section>
        <h1>Hello {this.props.user.name}</h1>
        <h4>
          <FontAwesomeIcon icon={["fab", "bitcoin"]} /> Coins:{" "}
          {this.props.user.coins}
        </h4>
        {this.props.currency !== null && (
          <h4>
            <FontAwesomeIcon icon={["fab", "btc"]} /> BTC: {this.props.currency}
          </h4>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  currency: state.bitcoin.currency
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      loadUser: userActions.loadUser,
      loadCurrency: bitcoinActions.loadCurrency
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
