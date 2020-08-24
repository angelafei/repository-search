// import PropTypes from 'prop-types';
import React from 'react';
import '../styles/loading.scss';

export function LoadingComponent(props) {

  const { isLoading } = props

  return (
    <div className={isLoading ? 'lds-dual-ring' : 'hidden'}></div>
  );
}

// InfoComponent.propTypes = {
//   info: PropTypes.object.isRequired,
// };
