import React, { useEffect, useState } from 'react'
import { prepareExpenseChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseChartData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className='bg-white rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 p-6'>
        <div className='flex items-center justify-between mb-4'>
            <h5 className='text-lg font-medium text-gray-900'>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last30DaysExpenses