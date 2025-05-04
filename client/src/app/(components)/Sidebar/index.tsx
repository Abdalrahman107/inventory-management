import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Menu, LucideIcon, CircleDollarSign, SlidersHorizontal, User, Clipboard, Archive, Layout } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface sidebarProps  {
  href: string;
  icon:  LucideIcon;
  label: string;
  isCollapsed:boolean;
}

const SidebarLink = ({icon: Icon, label, isCollapsed, href}:sidebarProps) =>{

  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === '/dashboard');

  return(
    <li className={`${isActive?"bg-blue-200":""} hover:bg-blue-100 transition-all duration-300`}>
      <Link href={href} className={`flex items-center justify-start gap-x-4 py-4 px-7 `}>
        <Icon/>
        <h2 className={`${isCollapsed?"hidden opacity-0":"block opacity-100"} transition-all duration-300`}>{label}</h2>
      </Link>
    </li>
  )
}

const Sidebar = () => {
      
      let isSidebarCollapsed = useAppSelector((state)=>state.global.isSidebarCollapsed);
      const dispatch = useAppDispatch();
      const toggleSidebar = () =>{
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
      }
      // isSidebarCollapsed = false;
  const sidebarClassNames = `fixed z-10 flex items-center flex-col bg-white gap-y-4 ${isSidebarCollapsed?"w-0 md:w-16":"w-64 "} h-full transition-all duration-300 overflow-hidden shadow`

  return (
    <div className={sidebarClassNames}>
        <Link className={`flex items-center justify-between md:justify-start gap-x-3 pt-7 px-7 `} href='/'>
          <div className='w-8 h-8 flex justify-center'>
                <Image
                src="https://s3-inventory710.s3.eu-west-2.amazonaws.com/logo.png"
                alt="AAstock-logo"
                width={28}
                height={28}
                /> 
          </div>
          <h1 className={`${isSidebarCollapsed?"hidden opacity-0":"block opacity-100"} transition-all duration-300 text-2xl font-semibold`}>AASTOCK</h1>
          <button onClick={toggleSidebar} className={`w-8 h-8 p-2 bg-gray-100 rounded-full justify-center items-center  ${isSidebarCollapsed?"hidden":"flex"} cursor-pointer md:hidden hover:bg-blue-100`}><Menu className='text-gray-600'/></button>
        </Link>
        <ul className={`flex flex-col ${isSidebarCollapsed?"":"w-full"}`}>
            <SidebarLink href='/dashboard' icon={Layout} label='Dashboard' isCollapsed={isSidebarCollapsed}/>
            <SidebarLink href='/inventory' icon={Archive} label='Inventory' isCollapsed={isSidebarCollapsed}/>
            <SidebarLink href='/products' icon={Clipboard} label='Products' isCollapsed={isSidebarCollapsed}/>
            <SidebarLink href='/users' icon={User} label='Users' isCollapsed={isSidebarCollapsed}/>
            <SidebarLink href='/settings' icon={SlidersHorizontal} label='Settings' isCollapsed={isSidebarCollapsed}/>
            <SidebarLink href='/expenses' icon={CircleDollarSign} label='Expenses' isCollapsed={isSidebarCollapsed}/>
        </ul>
        <p className={`${isSidebarCollapsed?"hidden":"block"} mt-auto mb-7 text-xs text-gray-500 `}>© 2024 AASTOCK</p>
    </div>
  )
}

export default Sidebar










