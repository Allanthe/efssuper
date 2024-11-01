import React from 'react';
import Image from 'next/image';
import { SIDEBAR_ITEMS } from '@/SIDEBAR_CONSTANTS';
import { SideBarMenuItems } from './sidebar-menu-items';
import classNames from 'classnames';

interface SidebarProps {
  toggleCollapse: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleCollapse }) => {
  const asideStyle = classNames(
    "fixed bg-violet-500 text-gray-500 z-50 h-full shadow-lg shadow-gray-900/20 transition duration-300 ease-in-out",
    {
      "sm:w-[5.4rem] sm:left-0 left-[100%]": toggleCollapse,
      "w-[20rem]": !toggleCollapse,
    }
  );

  return (
    <aside className={asideStyle}>
      <div className='flex relative items-center py-5 px-3.5'>
        <Image 
          alt="Logo" 
          src='/evzone.jpeg' 
          width={35} 
          height={35} 
          className='w-12 mx-3.5 min-h-fit'
        />
        { !toggleCollapse && <h2 className='pl-2 font-bold text-2xl min-w-max text-white'>
          Administration</h2>
}
      </div>

      <nav className='flex flex-col gap-2 transition duration-300'>

        <div className='flex flex-col gap-2 px-4'>
          {SIDEBAR_ITEMS.map((item, index) => (
            <SideBarMenuItems key={index}  item={item} toggleCollpase={toggleCollapse} />
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
