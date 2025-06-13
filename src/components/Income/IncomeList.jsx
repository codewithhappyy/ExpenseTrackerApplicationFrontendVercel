import React from 'react'
import { LuDownload } from 'react-icons/lu'
import moment from 'moment'
import TransactionCard from '../Cards/TransactionCard'

const IncomeList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Income List</h5>
                
                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base' /> Download
                </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((income) => (
                <TransactionCard
                    key={income._id}
                    transaction={income.source}
                    icon={income.icon}
                    amount={income.amount}
                    date={moment(income.date).format('DD MMM YYYY')}
                    type='income'
                    onDelete={()=> onDelete(income._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default IncomeList