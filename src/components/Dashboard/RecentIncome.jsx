import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionCard from '../Cards/TransactionCard'
import moment from 'moment'

const RecentIncome = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Income</h5>

            <button onClick={onSeeMore} className='flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700'>See All <LuArrowRight className='text-base'/></button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0, 5).map((item) => (
                <TransactionCard 
                    key={item._id}
                    title={item?.category}
                    icon={item?.icon}
                    date={moment(item?.date).format('DD MMM YYYY')}
                    amount={item?.amount}
                    type='income'
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentIncome;