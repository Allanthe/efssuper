import Link from 'next/link';
import { SideBarItems } from '@/types/types';
import { BsChevronRight } from 'react-icons/bs';

export const SideBarMenuItems = ({ item }: { item: SideBarItems }) => {
  const linkStyles = "flex items-center min-h-[40px] h-full text-black py-2 px-4 hover:text-white rounded-md transition duration-200";
  const ddlinkstyles = linkStyles;

  return (
    <>
      {item.submenu ? (
        <div className='rounded min-win-[18px]'>
            <a className={ddlinkstyles}>
                {item.icon}
                <span className='ml-3 leading-6 font-semibold'> {item.title}</span>
                <BsChevronRight className='ml-auto stroke-2 text-xs'/>

            </a>
            <div>
                
            </div>
        </div>
      ) : (
        <Link href={item.path} className={linkStyles}>
          <div className="flex items-center"> {/* Ensure icons and titles are aligned */}
            {item.icon}
            <span className='ml-3 leading-6 font-semibold'>{item.title}</span>
          </div>
        </Link>
      )}
    </>
  );
};
