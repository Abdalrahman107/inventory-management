import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state'
import { Bell, Menu, Moon, Settings, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {

  let isDarkMode = useAppSelector((state)=> state.global.isDarkMode)
  let isSidebarCollapsed = useAppSelector((state)=> state.global.isSidebarCollapsed)
  
  // isDarkMode = true;

  const dispatch = useAppDispatch();
  const toggleSidebar = ()=>{
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
  }

  const toggleDarkMode = ()=>{
    dispatch(setIsDarkMode(!isDarkMode));
  }

  return (
    <div className='flex w-full justify-between items-center mb-6 gap-5'>
      {/* left side */}
      
      <div className='flex justify-between items-center gap-3'>
        {/* menu icon */}
      <button onClick={toggleSidebar} className={`w-8 h-8 p-2 bg-gray-100 rounded-full justify-center items-center flex cursor-pointer hover:bg-blue-100`}><Menu className='text-gray-600'/></button>
      {/* search input */}
      <div className='relative'>
        <input type="search" placeholder='search groups & products' className=' focus:outline-none border-2 border-gray-300 rounded-lg focus:border-2 focus:border-blue-400 py-1.5 pl-8 pr-3 transition-colors duration-300 w-full md:min-w-60'/>
        <div className='absolute left-0 top-1/4 pl-2'>
        <Bell className='text-gray-500 w-5 h-5'/>
        </div>
      </div>
      </div>

      {/* right side */}
      <div className='flex justify-between items-center gap-5'>
        <div className='flex justify-between items-center gap-5'>
          <button onClick={toggleDarkMode} className='cursor-pointer'>{!isDarkMode?<Moon className='text-gray-500'/>:<Sun className='text-gray-500'/>}</button>
          <button className='relative hidden md:block'>
            <Bell className='text-gray-500'/>
            <div className='absolute bg-red-400 p-1 w-5 h-5 -top-1/3 -right-1/4 rounded-full text-white flex justify-center items-center'><p>3</p></div>
          </button>
          <span className='hidden md:block text-gray-500'>|</span>
          <div className='hidden md:block w-9 h-9'>
            <Image
            src="https://s3-inventory710.s3.eu-west-2.amazonaws.com/profile.jpg"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full h-full object-cover"
            />
          </div>
          <h2 className='hidden md:block '>Abdalragman</h2>
        </div>
      <Link href="/settings">
        <Settings className='text-gray-500'/>
      </Link>
      </div>


    </div>
  )
}

export default Navbar


















