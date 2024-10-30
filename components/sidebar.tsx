import React from 'react'
import Image from 'next/image'

const sidebar = () => {
  return (
    <aside className='fixed bg-violet-400 text-white z-50 h-full shadow-lg ease-in-out w-[20rem]'>
        <div className='flex relative items-center py-5 px-3.5'>
            <Image alt="" src='/evzone.jpeg' width={35} height={35} className='w-12 mx-3.5 min-h-fit'>
            

            </Image>
            <h2 className='pl-2 font-bold text-2xl min-w-max '>Administration</h2>
        </div>
        <nav className='flex flex-col gap-2 transition duration-300'>





        </nav>

    </aside>
   
  )
}

export default sidebar