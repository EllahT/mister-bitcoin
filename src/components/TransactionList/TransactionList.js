//dumb cmp, gets as props title and transactionList, display it
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TransactionList.scss";

import { URLS } from "../../utils/consts";
import utils from "../../utils/utils";

class TransactionList extends Component {
  state = {
    formatDate: true
  };

  changeDateFormat = () => {
    this.setState({ formatDate: !this.state.formatDate });
  };
  render() {
    if (!this.props.transactionList || !this.props.transactionList.length)
      return <h1>You havn't transfered coins yet</h1>;
    return (
      <div className="transactions-container">
        <h1>{this.props.title}</h1>
        <ul className="transaction-list">
          {this.props.transactionList.map(transaction => {
            return (
              <li key={transaction.at} className="transaction-item">
                {this.props.main && (
                  <h4>
                    <Link
                      to={utils.formatURL(URLS.CONTACTS.DETAILS, {
                        id: transaction.toId
                      })}
                      onClick={e => e.stopPropagation()}
                    >
                      <FontAwesomeIcon icon="user-circle" /> {transaction.to}
                    </Link>
                  </h4>
                )}
                <button className="icon-btn" onClick={this.changeDateFormat}>
                  <FontAwesomeIcon icon="clock" />{" "}
                  {this.state.formatDate
                    ? moment(transaction.at).fromNow()
                    : moment(transaction.at).calendar()}
                </button>
                <h4>
                  <FontAwesomeIcon icon="coins" /> {transaction.amount}
                </h4>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

TransactionList.propTypes = {
  title: PropTypes.string.isRequired,
  main: PropTypes.bool.isRequired,
  transactionList: PropTypes.array.isRequired
};

export default TransactionList;
