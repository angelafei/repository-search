import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import 'regenerator-runtime/runtime';

/**
 * Do feature detection, to figure out which polyfills needs to be imported.
 **/
async function loadPolyfills() {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}

export function InViewComponent(props) {

  const { children, onChange, threshold, rootMargin } = props;
  const ref = useRef(null);
  // const [triggered, setTriggered] = useState(false);

  loadPolyfills();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          onChange && onChange();

          // unobserve the element
          observerInstance.unobserve(ref.current)
        }
      },
      {
        root: null,
        rootMargin: rootMargin || '0px',
        threshold: threshold || 0
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);


  return (
    <div {...props} ref={ref}>
      {children}
    </div>
  );
}

InViewComponent.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string
};
