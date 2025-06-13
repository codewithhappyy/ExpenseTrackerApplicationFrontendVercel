import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionCard from '../Cards/TransactionCard'

const ExpenseTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex justify-between items-center'>
            <h5 className='text-lg'>Expenses</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base' />
            </button>
        </div>

        <div className='mt-6'>
            {transactions?.slice(0, 5)?.map((expense) => (
                <TransactionCard
                    key={expense._id}
                    title={expense.category}
                    amount={expense.amount}
                    date={moment(expense.date).format('DD MMM YYYY')}
                    type="expense"
                    icon={expense.icon}
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseTransactions