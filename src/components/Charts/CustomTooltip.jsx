import React from 'react'

const CustomTooltip = ({active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip bg-white p-2 rounded-md shadow-md border border-gray-200'>
        <p className='text-xs text-purple-800 mb-1 font-semibold'>{payload[0].name}</p>
        <p className='text-sm text-gray-600'>
            Amount: <span className='font-medium tex-sm text-gray-700'>Rs. {payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export default CustomTooltip