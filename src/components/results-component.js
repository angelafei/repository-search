import PropTypes from 'prop-types';
import React from 'react';

import { InViewComponent } from './in-view-component';

export function ResultsComponent(props) {
  const { query, isLoading, results, handleChange } = props;

  const renderList = result =>  (
    <div className="list" key={result.id}>
      <a href={result.html_url} rel="noreferrer nofollow" target="_blank">{result.full_name}</a>
    </div>
  );
  
  const renderResults = () => {
    if (query && !isLoading && results.length === 0) {
      return <div className="list empty-result">No result!</div>
    }
    return results.map((result, index) => {
      const isLast = index + 1 === results.length;
  
      return isLast ? 
        <InViewComponent key={result.id} onChange={handleChange} threshold={0.3}>
          {renderList(result)}
        </InViewComponent> :
        renderList(result)
    });
  }

  return (
    <div className="results">
      {renderResults()}
    </div>
  );
}

ResultsComponent.propTypes = {
  query: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};
