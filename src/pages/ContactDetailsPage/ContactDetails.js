import React, { Component } from "react";

import ContactService from "../../services/ContactService";

import "./ContactDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
export default class ContactDetails extends Component {
  state = {
    contact: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const contact = await ContactService.getContactById(id);
    this.setState({ contact });
  }

  onDelete = async () => {
    await ContactService.deleteContact(this.state.contact.id);
    this.props.history.push("/contact");
  };

  render() {
    const { contact } = this.state;
    return (
      contact && (
        <section className="contact-details">
          <div className="actions">
            <Link to="/contact">
              <FontAwesomeIcon icon="chevron-left" />
            </Link>
            <Link to={`/contact/edit/${contact._id}`}>
              <FontAwesomeIcon icon="edit" />
            </Link>
            <button
              className="delete-btn"
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
            {" "}
            <FontAwesomeIcon icon="at" /> {contact.email}
          </h4>
          <h4>
            {" "}
            <FontAwesomeIcon icon="phone" /> {contact.phone}
          </h4>
        </section>
      )
    );
  }
}
