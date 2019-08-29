import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import contactActions from "../../store/actions/contactsActions/contactsActions";

import "./ContactEdit.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URLS } from "../../utils/consts";

class ContactEdit extends Component {
  state = {
    contact: null
  };
  onDelete = async () => {
    await this.props.actions.deleteContact(this.props.contact._id);
    this.props.history.push(URLS.CONTACTS.LIST);
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      await this.props.actions.loadContactById(id);
      this.setState({ contact: this.props.contact });
    } else this.setState({ contact: { name: "", email: "", phone: "" } });
  }

  handleChange = e => {
    const newState = { ...this.state.contact };
    newState[e.target.name] = e.target.value;
    this.setState({ contact: newState });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.actions.saveContact(this.state.contact);
    const { history } = this.props;
    history.push(URLS.CONTACTS.LIST);
  };

  render() {
    if (!this.props.user) return <Redirect to={URLS.HOME} />;

    return (
      this.state.contact && (
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

ContactEdit.propTypes = {
  actions: PropTypes.object.isRequired,
  contact: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      saveContact: contactActions.saveContact,
      loadContactById: contactActions.loadContactById,
      deleteContact: contactActions.deleteContact
    },
    dispatch
  )
});

const mapStateToProps = state => ({
  contact: state.contacts.currContact,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactEdit);
