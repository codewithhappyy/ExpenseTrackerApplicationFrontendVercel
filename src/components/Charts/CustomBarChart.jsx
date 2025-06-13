import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const CustomBarChart = ({data}) => {
    const getBarColor = (index) => {
        return index % 2 === 0 ? '#875cf5' : '#cfbefb';
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { source, month, amount } = payload[0].payload;
            return (
                <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                    <p className='text-xs font-semibold text-purple-800'>{source}</p>
                    <p className='text-xs text-gray-600'>{month}</p>
                    <p className='text-sm text-gray-800'>
                        Amount: <span className='text-sm font-medium text-gray-900'>Rs. {amount}</span>
                    </p>
                </div>
            )
        }
        return null;
    };
        
    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12, fill: '#555' }} 
                        stroke='none'
                        axisLine={false}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis 
                        tick={{ fontSize: 12, fill: '#555' }} 
                        stroke='none'
                        axisLine={false}
                    />
                    <Tooltip content={CustomTooltip} />

                    <Bar
                        dataKey="amount"
                        fill="#FF8042"  
                        radius={[4, 4, 0, 0]}
                        maxBarSize={50}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart