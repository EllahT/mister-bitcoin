import React, { Component } from "react";

import contactService from "../../services/contactService";

import "./ContactDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { URLS } from "../../utils/consts";
import utils from "../../utils/utils";
export default class ContactDetails extends Component {
  state = {
    contact: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const contact = await contactService.getContactById(id);
    this.setState({ contact });
  }

  onDelete = async () => {
    await contactService.deleteContact(this.state.contact.id);
    this.props.history.push(URLS.CONTACTS.LIST);
  };

  render() {
    const { contact } = this.state;
    return (
      contact && (
        <section className="contact-details">
          <div className="actions">
            <Link to={URLS.CONTACTS.LIST}>
              <FontAwesomeIcon icon="chevron-left" />
            </Link>
            <Link to={utils.formatURL(URLS.CONTACTS.EDIT, { id: contact._id })}>
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
          <h1> {contact.name}</h1>
          <img
            src={`https://robohash.org/${contact._id}?set=set5`}
            alt="contact"
          />
          <h4>
            <FontAwesomeIcon icon="at" /> {contact.email}
          </h4>
          <h4>
            <FontAwesomeIcon icon="phone" /> {contact.phone}
          </h4>
        </section>
      )
    );
  }
}
