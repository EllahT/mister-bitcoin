import React from "react";

import "./ContactList.scss";

import ContactPreview from "../ContactPreview/ContactPreview";

export default props => {
  const { contacts, onDelete } = props;
  return (
    <ul className="contact-list">
      {contacts.map(contact => (
        <ContactPreview
          key={contact._id}
          contact={contact}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};
