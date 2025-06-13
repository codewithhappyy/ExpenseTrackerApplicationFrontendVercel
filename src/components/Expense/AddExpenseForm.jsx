import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup'
import Input from '../Inputs/Input'

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = useState({
        amount: '',
        category: '',
        date: '',
        icon: '',
    })

    const handleChange = (key, value) => setExpense(prev => ({...prev, [key]: value}))
    
    return (
        <div>
            <EmojiPickerPopup 
                icon={expense.icon}
                setIcon={(icon) => handleChange('icon', icon)}
            />

            <Input
                value={expense.category}
                onChange={(e) => handleChange('category', e.target.value)}
                label='Expense Category'
                placeholder='Food, Transport, etc.'
                type='text'
            />

            <Input
                value={expense.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                label='Expense Amount'
                placeholder='Enter Expense Amount'
                type='number'
            />

            <Input
                value={expense.date}
                onChange={(e) => handleChange('date', e.target.value)}
                label='Expense Date'
                placeholder='Select Expense Date'
                type='date'
            />

            <div className='flex justify-end gap-2'>
                <button 
                    type='button' 
                    className='add-btn add-btn-fill'
                    onClick={() => onAddExpense(expense)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    )
}

export default AddExpenseForm