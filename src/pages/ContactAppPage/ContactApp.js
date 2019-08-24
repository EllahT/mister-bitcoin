import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ContactApp.scss";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import contactsActions from "../../store/actions/contactsActions/contactsActions";
import { bindActionCreators } from "redux";
import { URLS } from "../../utils/consts";

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
    console.log(this.props.contacts);
  };

  render() {
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
    contactsSearchTerm: state.contacts.searchTerm
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
