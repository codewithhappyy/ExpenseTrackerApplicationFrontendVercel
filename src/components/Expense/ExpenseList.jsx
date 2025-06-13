import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionCard from '../Cards/TransactionCard'
import moment from 'moment'

const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>All Expenses</h5>

            <button className='card-btn' onClick={onDownload}>
                <LuDownload className='text-base' />
                Download
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions.map((transaction) => (
                <TransactionCard
                    key={transaction._id}
                    type='expense'
                    title={transaction.category}
                    icon={transaction.icon}
                    date={moment(transaction.date).format('DD MMM YYYY')}
                    amount={transaction.amount}
                    onDelete={() => onDelete(transaction._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseList