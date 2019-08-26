import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import userActions from "../../store/actions/userActions/userActions";
import bitcoinActions from "../../store/actions/bitcoinActions/bitcoinActions";

import "./HomePage.scss";
import { URLS } from "../../utils/consts";

import TransactionList from "../../components/TransactionList/TransactionList";

class HomePage extends Component {
  async componentDidMount() {
    try {
      await this.props.actions.loadLoggedUser();
    } catch (err) {
      console.log("had problems", err);
    }
    await this.props.actions.loadCurrency();
  }
  render() {
    return (
      <section>
        <header>
          <h1>Hello {this.props.user ? this.props.user.username : "guest"}</h1>
          {this.props.user && (
            <h4>
              <FontAwesomeIcon icon={["fab", "bitcoin"]} /> Coins:{" "}
              {this.props.user.coins}
            </h4>
          )}
          {this.props.currency !== null && (
            <h4>
              <FontAwesomeIcon icon={["fab", "btc"]} /> BTC:{" "}
              {this.props.currency}
            </h4>
          )}
        </header>

        {this.props.user && (
          <main>
            <TransactionList
              title="Last Transactions"
              transactionList={this.props.user.transactions}
              main={true}
            />
          </main>
        )}
        {!this.props.user && (
          <main>
            <Link to={URLS.SIGNUP}>
              signin for more information <FontAwesomeIcon icon="sign-in-alt" />
            </Link>
          </main>
        )}
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
