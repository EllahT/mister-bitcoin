import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import userActions from "../../store/actions/userActions/userActions";
import bitcoinActions from "../../store/actions/bitcoinActions/bitcoinActions";

import "./HomePage.scss";

class HomePage extends Component {
  async componentDidMount() {
    this.props.actions.loadLoggedUser();
    this.props.actions.loadCurrency();
  }
  render() {
    if (!this.props.user) return <section>Loading user details...</section>;

    return (
      <section>
        <header>
          <h1>Hello {this.props.user.username}</h1>
          <h4>
            <FontAwesomeIcon icon={["fab", "bitcoin"]} /> Coins:{" "}
            {this.props.user.coins}
          </h4>
          {this.props.currency !== null && (
            <h4>
              <FontAwesomeIcon icon={["fab", "btc"]} /> BTC:{" "}
              {this.props.currency}
            </h4>
          )}
        </header>

        <main className="last-transcations">
          <h1>Last transactions</h1>
          <ul>
            {this.props.user.transactions.map(transaction => (
              <li>{JSON.stringify(transaction)}</li>
            ))}
          </ul>
        </main>
      </section>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
  currency: PropTypes.number,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user.user,
  currency: state.bitcoin.currency
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      loadLoggedUser: userActions.loadLoggedUser,
      loadCurrency: bitcoinActions.loadCurrency
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
