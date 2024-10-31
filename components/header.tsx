import classNames from 'classnames';
import React, { Dispatch, SetStateAction } from 'react';
import { BsList } from 'react-icons/bs';

interface HeaderProps {
  toggleCollapse: boolean;
  setToggleCollapse: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ toggleCollapse, setToggleCollapse }) => {
  const sideBarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const headerStyle = classNames(
    "fixed bg-violet-400 w-full z-0 shadow-sm shadow-slate-500/40 flex items-center h-16",
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
        <h1 className="text-xl font-bold">EVzone</h1>
        <div className='h-10 w-10 rounded-full bg-violet-950 flex items-center justify-center text-center text-white'>
          <span className='font-semibold text-sm'>SR</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
