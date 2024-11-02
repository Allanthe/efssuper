import classNames from 'classnames';
import React from 'react';
import { BsList } from 'react-icons/bs';

const Header = ({ toggleCollapse, setToggleCollapse, username }) => {
  const sideBarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const headerStyle = classNames(
    "fixed bg-violet-400 w-full z-0 shadow-sm shadow-slate-500/40 flex items-center h-16 pr-4", // Added pr-4 for right padding
    {
      "sm:pl-[20rem]": !toggleCollapse,  // Full padding when sidebar is expanded
      "sm:pl-[6.5rem]": toggleCollapse,   // Reduced padding when sidebar is collapsed
    }
  );

  return (
    <header className={headerStyle}>
      <button onClick={sideBarToggle} className="order-2 sm:order-1 ml-4">
        <BsList />
      </button>

      <div className='order-1 sm:order-2 flex items-center justify-between w-full'>
        <h1 className="text-xl font-bold text-white">EVzone</h1>
        <div className='flex items-center'>
          <span className='text-white mr-2 font-semibold'>{username}</span>
          <div className='h-10 w-10 rounded-full bg-violet-950 flex items-center justify-center text-center text-white'>
            <span className='font-semibold text-sm'>User</span> {/* Optional: Replace 'User' with actual initials if needed */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
