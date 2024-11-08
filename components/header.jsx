import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { BsList } from 'react-icons/bs';

// Clock Component to display current date and time
function Clock() {
  const [currentDate, setCurrentDate] = useState(new Date().toString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date().toString());
    }, 1000); // Update every second

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  return <span className="text-sm text-white">{currentDate}</span>;
}

const Header = ({ toggleCollapse, setToggleCollapse, username }) => {
  const sideBarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const headerStyle = classNames(
    "fixed bg-gradient-to-r from-violet-600 via-indigo-700 to-blue-800 w-full z-0 shadow-lg flex items-center h-16 pr-4 transition-all duration-300 ease-in-out", 
    {
      "sm:pl-[20rem]": !toggleCollapse,  // Full padding when sidebar is expanded
      "sm:pl-[6.5rem]": toggleCollapse,   // Reduced padding when sidebar is collapsed
    }
  );

  return (
    <header className={headerStyle}>
      <button 
        onClick={sideBarToggle} 
        className="order-2 sm:order-1 ml-4 p-2 rounded-full hover:bg-violet-600 transition-colors duration-200 ease-in-out"
      >
        <BsList size={24} className="text-white" />
      </button>

      <div className='order-1 sm:order-2 flex items-center justify-between w-full px-4'>
        <h1 className="text-2xl font-semibold text-white">EVzone</h1>
        <div className='flex items-center space-x-4'>
          <Clock />
          <span className='text-white font-semibold'>{username}</span>
          
          <div className='relative'>
            <div className='h-10 w-10 rounded-full bg-violet-950 flex items-center justify-center text-center text-white hover:bg-violet-800 transition-colors duration-300'>
              <span className='font-semibold text-sm'>{username ? username[0] : 'U'}</span> {/* Displaying user's initial */}
            </div>
            <div className="absolute top-0 left-0 mt-12 ml-2 bg-white text-black text-xs p-1 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 ease-in-out">
              View Profile
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
