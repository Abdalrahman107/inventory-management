"use client"
import React from 'react'
import PopularProducts from './CardPopularProducts'
import SalesSummary from './CardSalesSummary'
import PurchaseSummary from './CardPurchaseSummary'
import ExpenseSummary from './CardExpenseSummary'
import StateCard from './StatCard'
import { Package, TrendingDown, TrendingUp } from 'lucide-react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className='grid custom-grid-rows grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>

      <PopularProducts/>
      <SalesSummary/>
      <PurchaseSummary/>
      <ExpenseSummary/>
      <StateCard 
         title = "Customer & Expenses"
         dateRange = "22 - 29 October 2023"
         primaryIcon = {<Package className='w-5 h-5 text-blue-600'/>}
         details = {[{
           title: "Customer Growth",
           amount: "175.00",
           IconComponent : TrendingUp ,
           changePercentage: 131
         },
         {
          title: "Expenses",
          amount: "10.00",
          IconComponent : TrendingDown,
          changePercentage: -56
         },
        ]}
      />
      <StateCard 
         title = "Customer & Expenses"
         dateRange = "22 - 29 October 2023"
         primaryIcon = {<Package className='w-5 h-5 text-blue-600'/>}
         details = {[{
           title: "Customer Growth",
           amount: "175.00",
           IconComponent : TrendingUp ,
           changePercentage: 131
         },
         {
          title: "Expenses",
          amount: "10.00",
          IconComponent : TrendingDown,
          changePercentage: -56
         },
        ]}
      />
      <StateCard 
         title = "Customer & Expenses"
         dateRange = "22 - 29 October 2023"
         primaryIcon = {<Package className='w-5 h-5 text-blue-600'/>}
         details = {[{
           title: "Customer Growth",
           amount: "175.00",
           IconComponent : TrendingUp ,
           changePercentage: 131
         },
         {
          title: "Expenses",
          amount: "10.00",
          IconComponent : TrendingDown,
          changePercentage: -56
         },
        ]}
      />
    </div>
  )
}

export default Dashboard