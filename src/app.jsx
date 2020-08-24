import React, { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { InView } from 'react-intersection-observer';
import axios from 'axios';

import { SearchComponent } from './components/search-component';
import { LoadingComponent } from './components/loading-component';

import './styles/main.scss';

export function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const apiRoot = 'https://api.github.com/search/repositories';

  const triggerApi = (value) =>  {
    console.log('value:', value);
    setIsLoading(true);
    axios.get(`https://api.github.com/search/repositories?q=${value}&page=${page}&per_page=100`).then((response) => {
      console.log('response:', response);
      console.log('response.headers:', response.headers.link);
      setResults([ ...results, ...response.data.items ]);
      setPage(page + 1);
      setIsLoading(false);
    });
  };

  const getNewPage = (inView, entry) => {
    console.log('====== getNewPage:', inView);
    inView && triggerApi(query);
  }

  const renderResults = () => {
    console.log('here');
    return results.map((result, index) => {
      console.log('result:', result);
      const isLast = index + 1 === results.length;
      return isLast ? 
      <InView key={result.id} as="div" triggerOnce={true} onChange={(inView) => getNewPage(inView)}>
        <div key={result.id}>{result.full_name}</div>
      </InView> : 
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

      setQuery(value);
      setPage(1);

      // axios.get(`https://api.github.com/search/repositories?q=${value}&page=10&per_page=100`).then((response) => {
      //   console.log('response:', response);
      //   console.log('response.headers:', response.headers.link);
      //   setResults(response.data.items);
      // });
      triggerApi(value);

      //TODO: incomplete_results


    },
    // delay in ms
    600
  );

  return (
    <div className="wrapper">
      <SearchComponent handleChange={debouncedCallback} />
      <div className="results">
        {results && renderResults()}
      </div>
      <LoadingComponent isLoading={isLoading} />
    </div>
  );
}
