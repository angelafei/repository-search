import React from 'react';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom';
import axios from 'axios';
import { render, cleanup, act } from '@testing-library/react';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils';
import 'regenerator-runtime/runtime';

describe('App', function () {
  let clock;
  let getStub;

  // eslint-disable-next-line mocha/no-setup-in-describe
  jsdom({
    url: 'http://localhost'
  });

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    getStub = sinon.stub(axios, 'get');
  });

  afterEach(function() {
    getStub.restore();
    cleanup;
  });

  it('should not trigger data loading when input changed to empty', async function() {
    const AppPage = require('../app.jsx');
    const App = AppPage.App;

    getStub.restore();
    const getSpy = sinon.spy(axios, 'get');

    const { container, rerender } = render(<App />);

    const node = container.querySelector('.search-container  input');
    node.value = 'p';
    ReactTestUtils.Simulate.change(node);
    clock.tick(600);

    rerender(<App />);
    sinon.assert.calledOnce(getSpy);

    node.value = '';
    ReactTestUtils.Simulate.change(node);
    clock.tick(600);
    getSpy.resetHistory();

    rerender(<App />);
    sinon.assert.notCalled(getSpy);
    getSpy.restore();
  });

  it('shows loading spinner when data loading and then hides spinner as well as display data', async function() {
    const mockIntersectionObserver = class {
      constructor(callback) { callback([{ isIntersecting: false }], this); }
      observe() {}
      unobserve() {}
      disconnect() {}
    };
      
    global.IntersectionObserver = mockIntersectionObserver;
    const AppPage = require('../app.jsx');
    const App = AppPage.App;

    const items = [
      { id: 1, full_name: 'repo1', html_url: 'url1' },
      { id: 2, full_name: 'repo2', html_url: 'url2' },
      { id: 3, full_name: 'repo3', html_url: 'url3' }
    ];

    const { container, rerender } = render(<App />);
      
    const node = container.querySelector('.search-container  input');
    node.value = 'p';
    ReactTestUtils.Simulate.change(node);
    clock.tick(600);

    getStub.returns(Promise.resolve({
      data: {
        total_count: 3,
        items
      }
    }));

    rerender(<App />);
    expect(container.querySelector('.loading').classList.contains('lds-dual-ring')).to.equal(true);

    await act(async () => {
      rerender(<App />);
    });

    expect(container.querySelectorAll('.list').length).to.equals(3);
    expect(container.querySelector('.loading').classList.contains('lds-dual-ring')).to.equal(false);
  });

  it('shows loading spinner when data loading and then hides spinner as well as display error', async function() {
    const AppPage = require('../app.jsx');
    const App = AppPage.App;

    const { container, rerender } = render(<App />);
      
    const node = container.querySelector('.search-container  input');
    node.value = 'pa';
    ReactTestUtils.Simulate.change(node);
    clock.tick(600);

    getStub.returns(Promise.reject({
      message: 'Error occurred'
    }));

    rerender(<App />);
    expect(container.querySelector('.loading').classList.contains('lds-dual-ring')).to.equal(true);

    await act(async () => {
      rerender(<App />);
    });

    expect(container.querySelectorAll('.list').length).to.equals(0);
    expect(container.querySelector('.loading').classList.contains('lds-dual-ring')).to.equal(false);
    expect(container.querySelector('.error').innerHTML).to.equal('Error occurred');
  });

  it('logs error when error code is 422 or 403', async function() {
    const AppPage = require('../app.jsx');
    const App = AppPage.App;

    const logStub = sinon.stub(console, 'error');
    const errorMessage1 = 'Only the first 1000 search results are available';
    const errorMessage2 = 'API rate limit exceeded';

    const { container, rerender } = render(<App />);
      
    // 422
    const node = container.querySelector('.search-container  input');
    node.value = 'paw';
    ReactTestUtils.Simulate.change(node);
    clock.tick(600);

    getStub.returns(Promise.reject({
      response: {
        status: 422,
        data: {
          message: errorMessage1
        }
      }
    }));

    rerender(<App />);
    expect(container.querySelector('.loading').classList.contains('lds-dual-ring')).to.equal(true);

    await act(async () => {
      rerender(<App />);
    });

    sinon.assert.calledOnceWithExactly(logStub, errorMessage1);

    // 403
    logStub.resetHistory();
    node.value = 'pa';
    ReactTestUtils.Simulate.change(node);
    clock.tick(600);

    getStub.returns(Promise.reject({
      response: {
        status: 403,
        data: {
          message: errorMessage2
        }
      }
    }));

    rerender(<App />);
    expect(container.querySelector('.loading').classList.contains('lds-dual-ring')).to.equal(true);

    await act(async () => {
      rerender(<App />);
    });

    sinon.assert.calledOnceWithExactly(logStub, errorMessage2);
    
    logStub.restore();
  });
});
