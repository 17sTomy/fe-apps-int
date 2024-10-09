import React, { useMemo } from 'react';
import './dashboard.styles.scss';

export const Content = ({ menuOpen, children }) => {
  const contentStyles = useMemo(
    () =>
      window.innerWidth <= 768
        ? {
            position: 'initial',
            left: 'initial',
            marginTop: 60,
          }
        : {
            position: 'absolute',
            left: menuOpen ? '250px' : '0px',
          },
    [menuOpen]
  );

  return (
    <div className="content" style={contentStyles}>
      {children}
    </div>
  );
};
