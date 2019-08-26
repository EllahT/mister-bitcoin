import React, { Component } from "react";
import PropTypes from "prop-types";

class TransactionForm extends Component {
  state = {
    amount: 0
  };

  updateAmount = val => {
    this.setState({ amount: val });
  };

  onTransferCoins = e => {
    e.preventDefault();
    this.props.onTransferCoins(this.state.amount);
  };

  render() {
    return (
      <React.Fragment>
        <h5>
          Balance after transfer {this.props.currCoins - this.state.amount}
        </h5>
        <form onSubmit={this.onTransferCoins}>
          <input
            type="number"
            value={this.state.amount}
            onChange={e => this.updateAmount(+e.target.value)}
          />
          <button>Send</button>
        </form>
      </React.Fragment>
    );
  }
}

TransactionForm.propTypes = {
  currCoins: PropTypes.number.isRequired,
  onTransferCoins: PropTypes.func.isRequired
};

export default TransactionForm;
