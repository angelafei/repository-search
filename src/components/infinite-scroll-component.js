// import PropTypes from 'prop-types';
import React from 'react';

export function InfiniteScroll() {

  return (
    <div className="guide-container">
      <p>Please select a seat to see employee's information.</p>
      <div className="intro">
        <span className="seat"></span>
        <span>shows this employee is currently out of office.</span>
      </div>
    </div>
  );
}

// InfoComponent.propTypes = {
//   info: PropTypes.object.isRequired,
// };
