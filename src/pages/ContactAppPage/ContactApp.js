import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./ContactApp.scss";

import ContactFilter from "../../components/ContactFilter/ContactFilter";
import ContactList from "../../components/ContactList/ContactList";

import { fetchContactsData } from "../../store/actions/ContactsActions";
import ContactService from "../../services/ContactService";

class ContactApp extends Component {
  state = {
    filterBy: ""
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchContactsData());
  }

  handleNameChange = async e => {
    const {
      target: { value }
    } = e;
    const { dispatch } = this.props;
    await dispatch(fetchContactsData({ term: value }));
    this.setState({ filterBy: value });
  };
  handleDelete = async id => {
    await ContactService.deleteContact(id);
    console.log(this.props.contacts);
  };
  render() {
    const { contacts } = this.props;
    return (
      <React.Fragment>
        <header>
          <h1>Contacts</h1>
        </header>

        <ContactFilter
          value={this.state.filterBy}
          onFilterNameChange={this.handleNameChange}
        />
        <Link to="/contact/edit/" className="add-contact-link">
          Add Contact
        </Link>
        {!contacts.length && <h1>Loading...</h1>}
        {contacts.length > 0 && (
          <ContactList contacts={contacts} onDelete={this.handleDelete} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ ContactReducer }) => {
  const { contacts } = ContactReducer;

  return {
    contacts
  };
};

export default connect(mapStateToProps)(ContactApp);
