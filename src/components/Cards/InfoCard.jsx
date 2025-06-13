import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='flex gap-6 p-6 bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl p-2`}>
        {icon}
      </div>

      <div>
        <h6 className='text-gray-500 mb-1 text-sm'>{label}</h6>
        <span className='text-[22px]'>Rs. {value}</span>
      </div>
    </div>
  )
}

export default InfoCard