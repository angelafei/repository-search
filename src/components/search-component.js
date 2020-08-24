// import PropTypes from 'prop-types';
import React from 'react';

export function SearchComponent(props) {
  const { handleChange } = props;

  return (
    <div className="search-container">
      <input type="text" onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
}

// InfoComponent.propTypes = {
//   info: PropTypes.object.isRequired,
// };
