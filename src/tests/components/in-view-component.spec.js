import React from 'react';
import sinon from 'sinon';
import jsdom from 'mocha-jsdom';
import { render, cleanup } from '@testing-library/react';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

describe('In View Component', function () {
  
  let inViewPage;
  let InViewComponent;

  // eslint-disable-next-line mocha/no-setup-in-describe
  jsdom({
    url: 'http://localhost'
  });

  afterEach(cleanup);

  it('should observe the node', function () {
    const mockIntersectionObserver = class {
      constructor(callback) { callback([{ isIntersecting: false }], this); }
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    
    global.IntersectionObserver = mockIntersectionObserver;
    inViewPage = require('../../components/in-view-component');
    InViewComponent = inViewPage.InViewComponent;

    const observeSpy = sinon.spy(IntersectionObserver.prototype, 'observe');
    const unobserveSpy = sinon.spy(IntersectionObserver.prototype, 'unobserve');
    render(<InViewComponent><div>Children</div></InViewComponent>);

    sinon.assert.calledOnce(observeSpy);
    sinon.assert.notCalled(unobserveSpy);

    observeSpy.restore();
    unobserveSpy.restore();
  });

  it('should trigger onChange event (if available in props) and cancel observe', function () {
    const mockIntersectionObserver = class {
      constructor(callback) { callback([{ isIntersecting: true }], this); }
      observe() {}
      unobserve() {}
      disconnect() {}
    };
    
    global.IntersectionObserver = mockIntersectionObserver;
    inViewPage = require('../../components/in-view-component');
    InViewComponent = inViewPage.InViewComponent;

    const observeSpy = sinon.spy(IntersectionObserver.prototype, 'observe');
    const unobserveSpy = sinon.spy(IntersectionObserver.prototype, 'unobserve');
    const onChangeSpy = sinon.spy();

    render(<InViewComponent onChange={onChangeSpy}><div>Children</div></InViewComponent>);

    sinon.assert.calledOnce(observeSpy);
    sinon.assert.calledOnce(onChangeSpy);
    sinon.assert.calledOnce(unobserveSpy);

    observeSpy.restore();
    unobserveSpy.restore();
  });

});
