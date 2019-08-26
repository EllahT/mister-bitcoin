import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import contactActions from "../../store/actions/contactsActions/contactsActions";
import userActions from "../../store/actions/userActions/userActions";

import "./ContactDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { URLS } from "../../utils/consts";
import utils from "../../utils/utils";

import TransactionList from "../../components/TransactionList/TransactionList";
import TransactionForm from "../../components/TransactionForm/TransactionForm";

class ContactDetails extends Component {
  state = {
    showForm: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.actions.loadContactById(id);
  }

  onDelete = async () => {
    await this.props.actions.deleteContact(this.props.contact.id);
    this.props.history.push(URLS.CONTACTS.LIST);
  };

  onTransferCoins = amount => {
    this.toggleShowTransferForm();
    this.props.actions.createTransaction(this.props.contact, amount);
  };

  toggleShowTransferForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  filterTransactions = () => {
    const contactTransactions = this.props.user.transactions.filter(
      t => t.toId === this.props.contact._id
    );
    return contactTransactions;
  };

  render() {
    if (!this.props.user) return <Redirect to={URLS.HOME} />;

    return (
      this.props.contact && (
        <section className="contact-details">
          <div className="actions">
            <Link to={URLS.CONTACTS.LIST}>
              <FontAwesomeIcon icon="chevron-left" />
            </Link>
            <Link
              to={utils.formatURL(URLS.CONTACTS.EDIT, {
                id: this.props.contact._id
              })}
            >
              <FontAwesomeIcon icon="edit" />
            </Link>
            <button
              className="icon-btn"
              onClick={() => {
                this.onDelete();
              }}
            >
              <FontAwesomeIcon icon="trash" />
            </button>
          </div>
          <h1> {this.props.contact.name}</h1>
          <img
            src={`https://robohash.org/${this.props.contact._id}?set=set5`}
            alt="contact"
          />
          <h4>
            <FontAwesomeIcon icon="at" /> {this.props.contact.email}
          </h4>
          <h4>
            <FontAwesomeIcon icon="phone" /> {this.props.contact.phone}
          </h4>
          <button onClick={this.toggleShowTransferForm}>Transfer Coins</button>
          {this.state.showForm && (
            <TransactionForm
              onTransferCoins={this.onTransferCoins}
              currCoins={100}
            />
          )}
          <TransactionList
            title={`Last Transactions To ${this.props.contact.name}`}
            transactionList={this.filterTransactions()}
            main={false}
          />
        </section>
      )
    );
  }
}
const mapStateToProps = state => ({
  contact: state.contacts.currContact,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      loadContactById: contactActions.loadContactById,
      createTransaction: userActions.createTransaction,
      deleteContact: contactActions.deleteContact
    },
    dispatch
  )
});

ContactDetails.propTypes = {
  contact: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactDetails);
