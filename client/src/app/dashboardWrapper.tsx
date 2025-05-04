'use client'
import React, { useEffect } from 'react'
import Sidebar from './(components)/Sidebar'
import Navbar from './(components)/Navbar'
import StoreProvider, { useAppSelector } from './redux'
import { Toaster } from 'react-hot-toast'



const DashboardLayout = ({ children } : { children: React.ReactNode }) => 
  

  
  {
    let isDarkMode = useAppSelector((state)=>state.global.isDarkMode);
    let isSidebarCollapsed = useAppSelector((state)=>state.global.isSidebarCollapsed);
    
    useEffect(()=>{
     if(isDarkMode){
      document.documentElement.classList.add('dark')
     }else{
      document.documentElement.classList.remove('dark')
     } 
    })
  
    return (
        <div className={`${isDarkMode?"dark":"light"} flex w-full min-h-screen text-sm text-gray-900 bg-gray-50 max-w-[2400px] mx-auto`}>
        <Sidebar/>
        <main className={`px-9 py-7 h-full w-full
          ${isSidebarCollapsed?"md:pl-24":"md:pl-[270px]"}`}>
            <Navbar/>
            {children}
        </main>
        </div>
    )
  }






const DashboardWrapper = ({ children } : { children: React.ReactNode }) => {
  return (
    <div >
      <StoreProvider>
        <DashboardLayout>
        <div><Toaster/></div>
            {children}
        </DashboardLayout>
      </StoreProvider>
    </div>
  )
}

export default DashboardWrapper