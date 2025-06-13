import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"]

const FinanceOverview = ({totalBalance = 0, totalIncome = 0, totalExpense = 0}) => {
    const balanceData = [
        { name: "Balance", amount: Number(totalBalance) || 0 },
        { name: "Income", amount: Number(totalIncome) || 0 },
        { name: "Expense", amount: Number(totalExpense) || 0 }
    ]

  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Finance Overview</h5>
        </div>

        <CustomPieChart
          data={balanceData}
          label="Total Balance"
          totalAmount={`Rs. ${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview