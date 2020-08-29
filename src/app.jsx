import React, { useEffect, useReducer } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';

import { initialState, reducer } from './reducer';

import { SearchComponent } from './components/search-component';
import { LoadingComponent } from './components/loading-component';
import { ResultsComponent } from './components/results-component';

import './styles/main.scss';

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, hasMore, results, page, isLoading, error } = state;
  const itemsPerPage = 100;

  const apiRoot = 'https://api.github.com/search/repositories';

  const triggerApi = () => {
    let cancel;

    if (!query || !hasMore) { 
      return; 
    }

    dispatch({ type: 'loading' });
  
    axios.get(`${apiRoot}?q=${query}&page=${page}&per_page=${itemsPerPage}`, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
      const newResults = [ 
        ...results, 
        ...response.data.items 
      ];

      dispatch({ 
        type: 'loaded', 
        payload: {
          hasMore: newResults.length < response.data.total_count,
          results: newResults
        }
      });
    }).catch(e => {
      if (axios.isCancel(e)) return

      if (e && e.response && (e.response.status === 422 || e.response.status === 403)) {
        console.error(e.response.data.message);
        dispatch({ type: 'warning' });
      } else {
        dispatch({ type: 'error', payload: { error: e } });
      }
    });
    return () => cancel()
  };

  const handleChange = () => 
    dispatch({ type: 'nextPage', payload: { page } });

  // Debounce callback
  const [debouncedCallback] = useDebouncedCallback(
    (value) => {
      if (!value) {
        return;
      }
      dispatch({ type: 'resetSearch', payload: { query: value } });
    },
    600
  );

  useEffect(() => triggerApi(), [page, query]);

  return (
    <div className="scrolling-box">
      <div className="wrapper">
        <SearchComponent handleChange={debouncedCallback} />
        {results && <ResultsComponent 
          query={query} 
          isLoading={isLoading}  
          results={results}
          handleChange={handleChange}
        />}
        <LoadingComponent isLoading={isLoading} />
        {error && <div className="error">{error.message}</div>}
      </div>
      <div className="back-to-top-wrapper">
        <a href="#" className="back-to-top-link" aria-label="Scroll to Top">🔝</a>
      </div>
    </div>
  );
}
