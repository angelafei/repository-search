import PropTypes from 'prop-types';
import React from 'react';

export function SearchComponent(props) {
  const { handleChange } = props;

  return (
    <div className="search-container">
      <input className="search-input" type="text" onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
}

SearchComponent.propTypes = {
  className: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};
