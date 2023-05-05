import React from 'react';
import { useTransition, animated } from 'react-spring';

const Smooth = ({ children, location }) => {
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: 'scale(0.9)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' },
    config: { duration: 300 },
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      {children}
    </animated.div>
  ));
};

export default Smooth;
