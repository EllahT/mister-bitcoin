import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ContactPreview.scss";

export default props => {
  const { contact, onDelete } = props;
  return (
    <li className="contact-item">
      <img src={`https://robohash.org/${contact._id}?set=set5`} alt="contact" />
      {contact.name}
      <div className="actions">
        <Link to={`/contact/${contact._id}`}>
          <FontAwesomeIcon icon="user" />
        </Link>
        <Link to={`/contact/edit/${contact._id}`}>
          <FontAwesomeIcon icon="user-edit" />
        </Link>
        <button
          className="delete-btn"
          onClick={() => {
            onDelete(contact._id);
          }}
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </li>
  );
};
