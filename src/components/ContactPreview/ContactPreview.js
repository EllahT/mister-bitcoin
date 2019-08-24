import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import utils from "../../utils/utils";
import { URLS } from "../../utils/consts";

import "./ContactPreview.scss";

const ContactPreview = ({ contact, onDelete, history }) => {
  return (
    <li
      className="contact-item"
      onClick={() =>
        history.push(
          utils.formatURL(URLS.CONTACTS.DETAILS, { id: contact._id })
        )
      }
    >
      <img src={`https://robohash.org/${contact._id}?set=set5`} alt="contact" />
      {contact.name}

      <div className="actions">
        <Link
          to={utils.formatURL(URLS.CONTACTS.EDIT, { id: contact._id })}
          onClick={e => e.stopPropagation()}
        >
          <FontAwesomeIcon icon="user-edit" />
        </Link>
        <button
          className="delete-btn"
          onClick={e => {
            e.stopPropagation();
            onDelete(contact._id);
          }}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </li>
  );
};

ContactPreview.propTypes = {
  history: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default withRouter(ContactPreview);
