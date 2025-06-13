import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({transactions = [], onAddIncome}) => {
    const [chartData, setChartData] = useState([]);
    const safeTransactions = Array.isArray(transactions) ? transactions : [];

    useEffect(() => {
        console.log('Transactions received:', safeTransactions);
        if (safeTransactions.length > 0) {
            const result = prepareIncomeBarChartData(safeTransactions);
            console.log('Chart data prepared:', result);
            setChartData(result);
        } else {
            setChartData([]);
        }
    }, [safeTransactions]);

    const totalIncome = safeTransactions.reduce((acc, item) => acc + (Number(item?.amount) || 0), 0);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>Income Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Total Income: <span className='font-semibold'>Rs. {totalIncome}</span>
                    </p>
                </div>

                <button onClick={onAddIncome} className='add-btn'>
                    <LuPlus className='text-lg'/>
                    Add Income
                </button>
            </div>

            <div className='mt-10 h-[300px]'>
                {safeTransactions.length === 0 ? (
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-gray-400'>No income data available. Add your first income!</p>
                    </div>
                ) : chartData.length === 0 ? (
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-gray-400'>Processing income data...</p>
                    </div>
                ) : (
                    <CustomBarChart data={chartData} />
                )}
            </div>
        </div>
    )
}

export default IncomeOverview