import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import contactService from "../../services/contactService";

import "./ContactEdit.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URLS } from "../../utils/consts";

export default class ContactEdit extends Component {
  state = {
    contact: null
  };

  onDelete = async () => {
    await contactService.deleteContact(this.state.contact.id);
    this.props.history.push(URLS.CONTACTS.LIST);
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const contact = await contactService.getContactById(id);
      this.setState({ contact });
    } else this.setState({ contact: contactService.getEmptyContact() });
  }

  handleChange = e => {
    const newState = { ...this.state.contact };
    newState[e.target.name] = e.target.value;
    this.setState({ contact: newState });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await contactService.saveContact(this.state.contact);
    const { history } = this.props;
    history.push(URLS.CONTACTS.LIST);
  };

  render() {
    if (!this.props.user) return <Redirect to={URLS.HOME} />;

    const { contact } = this.state;
    return (
      contact && (
        <section className="contact-edit">
          <div className="actions">
            <Link to={URLS.CONTACTS.LIST}>
              <FontAwesomeIcon icon="chevron-left" />
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
          <form onSubmit={this.handleSubmit}>
            <div>
              <FontAwesomeIcon icon="user" />
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.contact.name}
              />
            </div>
            <div>
              <FontAwesomeIcon icon="at" />
              <input
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.contact.email}
              />
            </div>
            <div>
              <FontAwesomeIcon icon="phone" />
              <input
                type="text"
                name="phone"
                onChange={this.handleChange}
                value={this.state.contact.phone}
              />
            </div>
            <button className="icon-btn">
              <FontAwesomeIcon icon="save" />
            </button>
          </form>
        </section>
      )
    );
  }
}
