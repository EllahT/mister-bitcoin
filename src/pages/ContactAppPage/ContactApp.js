import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ContactApp.scss";

import contactsActions from "../../store/actions/contactsActions/contactsActions";
import { URLS } from "../../utils/consts";

import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";

class ContactApp extends Component {
  componentDidMount() {
    if (!this.props.isContactsLoaded) {
      this.props.actions.loadContacts();
    }
  }

  onSearchTermChange = async searchTerm => {
    await this.props.actions.loadContacts(searchTerm);
  };

  onContactDelete = async id => {
    await this.props.actions.deleteContact(id);
  };

  render() {
    if (!this.props.user) return <Redirect to={URLS.HOME} />;

    return (
      <section className="contact-app">
        <div className="top-bar">
          <SearchBox
            searchTerm={this.props.contactsSearchTerm}
            onSearchTermChange={this.onSearchTermChange}
            placeholder="Search a contact..."
          />
          <Link to={URLS.CONTACTS.ADD} className="add-contact-link">
            <FontAwesomeIcon icon="user-plus" />
          </Link>
        </div>

        {this.props.isContactsLoaded ? (
          this.props.contacts.length > 0 ? (
            <ContactList
              contacts={this.props.contacts}
              onDelete={this.onContactDelete}
            />
          ) : (
            "No contacts found"
          )
        ) : (
          "Loading..."
        )}
      </section>
    );
  }
}

ContactApp.propTypes = {
  isContactsLoaded: PropTypes.bool.isRequired,
  contacts: PropTypes.array.isRequired,
  user: PropTypes.object,
  contactsSearchTerm: PropTypes.string,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const contacts = state.contacts.searchTerm
    ? state.contacts.filteredContacts
    : state.contacts.contacts;

  return {
    isContactsLoaded: contacts !== null,
    contacts: contacts || [],
    contactsSearchTerm: state.contacts.searchTerm,
    user: state.user.user
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      loadContacts: contactsActions.loadContacts,
      deleteContact: contactsActions.deleteContact
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactApp);
