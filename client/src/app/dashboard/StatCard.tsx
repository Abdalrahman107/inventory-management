import { LucideIcon } from 'lucide-react';
import React from 'react'

type StateDetail ={
    title: string;
    amount: string;
    IconComponent : LucideIcon;
    changePercentage: number;
}

type StatCardProps = {
    title: string;
    dateRange: string;
    primaryIcon: JSX.Element;
    details: StateDetail[];
}

const StatCard = ({ title, dateRange, primaryIcon, details }: StatCardProps) => {

    

    const formatPercentage = (value : number)=>{
        
        const signal =  value >= 0 ? "+" : "";
        return `${signal} ${value.toFixed()}%`
    };

    const getChangeColor = (value : number)=>{
        return value > 0 ? "text-green-500" : "text-red-500";
    }
    
  return (
    <div  className='row-span-1 xl:row-span-3 col-span-1 bg-white shadow rounded-xl py-2 overflow-auto'>
        {/* header */}
        <div className='flex items-center justify-between gap-5 border-b border-b-gray-200 px-3 py-2'>
            <h3 className='text-lg font-medium'>{title}</h3>
            <p>{dateRange}</p>
        </div>
        {/* body */}
        <div className='flex justify-between py-7 px-3 gap-3'>
            <div className='m-auto'>
                <div className='flex justify-center items-center w-16 h-16 border border-blue-500 rounded-full bg-slate-200'>
                    {primaryIcon}
                </div>
            </div>
            <div className='flex flex-col w-3/4'>
                {details.map((detail, index)=>{
                    return ( 
                <div key={index}>
                <div className='flex justify-between items-center gap-3 w-full'>
                    <div className='w-20'><p >{detail.title}</p></div>
                    <div className='w-16'><p >{detail.amount}</p></div>
                    <div className={`w-24 ${getChangeColor(detail.changePercentage)} flex items-center`}>
                        <span>{<detail.IconComponent className='inline mr-2'/>}</span>
                        <span className='flex items-center w-12'>
                            {formatPercentage(detail.changePercentage)}
                        </span>
                    </div>
                    
                </div>
                {(index + 1) < details.length ? <hr className='my-2'/> : ""}
                </div>
                )

                })}

            </div>
        </div>
    </div>
  )
}

export default StatCard