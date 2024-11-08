import classNames from 'classnames';
import React from 'react';

const PageWrapper = ({ children, toggleCollapse }) => {
  const pageStyle = classNames("bg-slate-50 flex-grow text-black p-2 mt-16", {
    "sm:pl-[20rem]": !toggleCollapse,  // Full padding when sidebar is expanded
    "sm:pl-[6.5rem]": toggleCollapse,   // Reduced padding when sidebar is collapsed
  });

  return (
    <div className={pageStyle}>
      {children}
    </div>
  );
};

export default PageWrapper;
