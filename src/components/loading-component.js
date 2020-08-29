import PropTypes from 'prop-types';
import React from 'react';
import '../styles/loading.scss';

export function LoadingComponent(props) {

  const { isLoading } = props

  return (
    <div className={isLoading ? 'loading lds-dual-ring' : 'loading hidden'}></div>
  );
}

LoadingComponent.propTypes = {
  isLoading: PropTypes.bool
};
