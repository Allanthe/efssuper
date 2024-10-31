'use client';
import Link from 'next/link';
import { SideBarItems } from '@/types/types';
import { BsChevronRight } from 'react-icons/bs';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const SideBarMenuItems = ({ item,toggleCollpase }: { item: SideBarItems,toggleCollpase:boolean }) => {
  const linkStyles = 'flex items-center min-h-[40px] h-full text-black py-2 px-4 hover:text-white rounded-md transition duration-200';
  const ddlinkstyles = linkStyles;
  const activelinkstyles='text-white py-2 hover:text-white transition duratio-200'
  const navbarmenudropdownitems = "text-black py-2 px-4 hover:text-blue transition duration-200"
  const [subMenuOpen,setSubMenuOpen] = useState(false); 
  const toggleSubMenu =()=> {
    setSubMenuOpen(!subMenuOpen);
  }
  const pathName = usePathname()

  return (
    <>
      {item.submenu ? (
        <div className='rounded min-win-[18px]'>
          <a className={`${ddlinkstyles} ${pathName.includes(item.path) ? activelinkstyles : ''}`} onClick={toggleSubMenu} >
                {item.icon}

                {!toggleCollpase &&
                  <>
                  <span className='ml-3 leading-6 font-semibold'> {item.title}</span>
                  <BsChevronRight className={`${subMenuOpen ? 'rotate-90' : ''} ml-auto stroke-2 text-xs`} />

                  </>
                }
                

            </a>

           
            {subMenuOpen && !toggleCollpase && <div className='bg-violet-400 border-1-4'>
              <div className='grid gap-y-2 px-10 py-3 leading-5'>
                  {
                      item.subMenuItems.map((subitem,indx)=>{
                          return (
                            <Link key={indx} href={subitem.path} className={`${navbarmenudropdownitems} ${subitem.path === pathName ? 'text-white' : ''}`}>
                                <span>{subitem.title}</span>
                              </Link>
                          )
                      })
                  }

              </div>

          </div>

      }
            
        </div>
      ) : (
        <Link href={item.path} className={`${linkStyles} ${item.path === pathName ? activelinkstyles : ''}`} >
          <div className="flex items-center"> {/* Ensure icons and titles are aligned */}
            {item.icon}
            {!toggleCollpase && <span className='ml-3 leading-6 font-semibold'>{item.title}</span>}
          </div>
        </Link>
      )}
    </>
  );
};