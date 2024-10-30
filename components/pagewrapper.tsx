import React, { ReactNode } from 'react'

const pagewrapper = ({children}:{children:ReactNode}) => {
  return (
    <div className='bg-slate-50 flex-grow text-black p-2 mt-16 pl-[20rem]'>
        {children}

    </div>
    
  )
}

export default pagewrapper