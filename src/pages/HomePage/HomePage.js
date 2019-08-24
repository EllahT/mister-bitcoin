import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as userActions from "../../store/actions/userActions/UserActions";
import BitcoinService from "../../services/BitcoinService";

import "./HomePage.scss";

class HomePage extends Component {
  state = { currency: null };

  async componentDidMount() {
    this.props.actions.loadUser();
    // this.props.actions.getCurrency(); // TODO
    this.setState({ currency: await BitcoinService.getCurrency() });
  }
  render() {
    const { user } = this.props;

    if (!user) return <section>Loading user details...</section>;

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

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      loadUser: userActions.loadUser
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
