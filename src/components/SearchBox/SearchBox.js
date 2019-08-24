import React from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import "./SearchBox.scss";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: props.searchTerm
    };

    this.reportChange = debounce(this.reportChange, 300);
  }

  onSearchTermChange(searchTerm) {
    this.setState({ searchTerm });
    this.reportChange();
  }

  reportChange() {
    this.props.onSearchTermChange(this.state.searchTerm);
  }

  render() {
    return (
      <input
        className="search-box"
        type="text"
        value={this.state.searchTerm}
        onChange={e => this.onSearchTermChange(e.target.value)}
        placeholder={this.props.placeholder}
      />
    );
  }
}

SearchBox.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchTermChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchBox;
