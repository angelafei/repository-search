import React from 'react';
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import { render, cleanup } from '@testing-library/react';

import { LoadingComponent } from '../../components/loading-component';

describe('Loading Component', function () {
  
  // eslint-disable-next-line mocha/no-setup-in-describe
  jsdom({
    url: 'http://localhost'
  });

  afterEach(cleanup);

  it('renders loading spinner while is loading', function () {
    const { container } = render(<LoadingComponent isLoading={true} />);

    expect(container.querySelector('div').classList.contains('lds-dual-ring')).to.equal(true);
  });

  it('hides loadding spinner while is not loading', function () {
    const { container } = render(<LoadingComponent isLoading={false} />);

    expect(container.querySelector('div').classList.contains('hidden')).to.equal(true);
  });

});
