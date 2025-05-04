import React from 'react'

type Props = {title: string}

const SectionHeader = ({ title } : Props) => {
  return (
    <div>
        <h3 className='text-lg font-medium px-3 py-2 border-b border-b-gray-200'>{title}</h3>
    </div>
  )
}

export default SectionHeader