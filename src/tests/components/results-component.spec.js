import React from 'react';
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ResultsComponent } from '../../components/results-component';

describe('Results Component', function () {

  
  // eslint-disable-next-line mocha/no-setup-in-describe
  jsdom({
    url: 'http://localhost'
  });

  it('displays `No result` when query is not empty and is not loading', async function() {
    const { container } = render(<ResultsComponent query={'q'} isLoading={false} results={[]} />);

    expect(container.querySelector('.list').classList.contains('empty-result')).to.equals(true);
  });

  it('renders result lists when results available', async function() {
    const results = [
      { id: 1, html_url: 'url1', full_name: 'repo1' },
      { id: 2, html_url: 'url1', full_name: 'repo2' },
      { id: 3, html_url: 'url1', full_name: 'repo3' }
    ];

    const renderer = new ShallowRenderer();
    renderer.render(<ResultsComponent 
      query={'q'} 
      isLoading={false} 
      results={results}
      handleChange={() => {}}
    />);
    const result = renderer.getRenderOutput();

    expect(result.props.children[0].type).to.equals('div');
    expect(result.props.children[0].key).to.equals(results[0]['id'].toString());
    expect(result.props.children[0].props.className).to.equals('list');
    expect(result.props.children[1].type).to.equals('div');
    expect(result.props.children[1].key).to.equals(results[1]['id'].toString());
    expect(result.props.children[1].props.className).to.equals('list');
    expect(result.props.children[2].type).to.not.equals('div');
  });

});
