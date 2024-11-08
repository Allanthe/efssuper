'use client';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const SideBarMenuItems = ({ item, toggleCollapse }) => {
  const linkStyles = 'flex items-center min-h-[50px] h-full text-white py-2 px-4 hover:text-violet-950 rounded-md transition duration-200';
  const ddlinkstyles = linkStyles;
  const activelinkstyles = 'text-white py-2 hover:text-white transition duration-200';
  const navbarmenudropdownitems = "text-white py-2 px-4 hover:text-violet-800 transition duration-200";

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const pathName = usePathname();

  return (
    <>
      {item.submenu ? (
        <div className="rounded min-w-[18px]">
          {/* Main link for the submenu */}
          <a
            className={`${ddlinkstyles} ${pathName.includes(item.path) ? activelinkstyles : ''}`}
            onClick={toggleSubMenu}
          >
            {item.icon}
            {/* Show text and chevron when expanded */}
            {!toggleCollapse && (
              <>
                <span className="ml-3 leading-6 font-semibold">{item.title}</span>
                <BsChevronRight className={`${subMenuOpen ? 'rotate-90' : ''} ml-auto stroke-2 text-xs`} />
              </>
            )}
          </a>

          {/* Submenu Items */}
          {subMenuOpen && !toggleCollapse && (
            <div className="bg-violet-400 border-l-4">
              <div className="grid gap-y-2 px-10 py-3 leading-5">
                {item.subMenuItems.map((subitem, indx) => (
                  <Link
                    key={indx}
                    href={subitem.path}
                    className={`${navbarmenudropdownitems} ${subitem.path === pathName ? 'text-white' : ''}`}
                  >
                    <span>{subitem.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Regular menu link without submenu */
        <Link href={item.path} className={`${linkStyles} ${item.path === pathName ? activelinkstyles : ''}`}>
          <div className="flex items-center">
            {item.icon}
            {/* Show text only when sidebar is expanded */}
            {!toggleCollapse && <span className="ml-3 leading-6 font-semibold">{item.title}</span>}
          </div>
        </Link>
      )}
    </>
  );
};
