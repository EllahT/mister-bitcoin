import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ContactFilter.scss";

export default props => {
  return (
    <section className="filter-container">
      <label>
        <input
          type="text"
          value={props.value}
          onChange={props.onFilterNameChange}
          placeholder="search contacts..."
        />
        <FontAwesomeIcon icon="filter" />
      </label>
    </section>
  );
};
