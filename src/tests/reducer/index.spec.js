import { expect } from 'chai';

import { initialState, reducer } from '../../reducer';


describe('Reducer', function () {
  it('default to initial state', function () {
    const result = reducer(initialState, { type: 'nothing' });

    expect(result).to.deep.equal({ ...initialState });
  });

  it('rests search', function () {
    const result = reducer(initialState, { type: 'resetSearch', payload: { query: 'reset' } });

    expect(result).to.deep.equal({ ...initialState, query: 'reset' });
  });

  it('increments page number', function () {
    const result = reducer(initialState, { type: 'nextPage', payload: { page: 5 } });

    expect(result).to.deep.equal({ ...initialState, page: 6 });
  });

  it('loading', function () {
    const state = {
      query: 'query',
      results: [],
      page: 1,
      isLoading: false,
      error: 'error'
    }
    const result = reducer(state, { type: 'loading' });

    expect(result).to.deep.equal({ ...state, isLoading: true, error: null });
  });

  it('loaded', function () {
    const state = {
      query: 'query',
      results: [],
      page: 2,
      isLoading: true,
      error: null
    }
    const results = [1,2,3,4]
    const result = reducer(state, { type: 'loaded', payload: { results, hasMore: false } });

    expect(result).to.deep.equal({ ...state, isLoading: false, results, hasMore: false });
  });

  it('error', function () {
    const state = {
      query: 'query',
      results: [],
      page: 2,
      isLoading: true,
      error: null
    }
    const error = 'Error Message';
    const result = reducer(state, { type: 'error', payload: { error } });

    expect(result).to.deep.equal({ ...initialState, isLoading: false, error });
  });

  it('warning', function () {
    const state = {
      query: 'query',
      results: [],
      page: 3,
      isLoading: true,
      error: null
    }
    const result = reducer(state, { type: 'warning' });

    expect(result).to.deep.equal({ ...state, isLoading: false });
  });
});
