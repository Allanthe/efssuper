import classNames from 'classnames'
import React, { ReactNode } from 'react'

const pagewrapper = ({children,toggleCollapse}:{children:ReactNode,toggleCollapse:boolean}) => {

  const pagestyle = classNames("bg-slate-50 flex-grow text-black p-2 mt-16",{
    "sm:pl-[20rem]": !toggleCollapse,  // Full padding when sidebar is expanded
    "sm:pl-[6.5rem]": toggleCollapse,   // Reduced padding when sidebar is collapsed

  })
  return (
    <div className={pagestyle}>
        {children}

    </div>
    
  )
}

export default pagewrapper