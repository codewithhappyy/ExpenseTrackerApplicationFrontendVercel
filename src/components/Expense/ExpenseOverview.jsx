import React, { useState, useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from '../Charts/CustomLineChart';
 
const ExpenseOverview = ({transactions, onAddExpense}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
       const result = prepareExpenseLineChartData(transactions);
       setChartData(result);
    }, [transactions]);

    const totalExpense = transactions?.reduce((acc, item) => acc + (Number(item?.amount) || 0), 0);

    return (
        <div>
            <div className='card'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h5 className='text-lg'>Expense Overview</h5>
                        <p className='text-xs text-gray-400 mt-0.5'>
                            Total Expense: <span className='font-semibold'>Rs. {totalExpense}</span>
                        </p>
                    </div>

                    <button 
                        className='add-btn'
                        onClick={onAddExpense}
                    >
                        <LuPlus className='text-lg' />
                        Add Expense
                    </button>
                </div>

                <div className='mt-10'>
                    {transactions?.length === 0 ? (
                        <div className='flex items-center justify-center h-[300px]'>
                            <p className='text-gray-400'>No expense data available. Add your first expense!</p>
                        </div>
                    ) : chartData?.length === 0 ? (
                        <div className='flex items-center justify-center h-[300px]'>
                            <p className='text-gray-400'>Processing expense data...</p>
                        </div>
                    ) : (
                        <CustomLineChart data={chartData} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExpenseOverview