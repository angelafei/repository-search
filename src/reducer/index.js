export const initialState = {
  query: '',
  results: [],
  hasMore: true,
  page: 1,
  isLoading: false,
  error: null
};

export function reducer(state, action) {
  const newState = action.payload;

  switch (action.type) {
  case 'resetSearch':
    return { 
      ...initialState,
      query: newState.query
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
      error: null
    }
  case 'loaded': 
    return {
      ...state, 
      isLoading: false,
      hasMore: newState.hasMore,
      results: newState.results
    }
  case 'error': 
    return {
      ...initialState,
      isLoading: false,
      error: newState.error
    }
  case 'warning': 
    return {
      ...state,
      isLoading: false
    }
  default:
    return initialState;
  }
}