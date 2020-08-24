import React, { useEffect, useReducer } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';

import { SearchComponent } from './components/search-component';
import { LoadingComponent } from './components/loading-component';
import { InViewComponent } from './components/in-view-component';

import './styles/main.scss';

const initialState = {
  query: '',
  results: [],
  page: 1,
  isLoading: false,
  error: null
};

function reducer(state, action) {
  const newState = action.payload;

  switch (action.type) {
    case 'resetSearch':
      return { 
        ...initialState,
        query: newState.query,
        results: [],
        page: 1
      };
    case 'nextPage':
      return { 
        ...state,  
        page: newState.page + 1
      };
    case 'loading': 
      return {
        ...state, 
        isLoading: true,
        error: false
      }
    case 'loaded': 
      return {
        ...state, 
        isLoading: false,
        results: newState.results
      }
    case 'error': 
      return {
        ...initialState, 
        isLoading: false,
        results: [],
        error: newState.error
      }
    default:
      return initialState;
  }
}

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, results, page, isLoading, error } = state;

  const apiRoot = 'https://api.github.com/search/repositories';

  const triggerApi = () =>  {
    if(!query) { return; }

    let cancel;
    console.log('query:', query);
    dispatch({ type: 'loading' });

    axios({
      method: 'GET',
      url: apiRoot,
      params: { q: query, page: page, per_page: 100 },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
      // console.log('response:', response);
      // console.log('response.headers:', response.headers.link);
      dispatch({ type: 'loaded', payload: { results: [ ...results, ...response.data.items ] } });
    }).catch(e => {
      if (axios.isCancel(e)) return
      // setError(true)
      dispatch({ type: 'error', payload: { error: e } });
    });
  };

  const handleChange = () => 
    dispatch({ type: 'nextPage', payload: { page } });
  

  const renderResults = () => {
    console.log('here');
    return results.map((result, index) => {
      // console.log('result:', result);
      const isLast = index + 1 === results.length;
      return isLast ? 
        <InViewComponent key={result.id} onChange={handleChange}>
          <div key={result.id}>{result.full_name}</div>
        </InViewComponent> :
        <div key={result.id}>{result.full_name}</div>
    }
    );
  };

  // Debounce callback
  const [debouncedCallback] = useDebouncedCallback(
    // function
    (value) => {
      console.log('value:', value);

      if (!value) {
        return;
      }

      dispatch({ type: 'resetSearch', payload: { query: value } });

      //TODO: incomplete_results


    },
    // delay in ms
    600
  );

  useEffect(() => triggerApi(), [page, query]);

  return (
    <div className="wrapper">
      <SearchComponent handleChange={debouncedCallback} />
      <div className="results">
        {state.results && renderResults()}
      </div>
      <LoadingComponent isLoading={isLoading} />
    </div>
  );
}
