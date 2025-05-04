import { Star } from 'lucide-react'
import React from 'react'

interface Props { rating : number | undefined;}

const Rating = ( { rating } : Props ) => {
  
  
  const starsNum = Math.floor(rating ?? 0);
  
  const allStars = [1,2,3,4,5]
  return (
    <div  className='flex items-center'>
      {allStars.map((starIndex)=>{
        return (
            <Star key={starIndex} className={`w-4 ${starsNum<starIndex?"text-gray-300":"text-yellow-300"}`}/>
        )
      })}

    </div>
  )
}

export default Rating
