// import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

export function InViewComponent(props) {

  const { children, onChange, threshold, rootMargin } = props;
  console.log('children:', children);

  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  // const observer = new IntersectionObserver(
  //   ([entry]) => {
  //     // console.log('entries:', entries);

  //     // checks to see if the element is intersecting
  //     if (entry.isIntersecting) {
  //       console.log('!!! inView:');
  //       // if it is update the state, we set triggered as to not re-observe the element
  //       // setState({
  //       //   inView: true,
  //       //   triggered: true,
  //       //   entry: observerInstance,
  //       // })

  //       // unobserve the element
  //       // observer.unobserve(elementRef.current)
  //     }
  //   },
  //   {
  //     threshold: threshold || 0,
  //     root: root || null,
  //     rootMargin: rootMargin || "0%",
  //   }
  // );

  // const observer = new IntersectionObserver(
  //   ([entry]) => {
  //     console.log(entry);

  //     if (entry.isIntersecting) {
  //       //do your actions here
  //       console.log('It works!')
  //     }

  //     // //unobserve the element
  //     // observerInstance.unobserve(elementRef.current)
  //   },
  //   {
  //     threshold: threshold || 0,
  //     root: root || null,
  //     rootMargin: rootMargin || "0%",
  //   }
  // );

  // useEffect(() => {
  //   // check that the element exists, and has not already been triggered
  //   if (elementRef.current && !triggered) {
  //     observer.observe(elementRef.current)
  //   }
  // }, [elementRef]);

  // const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        // console.log(entry);

        if (entry.isIntersecting) {
          //do your actions here
          console.log('It works!');

          console.log('ref:', ref);

          onChange && onChange();

          // unobserve the element
          observerInstance.unobserve(ref.current)
        }
      },
      {
        root: null,
        rootMargin: rootMargin || "0px",
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

// InViewComponent.defaultProps = {
//   threshold: 0
// };

// InfoComponent.propTypes = {
//   info: PropTypes.object.isRequired,
// };
