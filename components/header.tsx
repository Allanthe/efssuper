import React from 'react'
import { BsList } from 'react-icons/bs'

const header = () => {
  return (
    <header className='fixed bg-violet-200 w-full z-0 shadow-sm shadow-slate-500/40 pl-[20rem]' >
        <div className='flex items-center justify-between h-16 '>
            <button className='bg-violet-950 text-white hover:bg-slate-700 ml-3 rounded-none h-[30px] ease-in-out flex items-center justify-center ' >
                <BsList></BsList>
            </button>


            <div className='h-10 w-10 rounded-full bg-violet-950 flex items-center justify-center text-center text-white '>
                <span className='font-semibold text-sm'>SR</span>
            </div>

        </div>

    </header>
  )
}

export default header