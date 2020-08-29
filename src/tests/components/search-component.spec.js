import React from 'react';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';

import { SearchComponent } from '../../components/search-component';

describe('Search Component', function () {
  
  // eslint-disable-next-line mocha/no-setup-in-describe
  jsdom({
    url: 'http://localhost'
  });

  it('triggers handle search function on input change', async function() {
    const handleSearchSpy = sinon.spy();
    const { container } = render(<SearchComponent handleChange={handleSearchSpy} className={'test'} />);

    const node = container.querySelector('.search-container  input');
    node.value = 'a';
    ReactTestUtils.Simulate.change(node);

    sinon.assert.calledOnce(handleSearchSpy);
  });

});
